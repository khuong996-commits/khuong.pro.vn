# HƯỚNG DẪN CÀI ĐẶT & MIGRATION - APP TÍNH HOA HỒNG AI

Tài liệu này chứa toàn bộ mã nguồn chi tiết và hướng dẫn di chuyển (migrate) ứng dụng **Trợ lý Tính Hoa Hồng Bất Động Sản** sang một ứng dụng React + Vite mới.

---

## 📋 THƯ MỤC CẤU TRÚC DỰ ÁN

Để cài đặt ứng dụng chạy mượt mà, hãy tạo các tệp tin theo đúng cấu trúc thư mục bên dưới:

```
├── .env.example
├── package.json
├── vite.config.ts
├── types.ts
├── App.tsx
├── services/
│   └── geminiService.ts
└── components/
    ├── Icons.tsx
    ├── Spinner.tsx
    └── ResultDisplay.tsx
```

---

## 🛠️ PHẦN 1: CÁC THƯ VIỆN CẦN CÀI ĐẶT (`package.json`)

Đảm bảo dự án đích của bạn cài đặt các gói hỗ trợ sau bằng npm hoặc yarn:

```bash
npm install @google/genai
```

Các thư viện dev cơ bản cần có trong dự án:
```json
"devDependencies": {
  "@types/node": "^22.14.0",
  "@vitejs/plugin-react": "^5.0.0",
  "typescript": "~5.8.2",
  "vite": "^6.2.0"
}
```

---

## 🔒 PHẦN 2: CẤU HÌNH BIẾN MÔI TRƯỜNG (`.env` & `vite.config.ts`)

Ứng dụng kết nối trực tiếp với Gemini API thông qua khóa bảo mật. Bạn cần định nghĩa biến môi trường này ở phía server hoặc được đóng gói qua cấu hình Vite.

### 1. Tạo file `.env` (hoặc `.env.local`):
```env
GEMINI_API_KEY=Nhập_API_Key_Gemini_Của_Bạn_Vào_Đây
```

### 2. File cấu hình `vite.config.ts`:
```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
```

---

## 💻 PHẦN 3: CHI TIẾT MÃ NGUỒN CÁC FILE

### 1. `types.ts`
```typescript
export interface TransactionSummary {
  totalValue: number;
  commissionRate: number;
  hotBonus: number;
  totalExpenses: number;
  bloodCut: number;
  companyCut: number;
  finalCommission: number;
}

export interface SplitDetail {
  name: string;
  role: string;
  percentage: number;
  amount: number;
  calculation?: string;
}

export interface CalculationSteps {
  step1: string;
  step2: string;
  step3: string;
}

export interface CalculationResult {
  summary: TransactionSummary;
  splitDetails: SplitDetail[];
  calculationSteps: CalculationSteps;
  notes?: string;
}
```

---

### 2. `services/geminiService.ts`
```typescript
import { GoogleGenAI, Type } from "@google/genai";
import type { CalculationResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RULES = `
Bạn là trợ lý tính hoa hồng môi giới bất động sản tên là "Tính hoa hồng".
Nhiệm vụ của bạn: tính toán và phân chia hoa hồng dựa trên QUY TRÌNH NGHIÊM NGẶT 5 BƯỚC sau:

BƯỚC 1: XÁC ĐỊNH HOA HỒNG GỘP (GROSS)
- Nếu có giá lô đất: HH Gộp = (Giá lô - Thưởng nóng) * %Hoa hồng + Thưởng nóng.
- Nếu nhập thẳng tiền: HH Gộp = Số tiền người dùng nhập.

BƯỚC 2: TÍNH HOA HỒNG RÒNG (NET BASE) - ĐÂY LÀ MỐC TỐI QUAN TRỌNG
- HH Ròng = HH Gộp - Tổng chi phí - Tiền cắt máu.
- Ví dụ của người dùng: Tổng HH 105tr, chi phí 5tr => HH Ròng = 100tr. 
- Mọi con số % sau đây PHẢI tính trên HH Ròng này.

BƯỚC 3: TRÍCH PHÍ CÔNG TY (10% HH RÒNG)
- Phí Công ty = 10% * HH Ròng.
- Theo ví dụ: 10% của 100tr = 10tr (Không được tính 10% của 105tr).

BƯỚC 4: PHÂN CHIA ĐỘI NHÓM (90% HH RÒNG)
- Tổng tiền dành cho đội nhóm = 90% * HH Ròng.
- Tỷ lệ cá nhân: Tiền HH cá nhân = HH Ròng * (% của cá nhân / 100).
- Tổng tỷ lệ các cá nhân trong danh sách phải cộng lại bằng đúng 90%.

BƯỚC 5: HOÀN CHI PHÍ (REIMBURSEMENT)
- Nếu một thành viên có tên trong danh sách "Chi phí khác" (là người đã ứng tiền), họ phải được CỘNG HOÀN lại số tiền đó vào số tiền thực nhận.
- Thực nhận cuối cùng = (Tiền HH theo tỷ lệ) + (Tiền chi phí đã ứng).

