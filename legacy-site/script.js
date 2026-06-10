/* =========================================================
   Maly Development — script.js
   ========================================================= */

'use strict';

/* ─── Language Module ──────────────────────────────────── */
const LanguageModule = (() => {
  const STORAGE_KEY = 'md-lang';
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'de';

  function applyLanguage(lang) {
    // Update <html lang>
    document.documentElement.lang = lang;

    // Swap textContent for data-de / data-en elements
    document.querySelectorAll('[data-de]').forEach(el => {
      const text = el.dataset[lang];
      if (text !== undefined) el.textContent = text;
    });

    // Swap placeholder attributes
    document.querySelectorAll('[data-de-placeholder]').forEach(el => {
      const key = lang + 'Placeholder';
      if (el.dataset[key] !== undefined) {
        el.placeholder = el.dataset[key];
      }
    });

    // Swap aria-label for store links
    document.querySelectorAll('[data-de-aria]').forEach(el => {
      const key = lang + 'Aria';
      if (el.dataset[key] !== undefined) {
        el.setAttribute('aria-label', el.dataset[key]);
      }
    });

    // Update all language toggle buttons
    document.querySelectorAll('.nav__lang-option').forEach(opt => {
      opt.classList.toggle('is-active', opt.dataset.lang === lang);
    });

    // Update page title
    if (lang === 'de') {
      document.title = 'Maly Development — App-Entwicklung & Software-Freelancer';
    } else {
      document.title = 'Maly Development — App Development & Software Freelancer';
    }

    // Persist
    localStorage.setItem(STORAGE_KEY, lang);
    currentLang = lang;
  }

  function toggle() {
    applyLanguage(currentLang === 'de' ? 'en' : 'de');
  }

  function init() {
    // Bind both nav language toggles (desktop + mobile)
    document.querySelectorAll('#langToggle, #langToggleMobile').forEach(btn => {
      btn.addEventListener('click', toggle);
    });
    applyLanguage(currentLang);
  }

  return { init, getCurrent: () => currentLang };
})();

/* ─── Navigation Module ────────────────────────────────── */
const NavModule = (() => {
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  let menuOpen = false;

  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 50);
  }

  function openMenu() {
    menuOpen = true;
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Menü schließen');
    mobileMenu.setAttribute('aria-hidden', 'false');
    mobileMenu.classList.add('is-open');
    hamburger.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuOpen = false;
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Menü öffnen');
    mobileMenu.setAttribute('aria-hidden', 'true');
    mobileMenu.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // set initial state

    hamburger.addEventListener('click', toggleMenu);

    // Close on mobile link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (menuOpen && !nav.contains(e.target)) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    });

    // Active link highlighting via IntersectionObserver
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav__link');

    if (sections.length && links.length) {
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            links.forEach(link => {
              link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      }, { rootMargin: '-40% 0px -55% 0px' });

      sections.forEach(s => sectionObserver.observe(s));
    }
  }

  return { init };
})();

/* ─── Scroll Animation Module ──────────────────────────── */
const ScrollAnimModule = (() => {
  function init() {
    // Respect user's reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Make all animated elements immediately visible
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }

  return { init };
})();

/* ─── Form Module ──────────────────────────────────────── */
const FormModule = (() => {
  const MESSAGES = {
    de: {
      required: 'Dieses Feld ist erforderlich.',
      email: 'Bitte gib eine gültige E-Mail-Adresse ein.',
      gdpr: 'Bitte stimme der Datenschutzerklärung zu.',
    },
    en: {
      required: 'This field is required.',
      email: 'Please enter a valid email address.',
      gdpr: 'Please accept the privacy policy.',
    }
  };

  function clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
    form.querySelectorAll('.form-input').forEach(el => el.classList.remove('is-error'));
  }

  function showError(inputEl, errorId, msg) {
    inputEl.classList.add('is-error');
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = msg;
  }

  function validate(form, lang) {
    clearErrors(form);
    const msgs = MESSAGES[lang] || MESSAGES.de;
    let valid = true;

    const name = form.querySelector('#name');
    if (name && !name.value.trim()) {
      showError(name, 'name-error', msgs.required);
      valid = false;
    }

    const email = form.querySelector('#email');
    if (email) {
      if (!email.value.trim()) {
        showError(email, 'email-error', msgs.required);
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        showError(email, 'email-error', msgs.email);
        valid = false;
      }
    }

    const message = form.querySelector('#message');
    if (message && !message.value.trim()) {
      showError(message, 'message-error', msgs.required);
      valid = false;
    }

    const gdpr = form.querySelector('#gdpr');
    if (gdpr && !gdpr.checked) {
      const gdprError = document.getElementById('gdpr-error');
      if (gdprError) gdprError.textContent = msgs.gdpr;
      valid = false;
    }

    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const lang = LanguageModule.getCurrent();

    if (!validate(form, lang)) return;

    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.disabled = true;
      btn.classList.add('is-loading');
    }

    try {
      const formData = new FormData(form);
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        form.hidden = true;
        const successEl = document.getElementById('formSuccess');
        if (successEl) successEl.hidden = false;
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      console.error('Form submission error:', err);
      if (btn) {
        btn.disabled = false;
        btn.classList.remove('is-loading');
      }
    }
  }

  function init() {
    const form = document.getElementById('contactForm');
    if (form) form.addEventListener('submit', handleSubmit);
  }

  return { init };
})();

/* ─── Misc Module ──────────────────────────────────────── */
const MiscModule = (() => {
  function init() {
    // Auto-update copyright year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
  return { init };
})();

/* ─── Bootstrap ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  MiscModule.init();
  LanguageModule.init();
  NavModule.init();
  ScrollAnimModule.init();
  FormModule.init();
});
