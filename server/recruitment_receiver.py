#!/usr/bin/env python3
"""Same-origin, rate-limited receiver for the public recruitment form."""

from __future__ import annotations

import html
import json
import logging
import os
import re
import threading
import time
from collections import defaultdict, deque
from datetime import date
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from typing import Final
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


HOST: Final = "127.0.0.1"
PORT: Final = 8808
MAX_BODY_BYTES: Final = 12_288
RATE_WINDOW_SECONDS: Final = 600
RATE_LIMIT: Final = 8
ALLOWED_ORIGINS: Final = {"https://khuong.pro.vn", "https://www.khuong.pro.vn"}
PHONE_PATTERN: Final = re.compile(r"^[0-9+() .-]{7,24}$")
FIELD_LIMITS: Final = {
    "name": 100,
    "birthday": 10,
    "phone": 24,
    "area": 160,
    "current_job": 200,
    "current_income": 100,
    "experience": 1_500,
    "desire": 1_500,
    "questions": 1_500,
    "company": 120,
}


class RateLimiter:
    def __init__(self) -> None:
        self._hits: dict[str, deque[float]] = defaultdict(deque)
        self._lock = threading.Lock()

    def allow(self, address: str) -> bool:
        now = time.monotonic()
        with self._lock:
            hits = self._hits[address]
            while hits and hits[0] <= now - RATE_WINDOW_SECONDS:
                hits.popleft()
            if len(hits) >= RATE_LIMIT:
                return False
            hits.append(now)
            return True


RATE_LIMITER = RateLimiter()


def load_configuration() -> tuple[str, str]:
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
    if not token or not chat_id:
        raise RuntimeError("Telegram configuration is missing")
    return token, chat_id


TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID = load_configuration()


def safe_field(payload: dict[str, object], name: str, *, required: bool = False) -> str:
    value = payload.get(name, "")
    if not isinstance(value, str):
        raise ValueError(f"Invalid {name}")
    value = value.strip()
    if len(value) > FIELD_LIMITS[name]:
        raise ValueError(f"Invalid {name}")
    if required and not value:
        raise ValueError(f"Missing {name}")
    return value


def validate_payload(payload: dict[str, object]) -> dict[str, str]:
    fields = {
        name: safe_field(payload, name, required=name in {"name", "birthday", "phone", "area", "current_job", "current_income", "desire"})
        for name in FIELD_LIMITS
    }
    if fields["company"]:
        raise ValueError("Automated submission")
    if not PHONE_PATTERN.fullmatch(fields["phone"]):
        raise ValueError("Invalid phone")
    try:
        birthday = date.fromisoformat(fields["birthday"])
    except ValueError as error:
        raise ValueError("Invalid birthday") from error
    if birthday >= date.today():
        raise ValueError("Invalid birthday")
    return fields


def telegram_message(fields: dict[str, str]) -> str:
    value = lambda key, fallback="Không điền": html.escape(fields[key] or fallback, quote=False)
    birthday = date.fromisoformat(fields["birthday"]).strftime("%d/%m/%Y")
    now = time.strftime("%d/%m/%Y %H:%M", time.localtime())
    return (
        "🔥 <b>ỨNG VIÊN MỚI — Landing Page TL Land</b>\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"👤 <b>Họ tên:</b> {value('name')}\n"
        f"🎂 <b>Ngày sinh:</b> {birthday}\n"
        f"📱 <b>SĐT:</b> {value('phone')}\n"
        f"📍 <b>Khu vực:</b> {value('area')}\n"
        f"💼 <b>Nghề hiện tại:</b> {value('current_job')}\n"
        f"💰 <b>Thu nhập hiện tại:</b> {value('current_income')}\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"📋 <b>Kinh nghiệm:</b>\n{value('experience')}\n"
        f"🎯 <b>Mong muốn:</b>\n{value('desire')}\n"
        f"❓ <b>Câu hỏi:</b>\n{value('questions', 'Không có')}\n"
        "━━━━━━━━━━━━━━━━━━\n"
        f"🕐 <i>{now}</i>"
    )


def send_to_telegram(fields: dict[str, str]) -> None:
    payload = json.dumps(
        {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": telegram_message(fields),
            "parse_mode": "HTML",
            "disable_web_page_preview": True,
        }
    ).encode()
    request = Request(
        f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=8) as response:
            result = json.loads(response.read())
    except (HTTPError, URLError, TimeoutError, json.JSONDecodeError) as error:
        raise RuntimeError("Telegram delivery failed") from error
    if not result.get("ok"):
        raise RuntimeError("Telegram delivery failed")


class RecruitmentHandler(BaseHTTPRequestHandler):
    server_version = "RecruitmentReceiver"
    sys_version = ""

    def log_message(self, format: str, *args: object) -> None:
        logging.info("%s - %s", self.client_address[0], format % args)

    def respond(self, status: HTTPStatus, payload: dict[str, object]) -> None:
        encoded = json.dumps(payload).encode()
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:
        self.respond(HTTPStatus.NOT_FOUND, {"ok": False})

    def do_POST(self) -> None:
        if self.path != "/api/recruitment":
            self.respond(HTTPStatus.NOT_FOUND, {"ok": False})
            return
        origin = self.headers.get("Origin")
        if origin not in ALLOWED_ORIGINS:
            self.respond(HTTPStatus.FORBIDDEN, {"ok": False})
            return
        if not self.headers.get("Content-Type", "").lower().startswith("application/json"):
            self.respond(HTTPStatus.UNSUPPORTED_MEDIA_TYPE, {"ok": False})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            length = 0
        if not 0 < length <= MAX_BODY_BYTES:
            self.respond(HTTPStatus.REQUEST_ENTITY_TOO_LARGE, {"ok": False})
            return
        client_ip = self.headers.get("X-Real-IP", self.client_address[0]).split(",", 1)[0].strip()
        if not RATE_LIMITER.allow(client_ip):
            self.respond(HTTPStatus.TOO_MANY_REQUESTS, {"ok": False})
            return
        try:
            payload = json.loads(self.rfile.read(length))
            if not isinstance(payload, dict):
                raise ValueError("Invalid payload")
            send_to_telegram(validate_payload(payload))
        except (UnicodeDecodeError, json.JSONDecodeError, ValueError):
            self.respond(HTTPStatus.BAD_REQUEST, {"ok": False})
        except RuntimeError:
            logging.exception("Recruitment delivery failed")
            self.respond(HTTPStatus.BAD_GATEWAY, {"ok": False})
        else:
            self.respond(HTTPStatus.ACCEPTED, {"ok": True})


def main() -> None:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    ThreadingHTTPServer((HOST, PORT), RecruitmentHandler).serve_forever()


if __name__ == "__main__":
    main()