BƯỚC 6: TỔNG HỢP THEO TÊN (AGGREGATION) - QUAN TRỌNG
- Nếu cùng một người (cùng tên) xuất hiện ở nhiều vai trò khác nhau (ví dụ: vừa ở Đội Chiến Dịch, vừa ở Phân chia đội nhóm), bạn PHẢI gộp họ thành MỘT dòng duy nhất trong splitDetails.
- 'amount' sẽ là tổng tiền thực nhận từ tất cả các vai trò của người đó.
- 'percentage' sẽ là tổng tỷ lệ % của người đó.
- 'role' sẽ liệt kê tất cả các vai trò của họ, nối bằng dấu cộng (ví dụ: 'Nguồn khách (Chiến dịch) + Gọi khách').
- 'calculation' PHẢI diễn giải chi tiết từng phần đóng góp: "(HH Ròng * % vai trò 1) + (HH Ròng * % vai trò 2) + Hoàn ứng (nếu có)".

YÊU CẦU ĐẦU RA:
- Trả về JSON chính xác. 
- "finalCommission" trong summary là tổng tiền chia cho đội nhóm (90% HH Ròng).
- "amount" trong splitDetails là con số thực nhận cuối cùng (đã gồm tiền hoàn ứng và đã được gộp nếu trùng tên).
- Đảm bảo không có tên nào bị lặp lại trong danh sách splitDetails.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        summary: {
            type: Type.OBJECT,
            properties: {
                totalValue: { type: Type.NUMBER, description: 'Giá trị lô đất' },
                commissionRate: { type: Type.NUMBER, description: '% HH' },
                hotBonus: { type: Type.NUMBER, description: 'Thưởng nóng' },
                totalExpenses: { type: Type.NUMBER, description: 'Tổng chi phí ứng trước' },
                bloodCut: { type: Type.NUMBER, description: 'Tiền cắt máu' },
                companyCut: { type: Type.NUMBER, description: 'Phí công ty (10% của HH Ròng)' },
                finalCommission: { type: Type.NUMBER, description: 'Tổng tiền đội nhóm nhận (90% của HH Ròng)' },
            },
            required: ["totalValue", "commissionRate", "hotBonus", "totalExpenses", "bloodCut", "companyCut", "finalCommission"]
        },
        splitDetails: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    percentage: { type: Type.NUMBER },
                    amount: { type: Type.NUMBER, description: 'Tiền HH theo % + Hoàn chi phí' },
                    calculation: { type: Type.STRING, description: 'Giải thích: (HH Ròng * %) + Hoàn ứng' },
                },
                required: ["name", "role", "percentage", "amount"]
            },
        },
        calculationSteps: {
            type: Type.OBJECT,
            properties: {
                step1: { type: Type.STRING, description: 'Cách tính HH Gộp' },
                step2: { type: Type.STRING, description: 'Cách tính HH Ròng (sau trừ phí/cắt máu)' },
                step3: { type: Type.STRING, description: 'Cách chia 10/90' },
            },
            required: ["step1", "step2", "step3"]
        },
        notes: { type: Type.STRING },
    },
    required: ["summary", "splitDetails", "calculationSteps"]
};

export const calculateCommission = async (userInput: string): Promise<CalculationResult> => {
    const prompt = `
    ${RULES}
    Hãy phân tích và tính toán cho đầu vào sau:
    """${userInput}"""
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });
        return JSON.parse(response.text.trim()) as CalculationResult;
    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("Lỗi khi gọi AI xử lý dữ liệu.");
    }
};
```

---

### 3. `components/Icons.tsx`
```typescript
import React from 'react';

interface IconProps {
    className?: string;
}

export const CalculatorIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm3-6h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008Zm-3-3.75h.008v.008H11.25v-.008Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3.75A.75.75 0 0 1 3.75 3h16.5a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V3.75Z" />
    </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const DocumentTextIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
);

export const UsersIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.742-.586 1.102 1.102 0 0 0 .533-1.025V15.75a3.375 3.375 0 0 0-3.375-3.375H17.25m-6.375 0H9.375a3.375 3.375 0 0 0-3.375 3.375V17.11c0 .493.21.96.533 1.025a9.094 9.094 0 0 0 3.742.586M12 12a4.125 4.125 0 1 0 0-8.25 4.125 4.125 0 0 0 0 8.25Z" />
    </svg>
);

export const PlusIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.124-2.033-2.124H8.033c-1.12 0-2.033.944-2.033 2.124v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

export const RefreshIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
);

export const CurrencyDollarIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);
```

---

### 4. `components/Spinner.tsx`
```typescript
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div
      className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`}
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

export default Spinner;
```

---

### 5. `components/ResultDisplay.tsx`
```typescript
import React, { useState } from 'react';
import type { CalculationResult } from '../types';
import { SparklesIcon, DocumentTextIcon, UsersIcon, ClipboardIcon, CheckIcon } from './Icons';

interface ResultDisplayProps {
  result: CalculationResult;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const { summary, splitDetails, calculationSteps, notes } = result;
  const [copied, setCopied] = useState(false);

  const netBase = summary.companyCut + summary.finalCommission;

