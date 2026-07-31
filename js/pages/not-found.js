import { icon } from '../lib/icons.js';
import { applySeo } from '../lib/seo.js';

export function renderNotFound(root) {
  root.innerHTML = `
    <section class="not-found container">
      <p class="eyebrow center-text">${icon('xCircle')} 404</p>
      <h1 style="margin:12px 0;">This page went out for a clean.</h1>
      <p class="body-lg max-w-copy mx-auto" style="margin-bottom:20px;">We couldn't find what you were looking for. Let's get you back home.</p>
      <a href="/" data-router-link class="btn btn-primary">${icon('home')} Back to Home</a>
    </section>
  `;

  applySeo({
    path: '/404',
    title: 'Page Not Found',
    description: 'The page you were looking for could not be found.',
  });

  return () => {};
}
