/* ============================================
   TL LAND — Landing Page Tuyển Dụng
   JavaScript: Animations, Form, Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. SCROLL REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-stagger');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve — allows re-triggering if needed
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // 2. NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  let lastScrollY = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ============================================
  // 3. COUNTER ANIMATION
  // ============================================
  const counters = document.querySelectorAll('[data-count]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true';
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target = parseInt(el.dataset.count);
    const duration = 2000;
    const start = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current.toLocaleString('vi-VN') + '+';

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ============================================
  // 4. SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // 5. FAQ ACCORDION
  // ============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Toggle current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });

  // ============================================
  // 6. FORM HANDLING — TELEGRAM BOT
  // ============================================
  const form = document.getElementById('application-form');
  const formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.dataset.recruitmentPaused === 'true') return;

      const submitBtn = form.querySelector('.form-submit');
      const originalText = submitBtn.innerHTML;

      // Loading state
      submitBtn.innerHTML = '⏳ Đang gửi...';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      try {
        const formData = new FormData(form);

        const response = await fetch('/api/recruitment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData.entries()))
        });
        if (!response.ok) throw new Error('Gửi đơn thất bại');
        showSuccess();
      } catch (error) {
        console.error('Form error:', error);
        // Hiện thông báo lỗi trung thực
        submitBtn.innerHTML = '❌ Gửi thất bại — Thử lại';
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.background = '#dc2626';

        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 3000);
        return;
      }

      function showSuccess() {
        form.style.display = 'none';
        formSuccess.classList.add('show');

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ============================================
  // 7. FLOATING CTA VISIBILITY
  // ============================================
  const floatingCta = document.getElementById('floating-cta');
  const heroSection = document.getElementById('hero');
  const formSection = document.getElementById('form-section');

  if (floatingCta && window.innerWidth <= 768) {
    const floatingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Show floating CTA when hero is NOT visible
        if (entry.target === heroSection) {
          if (!entry.isIntersecting) {
            floatingCta.style.display = 'flex';
          } else {
            floatingCta.style.display = 'none';
          }
        }
      });
    }, { threshold: 0 });

    floatingObserver.observe(heroSection);
  }

  // ============================================
  // 8. IMAGE LAZY LOADING ERROR HANDLER
  // ============================================
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      // If image fails to load, show styled placeholder
      this.style.display = 'none';
      const placeholder = document.createElement('div');
      placeholder.className = 'img-placeholder';
      placeholder.style.width = '100%';
      placeholder.style.height = '100%';
      placeholder.style.position = 'absolute';
      placeholder.style.top = '0';
      placeholder.style.left = '0';
      placeholder.textContent = '📷';
      this.parentElement.appendChild(placeholder);
    });
  });

  // ============================================
  // 9. PHONE NUMBER FORMAT HELPER
  // ============================================
  const phoneInput = document.querySelector('input[name="phone"]');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Remove non-digit characters
      let value = e.target.value.replace(/\D/g, '');
      // Limit to 11 digits
      if (value.length > 11) value = value.slice(0, 11);
      e.target.value = value;
    });
  }

  // ============================================
  // 10. PARALLAX SUBTLE EFFECT
  // ============================================
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        // Parallax only on desktop
        if (window.innerWidth > 768) {
          const scrolled = window.scrollY;
          const hero = document.querySelector('.hero');
          if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.15}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.4;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ============================================
  // 11. READ MORE / SHOW LESS FOR SOCIAL PROOF
  // ============================================
  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = this.closest('.proof-card');
      const resultText = card.querySelector('.proof-result');
      
      resultText.classList.toggle('expanded');
      
      if (resultText.classList.contains('expanded')) {
        this.textContent = 'Thu gọn';
      } else {
        this.textContent = 'Xem thêm';
      }
    });
  });

});