  const handleCopy = async () => {
    const lines = [
      "📊 BẢNG TÍNH HOA HỒNG CHI TIẾT",
      "------------------------------",
      summary.totalValue > 0 ? `💰 Tổng giá trị lô: ${formatCurrency(summary.totalValue)}` : null,
      summary.commissionRate > 0 ? `🔖 % Hoa hồng: ${summary.commissionRate}%` : null,
      summary.hotBonus > 0 ? `🔥 Thưởng nóng: ${formatCurrency(summary.hotBonus)}` : null,
      "------------------------------",
      `💸 Chi phí/Cắt máu: -${formatCurrency(summary.totalExpenses + summary.bloodCut)}`,
      `✨ HH RÒNG (MỐC TÍNH %): ${formatCurrency(netBase)}`,
      `🏢 Phí công ty (10%): -${formatCurrency(summary.companyCut)}`,
      `👥 TỔNG ĐỘI NHÓM (90%): ${formatCurrency(summary.finalCommission)}`,
      "",
      "📋 THỰC NHẬN CỤ THỂ (Đã gồm hoàn phí ứng):",
      ...splitDetails.map((p, i) => `${i + 1}. ${p.name} (${p.role}): ${formatCurrency(p.amount)}`),
      "",
      "------------------------------",
      "🤖 Trợ lý Tính Hoa Hồng (AI Powered)"
    ].filter(Boolean);

    const textToCopy = lines.join('\n');
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 animate-fade-in relative">
        <div className="flex justify-between items-start mb-6">
            <div className="flex items-center">
                <SparklesIcon className="w-6 h-6 text-violet-500 mr-3" />
                <h2 className="text-xl font-bold text-slate-800">Tổng kết bảng tính</h2>
            </div>
            <button 
                onClick={handleCopy}
                className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-slate-100 text-slate-600 hover:bg-violet-600 hover:text-white hover:shadow-lg'
                }`}
            >
                {copied ? <CheckIcon className="w-4 h-4 mr-1.5" /> : <ClipboardIcon className="w-4 h-4 mr-1.5" />}
                {copied ? 'Đã sao chép' : 'Sao chép KQ'}
            </button>
        </div>

        <div className="space-y-3">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 ring-2 ring-violet-500/5">
             <div className="flex justify-between items-center py-1.5">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hoa hồng Ròng</span>
                <span className="text-lg font-black text-slate-900">{formatCurrency(netBase)}</span>
             </div>
             <p className="text-[10px] text-slate-400 italic font-medium">Đây là số tiền còn lại sau khi trừ Chi phí & Cắt máu. 10% phí công ty và 90% đội nhóm được tính từ con số này.</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-slate-100 text-sm">
            <span className="text-slate-600">Phí công ty (10% HH Ròng)</span>
            <span className="font-bold text-red-600">-{formatCurrency(summary.companyCut)}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <div className="flex flex-col">
                <span className="text-lg font-black text-slate-900 tracking-tight">Tổng đội nhóm (90% HH Ròng)</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tiền hoa hồng để chia</span>
            </div>
            <span className="text-2xl font-black text-violet-600 tracking-tighter">{formatCurrency(summary.finalCommission)}</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 animate-fade-in" style={{ animationDelay: '150ms' }}>
        <div className="flex items-center mb-6">
          <UsersIcon className="w-6 h-6 text-violet-500 mr-3" />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Thực nhận cuối cùng</h2>
        </div>
        <div className="space-y-4">
          {splitDetails.map((person, index) => (
            <div key={index} className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 hover:border-violet-200 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-black text-slate-900 text-sm uppercase">{person.name}</p>
                  <p className="text-[11px] font-bold text-violet-500 uppercase tracking-tighter">{person.role} • {person.percentage}% HH Ròng</p>
                </div>
                <div className="text-right">
                    <p className="text-lg font-black text-green-700 tracking-tighter">{formatCurrency(person.amount)}</p>
                </div>
              </div>
              {person.calculation && <p className="text-[10px] text-slate-400 mt-2 font-medium italic border-t border-slate-100 pt-2">{person.calculation}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200/80 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center mb-4">
          <DocumentTextIcon className="w-6 h-6 text-violet-500 mr-3" />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Công thức tính AI</h2>
        </div>
        <div className="space-y-4 text-[11px] text-slate-600 font-mono leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
          <p><span className="font-black text-violet-600 mr-1">B1:</span> {calculationSteps.step1}</p>
          <p><span className="font-black text-violet-600 mr-1">B2:</span> {calculationSteps.step2}</p>
          <p><span className="font-black text-violet-600 mr-1">B3:</span> {calculationSteps.step3}</p>
        </div>
      </div>

      {notes && notes.trim() && (
        <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-5 rounded-xl shadow-sm animate-fade-in" style={{ animationDelay: '450ms' }}>
          <p className="font-black text-xs uppercase tracking-widest mb-1">Ghi chú AI</p>
          <p className="text-sm font-medium leading-relaxed">{notes}</p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
```

---

### 6. `App.tsx`
```typescript
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { calculateCommission } from './services/geminiService';
import type { CalculationResult } from './types';
import ResultDisplay from './components/ResultDisplay';
import Spinner from './components/Spinner';
import { CalculatorIcon, PlusIcon, TrashIcon, RefreshIcon, UsersIcon, CurrencyDollarIcon, ArrowLeftIcon, SparklesIcon } from './components/Icons';

interface Participant {
  id: string;
  name: string;
  role: string;
  percentage: string;
}

interface Expense {
  id: string;
  description: string;
  amount: string;
  paidBy: string;
}

interface CampaignContributor {
  id: string;
  name: string;
  contribution: string;
}

type ViewMode = 'selection' | 'simple' | 'advanced';

const ROLES = ['Tự full', 'Nguồn khách', 'Gọi khách', 'Hỗ trợ chốt', 'Đi khách'];
const NGUON_KHACH_ROLE = 'Nguồn khách';

const formatNumberInput = (value: string): string => {
    if (!value) return '';
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue === '') return '';
    return new Intl.NumberFormat('de-DE').format(Number(numericValue));
};

const parseNumberInput = (value: string): number => {
    if (!value) return 0;
    return Number(value.replace(/[^\d]/g, ''));
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};


const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('selection');
  const [isDirectMode, setIsDirectMode] = useState(false);

  // --- SIMPLE MODE STATE ---
  const [simplePrice, setSimplePrice] = useState('');
  const [simpleCommissionRate, setSimpleCommissionRate] = useState('4');
  const [simpleHotBonus, setSimpleHotBonus] = useState('');
  const [simpleResult, setSimpleResult] = useState<number | null>(null);

  // --- ADVANCED MODE STATE ---
  const [directCommission, setDirectCommission] = useState(''); 
  const [plotCode, setPlotCode] = useState('');
  const [plotPrice, setPlotPrice] = useState('');
  const [hotBonus, setHotBonus] = useState('');
  const [bloodCut, setBloodCut] = useState('');
  const [commissionRate, setCommissionRate] = useState('4');
  const [participants, setParticipants] = useState<Participant[]>([
    { id: crypto.randomUUID(), name: '', role: 'Tự full', percentage: '90' },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [campaignVisible, setCampaignVisible] = useState<boolean>(false);
  const [campaignContributors, setCampaignContributors] = useState<CampaignContributor[]>([
    { id: crypto.randomUUID(), name: '', contribution: '' },
  ]);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Tự động xử lý dòng Nguồn khách 50% khi bật chiến dịch
  useEffect(() => {
    if (campaignVisible) {
      setParticipants(prev => {
        const hasNguonKhach = prev.some(p => p.role === NGUON_KHACH_ROLE);
        if (hasNguonKhach) {
          return prev.map(p => p.role === NGUON_KHACH_ROLE ? { ...p, name: 'Đội Chiến Dịch', percentage: '50' } : p);
        } else {
          return [{ id: 'campaign-nk-id', name: 'Đội Chiến Dịch', role: NGUON_KHACH_ROLE, percentage: '50' }, ...prev];
        }
      });
    } else {
      // Khi tắt chiến dịch, gỡ bỏ dòng ID đặc biệt hoặc trả về trạng thái tự do
      setParticipants(prev => prev.filter(p => p.id !== 'campaign-nk-id'));
    }
  }, [campaignVisible]);

  const handleModeSelection = (mode: ViewMode, direct: boolean = false) => {
      setViewMode(mode);
      setIsDirectMode(direct);
      setResult(null);
      setSimpleResult(null);
      setError(null);
  };

  const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(formatNumberInput(e.target.value));
  };
  
  const handleParticipantChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParticipants(prevState => 
      prevState.map(p => 
        p.id === id ? { ...p, [name]: value } : p
      )
    );
  };

  const handleAddParticipant = () => {
    const availableRole = ROLES.find(r => r !== NGUON_KHACH_ROLE) || 'Gọi khách';
    setParticipants(prevState => 
      [...prevState, { id: crypto.randomUUID(), name: '', role: availableRole, percentage: '' }]
    );
  };

  const handleRemoveParticipant = (id: string) => {
    setParticipants(prevState => prevState.filter(p => p.id !== id));
  };

  const handleAddExpense = () => {
    setExpenses(prev => [...prev, { id: crypto.randomUUID(), description: '', amount: '', paidBy: '' }]);
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id));
  };

  const handleExpenseChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenses(prev => prev.map(exp => {
        if (exp.id !== id) return exp;
        if (name === 'amount') {
            return { ...exp, amount: formatNumberInput(value) };
        }
        return { ...exp, [name]: value };
    }));
  };

    const handleAddCampaignContributor = () => {
        setCampaignContributors(prev => [...prev, { id: crypto.randomUUID(), name: '', contribution: '' }]);
    };

    const handleRemoveCampaignContributor = (id: string) => {
        setCampaignContributors(prev => prev.filter(c => c.id !== id));
    };

    const handleCampaignContributorChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCampaignContributors(prev => prev.map(c => {
            if (c.id !== id) return c;
            if (name === 'contribution') {
                return { ...c, contribution: formatNumberInput(value) };
            }
            return { ...c, [name]: value };
        }));
    };
    
    const handleReset = () => {
        if (window.confirm("Bạn có chắc muốn xóa hết dữ liệu và làm mới không?")) {
            setPlotCode('');
            setPlotPrice('');
            setHotBonus('');
            setBloodCut('');
            setCommissionRate('4');
            setDirectCommission('');
            setParticipants([{ id: crypto.randomUUID(), name: '', role: 'Tự full', percentage: '90' }]);
            setExpenses([]);
            setCampaignVisible(false);
            setCampaignContributors([{ id: crypto.randomUUID(), name: '', contribution: '' }]);
            setResult(null);
            setError(null);
        }
    };

    const totalCampaignContribution = useMemo(() => 
        campaignContributors.reduce((sum, c) => sum + parseNumberInput(c.contribution), 0),
    [campaignContributors]);

    const nguonKhachPercentage = useMemo(() =>
        parseFloat(participants.find(p => p.role === NGUON_KHACH_ROLE)?.percentage || '0'),
    [participants]);

  const handleCalculateAdvanced = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (isDirectMode && !directCommission.trim()) {
        setError('Vui lòng nhập số tiền hoa hồng tổng.');
        return;
    }

    if (!isDirectMode && !plotPrice.trim()) {
      setError('Vui lòng nhập giá trị lô đất.');
      return;
    }
    
    const finalParticipantsForCalc: { name: string; role: string; percentage: number; }[] = [];
    participants.forEach(p => {
        if (p.role === NGUON_KHACH_ROLE && campaignVisible) {
            if (totalCampaignContribution > 0) {
                campaignContributors.forEach(c => {
                    const contribution = parseNumberInput(c.contribution);
                    if (c.name.trim() && contribution > 0) {
                        const effectivePercentage = (contribution / totalCampaignContribution) * nguonKhachPercentage;
                        finalParticipantsForCalc.push({
                            name: c.name.trim(),
                            role: `${NGUON_KHACH_ROLE} (Chiến dịch)`,
                            percentage: effectivePercentage
                        });
                    }
                });
            } else {
                finalParticipantsForCalc.push({
                    name: p.name.trim() || 'Đội Chiến Dịch',
                    role: NGUON_KHACH_ROLE,
                    percentage: parseFloat(p.percentage) || 0
                });
            }
        } else {
             if (p.role.trim() && p.percentage.trim()){
                finalParticipantsForCalc.push({
                    name: p.name.trim() || 'Thành viên',
                    role: p.role,
                    percentage: parseFloat(p.percentage) || 0
                });
            }
        }
    });

    const totalPercentage = finalParticipantsForCalc.reduce((sum, p) => sum + p.percentage, 0);
    if (Math.abs(totalPercentage - 90) > 0.01) {
      setError(`Tổng tỷ lệ phân chia đội nhóm phải là 90% (Để 10% còn lại cho công ty). Hiện tại bạn đang chia: ${totalPercentage.toFixed(1)}%.`);
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    const promptParts = [];
    if (isDirectMode) {
        promptParts.push(`SỐ TIỀN HOA HỒNG GỘP NHẬN VỀ: ${parseNumberInput(directCommission)}`);
    } else {
        const parsedPlotPrice = parseNumberInput(plotPrice);
        const parsedHotBonus = parseNumberInput(hotBonus);
        const parsedBloodCut = parseNumberInput(bloodCut);
        if (plotCode.trim()) promptParts.push(`lô ${plotCode.trim()}`);
        if (parsedPlotPrice > 0) promptParts.push(`giá ${parsedPlotPrice}`);
        if (parsedHotBonus > 0) promptParts.push(`thưởng ${parsedHotBonus}`);
        if (parsedBloodCut > 0) promptParts.push(`cắt máu ${parsedBloodCut}`);
        promptParts.push(`% hoa hồng ${commissionRate.trim() || '4'}`);
    }

    const totalExpenses = expenses.reduce((sum, exp) => sum + parseNumberInput(exp.amount), 0);
    if (totalExpenses > 0) promptParts.push(`tổng chi phí ${totalExpenses}`);
    
    let fullPrompt = promptParts.join(', ');
    
    const participantsPrompt = finalParticipantsForCalc
      .map(p => `${p.role}: ${p.name} (${p.percentage.toFixed(2)}%)`)
      .join('\n');

    if (participantsPrompt) {
      fullPrompt += `\n\nPhân chia chi tiết (Tính trên Hoa hồng sau trừ cắt máu và chi phí):\n${participantsPrompt}`;
    }

    const expensesPrompt = expenses
      .filter(exp => exp.description.trim() && exp.amount.trim() && exp.paidBy.trim())
      .map(exp => `- ${exp.description}: ${parseNumberInput(exp.amount)} (do ${exp.paidBy} ứng trước)`)
      .join('\n');
      
    if (expensesPrompt) {
        fullPrompt += `\n\nChi phí đã ứng (Phải được hoàn lại): \n${expensesPrompt}`;
    }

    try {
      const calculatedResult = await calculateCommission(fullPrompt);
      setResult(calculatedResult);
    } catch (e) {
      console.error(e);
      setError('Đã xảy ra lỗi khi tính toán. Vui lòng kiểm tra lại kết nối AI và thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [isDirectMode, directCommission, plotCode, plotPrice, hotBonus, bloodCut, commissionRate, participants, expenses, campaignVisible, campaignContributors, totalCampaignContribution, nguonKhachPercentage]);

  const handleCalculateSimple = (e: React.FormEvent) => {
      e.preventDefault();
      const price = parseNumberInput(simplePrice);
      const rate = parseFloat(simpleCommissionRate) || 0;
      const bonus = parseNumberInput(simpleHotBonus);
      const grossCommission = ((price - bonus) * (rate / 100)) + bonus;
      setSimpleResult(grossCommission);
  };

  const participantNames = participants.map(p => p.name.trim()).filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-100/50 font-sans pb-20">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12 relative">
          {viewMode !== 'selection' && (
              <button 
                onClick={() => setViewMode('selection')}
                className="absolute left-0 top-1 text-slate-500 hover:text-violet-600 flex items-center transition-colors group"
              >
                  <ArrowLeftIcon className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden md:inline font-medium text-sm">Quay lại</span>
              </button>
          )}

          <div className="inline-flex items-center justify-center bg-violet-100 text-violet-600 rounded-2xl p-4 mb-4 shadow-sm">
             <CalculatorIcon className="w-10 h-10" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Tính hoa hồng</h1>
          <p className="mt-3 text-slate-500 font-medium max-w-lg mx-auto leading-relaxed text-sm md:text-base">
            Trợ lý đắc lực cho môi giới Bất động sản chuyên nghiệp
          </p>
        </header>

        {/* --- SELECTION SCREEN --- */}
        {viewMode === 'selection' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto animate-fade-in">
                <button 
                    onClick={() => handleModeSelection('simple')}
                    className="group bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-green-500 hover:shadow-xl transition-all duration-300 text-left flex flex-col items-start h-full"
                >
                    <div className="bg-green-100 text-green-600 p-4 rounded-xl mb-6 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                        <CurrencyDollarIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">Tính Nhanh (100%)</h2>
                    <p className="text-slate-600 leading-relaxed text-sm">Ướm thử tổng thu nhập của một lô đất bất kỳ. Xem doanh thu dự kiến trước khi bắt đầu chiến dịch.</p>
                    <div className="mt-auto pt-6 text-green-600 font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        Sử dụng ngay <PlusIcon className="w-4 h-4 ml-1 rotate-45" />
                    </div>
                </button>

                <button 
                    onClick={() => handleModeSelection('advanced', true)}
                    className="group bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-amber-500 hover:shadow-xl transition-all duration-300 text-left flex flex-col items-start h-full"
                >
                    <div className="bg-amber-100 text-amber-600 p-4 rounded-xl mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors shadow-sm">
                        <SparklesIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">Phân Chia (Biết số tiền)</h2>
                    <p className="text-slate-600 leading-relaxed text-sm">Đã biết chính xác số tiền hoa hồng về túi? Nhập thẳng số tiền để chia ngay cho đội nhóm & trích phí cty.</p>
                    <div className="mt-auto pt-6 text-amber-600 font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        Sử dụng ngay <PlusIcon className="w-4 h-4 ml-1 rotate-45" />
                    </div>
                </button>

                <button 
                    onClick={() => handleModeSelection('advanced', false)}
                    className="group bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent hover:border-violet-500 hover:shadow-xl transition-all duration-300 text-left flex flex-col items-start h-full"
                >
                    <div className="bg-violet-100 text-violet-600 p-4 rounded-xl mb-6 group-hover:bg-violet-600 group-hover:text-white transition-colors shadow-sm">
                        <UsersIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-3">Tính & Phân Chia (Lô đất)</h2>
                    <p className="text-slate-600 leading-relaxed text-sm">Tính từ A-Z: Nhập giá lô, % hoa hồng, thưởng, cắt máu... sau đó phân chia chi tiết cho các thành viên.</p>
                    <div className="mt-auto pt-6 text-violet-600 font-bold flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                        Sử dụng ngay <PlusIcon className="w-4 h-4 ml-1 rotate-45" />
                    </div>
                </button>
            </div>
        )}

        {/* --- SIMPLE MODE SCREEN --- */}
        {viewMode === 'simple' && (
            <div className="max-w-xl mx-auto animate-fade-in">
                <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-200/80">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-slate-800">Tính Tổng Hoa Hồng (100%)</h2>
                        <p className="text-slate-500 mt-1">Dựa trên giá bán và % hoa hồng</p>
                    </div>

                    <form onSubmit={handleCalculateSimple} className="space-y-6">
                         <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Giá trị lô đất</label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    inputMode="numeric" 
                                    value={simplePrice} 
                                    onChange={handleNumericInputChange(setSimplePrice)} 
                                    className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-slate-900 text-2xl font-bold text-right transition-all" 
                                    placeholder="0" 
                                    autoFocus
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-green-500 transition-colors">VND</span>
                            </div>
                        </div>

                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">% Hoa hồng</label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        value={simpleCommissionRate} 
                                        onChange={(e) => setSimpleCommissionRate(e.target.value)} 
                                        className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-slate-900 text-right font-bold transition-all" 
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-green-500 transition-colors">%</span>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Thưởng nóng</label>
                                <input 
                                    type="text" 
                                    inputMode="numeric" 
                                    value={simpleHotBonus} 
                                    onChange={handleNumericInputChange(setSimpleHotBonus)} 
                                    className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-4 focus:ring-green-500/10 focus:border-green-500 text-slate-900 text-right font-bold transition-all" 
                                    placeholder="0" 
                                p/>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white text-lg font-bold py-4 px-6 rounded-2xl hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all"
                        >
                            Tính ngay
                        </button>
                    </form>

                    {simpleResult !== null && (
                        <div className="mt-10 pt-8 border-t-4 border-dashed border-slate-100 text-center animate-fade-in">
                            <p className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-2">Tổng hoa hồng dự kiến (100%)</p>
                            <p className="text-3xl md:text-5xl font-black text-green-600 tracking-tight mb-2">
                                {formatCurrency(simpleResult)}
                            </p>
                            <p className="text-[10px] text-slate-400 italic">
                                Chế độ tính nhanh 100% chưa tính phí công ty và các chi phí khác.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- ADVANCED MODE SCREEN --- */}
        {viewMode === 'advanced' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start animate-fade-in">
          <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-slate-200/80">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    {isDirectMode ? 'Nhập tiền hoa hồng' : 'Thông tin lô đất'}
                </h2>
                {isDirectMode && (
                    <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Chế độ nhập thẳng</span>
                )}
            </div>
            
            <form onSubmit={handleCalculateAdvanced} className="space-y-6">
                {isDirectMode ? (
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Tổng số tiền hoa hồng về (*)</label>
                        <div className="relative group">
                            <input 
                                type="text" 
                                inputMode="numeric" 
                                value={directCommission} 
                                onChange={handleNumericInputChange(setDirectCommission)} 
                                disabled={isLoading} 
                                className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-slate-900 text-xl md:text-2xl font-bold text-right transition-all" 
                                placeholder="0" 
                                autoFocus 
                                required 
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold group-focus-within:text-amber-500">VND</span>
                        </div>
                        <p className="mt-2 text-[11px] text-slate-500 italic">Nhập số tiền hoa hồng thực tế nhận được từ chủ đầu tư hoặc khách hàng.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Mã lô</label>
                                <input type="text" value={plotCode} onChange={(e) => setPlotCode(e.target.value)} disabled={isLoading} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 text-slate-900 font-medium" placeholder="ví dụ: L2C" />
                            </div>
                             <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Giá trị lô đất (*)</label>
                                <input type="text" inputMode="numeric" value={plotPrice} onChange={handleNumericInputChange(setPlotPrice)} disabled={isLoading} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 text-slate-900 font-bold text-right" placeholder="0" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Thưởng nóng</label>
                                <input type="text" inputMode="numeric" value={hotBonus} onChange={handleNumericInputChange(setHotBonus)} disabled={isLoading} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 text-slate-900 font-medium text-right" placeholder="0" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Cắt máu</label>
                                <input type="text" inputMode="numeric" value={bloodCut} onChange={handleNumericInputChange(setBloodCut)} disabled={isLoading} className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 text-slate-900 font-medium text-right text-red-600" placeholder="0" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">% Hoa hồng</label>
                                <div className="relative group">
                                    <input type="text" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} disabled={isLoading} className="w-full pl-3 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 text-slate-900 font-medium text-right" placeholder="Mặc định: 4" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">%</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Campaign Section */}
                {!campaignVisible && (
                    <div className="border-t border-slate-100 pt-6">
                        <button type="button" onClick={() => setCampaignVisible(true)} disabled={isLoading} className="flex items-center text-sm font-bold text-violet-600 hover:text-violet-800 transition-colors">
                            <PlusIcon className="w-5 h-5 mr-1" />
                            Thêm Chiến dịch Nguồn khách (Mặc định 50%)
                        </button>
                    </div>
                 )}

                {campaignVisible && (
                    <div className="p-5 border border-violet-100 rounded-2xl bg-violet-50/30 space-y-4 animate-fade-in shadow-inner">
                        <div className="flex justify-between items-center">
                            <div>
                                <label className="block text-sm font-bold text-slate-700">Góp vốn Nguồn khách</label>
                                <p className="text-[10px] text-violet-600 font-bold uppercase tracking-tight">Chiếm 50% HH Ròng để chia cho đội góp</p>
                            </div>
                            <button type="button" onClick={() => setCampaignVisible(false)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <TrashIcon className="w-5 h-5"/>
                            </button>
                        </div>
                         {campaignContributors.map((c) => (
                            <div key={c.id} className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-6">
                                    <input type="text" name="name" placeholder="Tên thành viên" value={c.name} onChange={(e) => handleCampaignContributorChange(c.id, e)} className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 text-xs font-medium" />
                                </div>
                                <div className="col-span-5">
                                    <input type="text" name="contribution" placeholder="Tiền góp vốn" inputMode="numeric" value={c.contribution} onChange={(e) => handleCampaignContributorChange(c.id, e)} className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 text-xs text-right font-bold" />
                                </div>
                                <div className="col-span-1">
                                    <button type="button" onClick={() => handleRemoveCampaignContributor(c.id)} disabled={campaignContributors.length <= 1} className="text-slate-300 hover:text-red-500 transition-colors">
                                        <TrashIcon className="w-4 h-4"/>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={handleAddCampaignContributor} className="text-[11px] font-bold text-violet-600 hover:underline">
                           + Thêm người góp vốn
                        </button>
                    </div>
                )}
                
                {/* Participants Section */}
                 <div className="border-t border-slate-100 pt-6">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">Phân chia đội nhóm (Tổ hợp 90%)</label>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">10% CỐ ĐỊNH CHO PHÍ CTY</p>
                        </div>
                        <span className={`text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all ${Math.abs(parseFloat(participants.reduce((s,p)=>s+(parseFloat(p.percentage)||0),0).toString()) - 90) < 0.1 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-600 border border-red-200 animate-pulse'}`}>
                            {participants.reduce((s,p)=>s+(parseFloat(p.percentage)||0), 0).toFixed(1)}% / 90%
                        </span>
                    </div>
                    <div className="space-y-4">
                      {participants.map((p) => {
                        const isNguonKhachCampaign = p.role === NGUON_KHACH_ROLE && campaignVisible;
                        return (
                        <div key={p.id} className="space-y-3">
                            <div className="grid grid-cols-12 gap-3 items-center animate-fade-in">
                                <div className="col-span-12 md:col-span-4">
                                    <input type="text" name="name" placeholder="Tên" value={p.name} onChange={(e) => handleParticipantChange(p.id, e)} disabled={isNguonKhachCampaign} className={`w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 text-sm font-medium ${isNguonKhachCampaign ? 'bg-violet-100 border-violet-300 text-violet-800' : ''}`} />
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                        <select name="role" value={p.role} onChange={(e) => handleParticipantChange(p.id, e)} disabled={isNguonKhachCampaign} className={`w-full p-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 text-sm ${isNguonKhachCampaign ? 'bg-violet-100 border-violet-300 font-bold' : ''}`}>
                                            {ROLES.map(role => <option key={role} value={role}>{role}</option>)}
                                        </select>
                                Windy </div>
                                <div className="col-span-8 md:col-span-3">
                                    <div className="relative">
                                        <input type="number" name="percentage" value={p.percentage} onChange={(e) => handleParticipantChange(p.id, e)} disabled={isNguonKhachCampaign} className={`w-full pl-3 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500 text-sm text-right font-bold ${isNguonKhachCampaign ? 'bg-violet-100 border-violet-300 text-violet-800' : ''}`} />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] font-bold">%</span>
                                    </div>
                                </div>
                                <div className="col-span-4 md:col-span-1">
                                    <button type="button" onClick={() => handleRemoveParticipant(p.id)} disabled={participants.length <= 1 || isNguonKhachCampaign} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                        <TrashIcon className="w-5 h-5"/>
                                    </button>
                                </div>
                            </div>

                             {isNguonKhachCampaign && totalCampaignContribution > 0 && (
                                <div className="ml-4 pl-4 border-l-4 border-violet-200 space-y-2 py-2 bg-slate-50/50 rounded-r-xl">
                                    {campaignContributors.map(c => {
                                        const contribution = parseNumberInput(c.contribution);
                                        const effectivePercentage = (contribution / totalCampaignContribution) * nguonKhachPercentage;
                                        if (!c.name || contribution === 0) return null;
                                        return (
                                            <div key={c.id} className="text-[10px] text-slate-500 flex justify-between uppercase font-black tracking-tight">
                                                <span>{c.name}:</span>
                                                <span className="text-violet-600">Phần trăm thực: {effectivePercentage.toFixed(2)}% HH Ròng</span>
                                            </div>
                                        )
                                    })}
                                </div>
                             )}
                        </div>
                      )})}
                    </div>
                    <button type="button" onClick={handleAddParticipant} className="mt-4 text-[11px] font-bold text-violet-600 hover:underline">
                        + Thêm thành viên khác
                    </button>
                </div>

