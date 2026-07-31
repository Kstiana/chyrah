import { icon } from '../lib/icons.js';

export function mountBackToTop(container) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = icon('chevronDown');
  container.appendChild(btn);

  function onScroll() {
    btn.classList.toggle('is-visible', window.scrollY > 480);
  }

  btn.addEventListener('click', () => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, behavior });
    btn.blur();
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
