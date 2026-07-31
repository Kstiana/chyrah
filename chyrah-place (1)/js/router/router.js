import { applySeo, organizationJsonLd } from '../lib/seo.js';
import { qs, qsa } from '../lib/utils.js';

import { renderHome } from '../pages/home.js';
import { renderHomeServicesHub } from '../pages/home-services-hub.js';
import { renderBeautyHub } from '../pages/beauty-hub.js';
import { renderServicePage } from '../pages/service-page.js';
import { renderHowItWorks } from '../pages/how-it-works.js';
import { renderPricing } from '../pages/pricing.js';
import { renderServiceArea } from '../pages/service-area.js';
import { renderAbout } from '../pages/about.js';
import { renderFaq } from '../pages/faq.js';
import { renderContact } from '../pages/contact.js';
import { renderNotFound } from '../pages/not-found.js';

const routes = [
  { pattern: '^/$', handler: renderHome },
  { pattern: '^/home-services/?$', handler: renderHomeServicesHub },
  { pattern: '^/home-services/([a-z0-9-]+)/?$', handler: (root, m) => renderServicePage(root, m[1], 'home-services') },
  { pattern: '^/beauty/?$', handler: renderBeautyHub },
  { pattern: '^/beauty/([a-z0-9-]+)/?$', handler: (root, m) => renderServicePage(root, m[1], 'beauty') },
  { pattern: '^/how-it-works/?$', handler: renderHowItWorks },
  { pattern: '^/pricing/?$', handler: renderPricing },
  { pattern: '^/service-area/?$', handler: renderServiceArea },
  { pattern: '^/about/?$', handler: renderAbout },
  { pattern: '^/faq/?$', handler: renderFaq },
  { pattern: '^/contact/?$', handler: renderContact },
];

let currentCleanup = null;
const listeners = [];

export function onRouteChange(fn) {
  listeners.push(fn);
}

function normalizePath(pathname) {
  let path = pathname;
  if (path.endsWith('/index.html')) {
    path = path.slice(0, -'index.html'.length);
  }
  if (path === '') path = '/';
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
    if (path === '') path = '/';
  }
  return path;
}

function matchRoute(path) {
  for (const route of routes) {
    const match = path.match(new RegExp(route.pattern));
    if (match) return { route, match };
  }
  return null;
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function renderRoute() {
  const root = qs('#route-outlet');
  if (!root) return;

  if (typeof currentCleanup === 'function') {
    try { currentCleanup(); } catch (err) { /* noop */ }
    currentCleanup = null;
  }

  const rawPath = window.location.pathname;
  const path = normalizePath(rawPath);
  if (path !== rawPath) {
    window.history.replaceState({}, '', path + window.location.search + window.location.hash);
  }
  const found = matchRoute(path);
  const reduced = prefersReducedMotion();

  root.classList.add('is-loading');
  if (!reduced) await wait(140);
  window.scrollTo(0, 0);

  if (!found) {
    currentCleanup = renderNotFound(root);
  } else {
    currentCleanup = await found.route.handler(root, found.match);
  }

  requestAnimationFrame(() => root.classList.remove('is-loading'));
  updateActiveNav(path);
  observeFadeIns(root);
  listeners.forEach((fn) => fn(path));

  if (path === '/') {
    applySeo({
      path: '/',
      title: null,
      description: 'Premium home cleaning, pedicure, and manicure delivered nationwide across Nigeria. Licensed, insured, background-checked professionals. Relax, we go run am.',
      jsonLd: organizationJsonLd(),
    });
  }
}

function updateActiveNav(path) {
  qsa('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href');
    const isActive = href === '/' ? path === '/' : path.startsWith(href);
    link.classList.toggle('is-active', isActive);
  });
}

function observeFadeIns(root) {
  const targets = qsa('.faded-in', root);
  if (!targets.length) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((t) => observer.observe(t));
}

export function navigate(path) {
  if (path === normalizePath(window.location.pathname)) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  window.history.pushState({}, '', path);
  renderRoute();
}

export function initRouter() {
  document.body.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[data-router-link]');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || /^(https?:|tel:|mailto:|#)/.test(href) || anchor.target === '_blank') return;
    event.preventDefault();
    navigate(href);
  });

  window.addEventListener('popstate', renderRoute);
  renderRoute();
}