                {/* Expenses Section */}
                 <div className="border-t border-slate-100 pt-6">
                    <label className="block text-sm font-bold text-slate-700 mb-4">Chi phí khác (Hoàn lại cho người ứng)</label>
                    <div className="space-y-3">
                        {expenses.map((exp) => (
                        <div key={exp.id} className="grid grid-cols-12 gap-3 items-center animate-fade-in">
                            <div className="col-span-12 md:col-span-4">
                                <input type="text" name="description" placeholder="Nội dung chi" value={exp.description} onChange={(e) => handleExpenseChange(exp.id, e)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-medium" />
                            </div>
                            <div className="col-span-12 md:col-span-4">
                                <input type="text" name="amount" placeholder="Số tiền" inputMode="numeric" value={exp.amount} onChange={(e) => handleExpenseChange(exp.id, e)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[11px] text-right font-bold" />
                            </div>
                            <div className="col-span-8 md:col-span-3">
                                <select name="paidBy" value={exp.paidBy} onChange={(e) => handleExpenseChange(exp.id, e)} className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-[10px] font-bold">
                                    <option value="">Người ứng tiền</option>
                                    {participantNames.map(name => <option key={name} value={name}>{name}</option>)}
                                    {campaignVisible && campaignContributors.filter(c => c.name.trim()).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                                </select>
                            </div>
                            <div className="col-span-4 md:col-span-1">
                                <button type="button" onClick={() => handleRemoveExpense(exp.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                    <TrashIcon className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                        ))}
                    </div>
                     <button type="button" onClick={handleAddExpense} className="mt-4 text-[11px] font-bold text-violet-600 hover:underline">
                        + Thêm mục chi phí
                    </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-8">
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={isLoading}
                        className="flex-1 bg-slate-100 text-slate-500 font-bold py-4 px-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center text-sm"
                    >
                        <RefreshIcon className="w-5 h-5 mr-2" />
                        Xóa trắng
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`flex-[2] text-white font-bold py-4 px-6 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center text-sm md:text-base ${isDirectMode ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 'bg-violet-600 hover:bg-violet-700 shadow-violet-600/20'}`}
                    >
                        {isLoading ? <Spinner /> : 'Bắt đầu tính toán'}
                    </button>
                </div>
            </form>
          </div>
          
          {/* Result Section */}
          <div className="lg:sticky lg:top-8">
            {isLoading && (
              <div className="flex justify-center items-center p-12 bg-white rounded-3xl shadow-xl border border-slate-200/80 min-h-[450px]">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Spinner size="lg" />
                    <SparklesIcon className="w-6 h-6 text-violet-400 absolute -top-2 -right-2 animate-pulse" />
                  </div>
                  <p className="mt-6 text-slate-700 font-bold text-lg">AI đang phân tích...</p>
                  <p className="text-slate-400 text-xs mt-1">Đang tính toán chính xác số liệu cho bạn</p>
                </div>
              </div>
            )}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 text-red-700 p-6 rounded-3xl shadow-lg animate-shake" role="alert">
                <p className="font-black text-lg mb-1">Cần điều chỉnh</p>
                <p className="font-medium text-sm leading-relaxed">{error}</p>
              </div>
            )}
            {result && !isLoading && <ResultDisplay result={result} />}
             {!result && !isLoading && !error && (
                <div className="bg-white/60 p-10 rounded-3xl shadow-xl border border-slate-200/80 text-center min-h-[450px] flex flex-col justify-center items-center backdrop-blur-md border-dashed border-2">
                    <div className="bg-slate-100 p-6 rounded-3xl mb-6">
                        <CalculatorIcon className="w-12 h-12 text-slate-300" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-400">Sẵn sàng nhận lệnh</h3>
                    <p className="text-slate-400 mt-3 max-w-xs font-medium text-xs md:text-sm">Hoàn tất các thông tin bên trái để nhận bảng phân chia hoa hồng chi tiết đến từng thành viên.</p>
                </div>
             )}
          </div>
        </div>
        )}
      </main>
    </div>
  );
};

export default App;
```
