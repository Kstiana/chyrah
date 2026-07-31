import { icon } from '../lib/icons.js';
import { qs, qsa } from '../lib/utils.js';
import { openBookingSheet } from './booking-widget.js';

const NAV_LINKS = [
  { href: '/home-services', label: 'Home Services' },
  { href: '/beauty', label: 'Care & Beauty' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/service-area', label: 'Service Area' },
  { href: '/about', label: 'Who We Are' },
  { href: '/faq', label: 'FAQ' },
];

let lastFocusedEl = null;

export function renderHeader(root) {
  root.innerHTML = `
    <header class="site-header" data-header>
      <div class="header-inner">
        <a href="/" data-router-link class="brand-mark">
          ${icon('logo')}
          <span class="brand-wordmark">CHYRAH</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          ${NAV_LINKS.slice(0, 4).map((l) => `<a href="${l.href}" data-router-link data-nav-link>${l.label}</a>`).join('')}
        </nav>
        <div class="header-actions">
          <button type="button" class="btn btn-outline-gold btn-sm btn-book-header" data-open-booking aria-label="Book Now">
            ${icon('calendar')}<span class="btn-label">Book Now</span>
          </button>
          <a href="/contact" data-router-link class="icon-btn desktop-only-flex" aria-label="Contact us">${icon('user')}</a>
          <button type="button" class="icon-btn nav-toggle" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">${icon('menu')}</button>
        </div>
      </div>
    </header>
    <div class="mobile-menu-overlay" data-menu-overlay></div>
    <div class="mobile-menu" data-mobile-menu id="mobile-menu" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden="true">
      <div class="mobile-menu-top">
        <a href="/" data-router-link class="brand-mark">
          ${icon('logo')}
          <span class="brand-wordmark">CHYRAH</span>
        </a>
        <button type="button" class="icon-btn" data-menu-close aria-label="Close menu">${icon('close')}</button>
      </div>
      <nav class="mobile-menu-links" aria-label="Mobile primary">
        <a href="/" data-router-link>Home</a>
        ${NAV_LINKS.map((l) => `<a href="${l.href}" data-router-link>${l.label}</a>`).join('')}
      </nav>
      <a href="/contact" data-router-link class="mobile-menu-contact">
        ${icon('user')}
        <span>Contact Us</span>
      </a>
      <div class="mobile-menu-foot">
        <button type="button" class="btn btn-primary btn-full" data-open-booking>${icon('calendar')} Book Now</button>
        <a href="https://wa.me/2348050877193" target="_blank" rel="noopener" class="btn btn-ghost btn-full">${icon('whatsapp')} WhatsApp Us</a>
      </div>
    </div>
  `;

  const header = qs('[data-header]', root);
  const mobileMenu = qs('[data-mobile-menu]', root);
  const overlay = qs('[data-menu-overlay]', root);
  const toggleBtn = qs('[data-menu-toggle]', root);

  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function getFocusable() {
    return qsa('a[href], button:not([disabled])', mobileMenu);
  }

  function openMenu() {
    lastFocusedEl = document.activeElement;
    mobileMenu.classList.add('is-open');
    overlay.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const focusable = getFocusable();
    if (focusable.length) focusable[0].focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  qsa('[data-menu-toggle]', root).forEach((btn) => btn.addEventListener('click', openMenu));
  qsa('[data-menu-close]', root).forEach((btn) => btn.addEventListener('click', closeMenu));
  overlay.addEventListener('click', closeMenu);
  qsa('[data-mobile-menu] a', root).forEach((a) => a.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (!mobileMenu.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeMenu();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  qsa('[data-open-booking]', root).forEach((btn) => {
    btn.addEventListener('click', () => {
      closeMenu();
      openBookingSheet();
    });
  });

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-booking]');
    if (btn && !root.contains(btn)) {
      openBookingSheet();
    }
  });
}
