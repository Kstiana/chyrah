import { icon } from '../lib/icons.js';
import { qs, formatNaira } from '../lib/utils.js';
import { services, hubs } from '../lib/data.js';
import { serviceCardHtml } from '../components/service-card.js';
import { renderFaqAccordion } from '../components/faq-accordion.js';
import { applySeo } from '../lib/seo.js';
import { renderNotFound } from './not-found.js';

export function renderServicePage(root, slug, hubSlug) {
  const service = services.find((s) => s.slug === slug && s.hub === hubSlug);
  if (!service) return renderNotFound(root);

  const hub = hubs[hubSlug];
  const related = services.filter((s) => s.hub === hubSlug && s.slug !== slug).slice(0, 3);
  const accent = hubSlug === 'beauty' ? 'beauty' : 'home';

  root.innerHTML = `
    <section class="service-page-hero">
      <div class="container">
        <div class="two-col-desktop">
          <div class="faded-in">
            <p class="eyebrow">${icon(hub.icon)} ${hub.name}</p>
            <h1 style="margin:8px 0 14px;">${service.name}</h1>
            <p class="body-lg" style="margin-bottom:20px;">${service.short}</p>
            <div class="price-tag-gold" style="margin-bottom:20px;">Starting at <strong>${formatNaira(service.startingAt)}</strong></div>
            <button type="button" class="btn btn-${accent}" data-open-booking>${icon('calendar')} Book This Service</button>
          </div>
          <div class="arch-frame faded-in"><img src="${service.image}" alt="${service.name}" /></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="two-col-desktop">
          <div>
            <p class="eyebrow" style="margin-bottom:14px;">Benefits</p>
            <div class="included-list">
              ${service.benefits.map((b) => `<div class="included-item">${icon('checkCircle')}<span>${b}</span></div>`).join('')}
            </div>
          </div>
          <div>
            <p class="eyebrow" style="margin-bottom:14px;">What's Included</p>
            <div class="included-list">
              ${service.included.map((b) => `<div class="included-item">${icon('check')}<span>${b}</span></div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--color-stone);">
      <div class="container">
        <p class="eyebrow center-text" style="margin-bottom:20px;">Before & After</p>
        <div class="before-after">
          <figure>
            <div class="arch-frame"><img src="${service.before}" alt="Before the visit" loading="lazy" /></div>
            <figcaption>Before</figcaption>
          </figure>
          <figure>
            <div class="arch-frame"><img src="${service.image}" alt="After the visit" loading="lazy" /></div>
            <figcaption>After</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="section" style="max-width:820px; margin:0 auto;">
      <div class="container">
        <p class="eyebrow center-text" style="margin-bottom:20px;">Frequently Asked Questions</p>
        <div data-service-faq></div>
      </div>
    </section>

    <section class="section" style="background:var(--color-${accent}-wash);">
      <div class="container center-text">
        <p class="eyebrow">Pricing</p>
        <h2 style="margin:8px 0 16px;">Starting at <span class="italic font-mono" style="font-family:var(--font-mono); font-style:normal;">${formatNaira(service.startingAt)}</span></h2>
        <p class="body-text max-w-copy mx-auto" style="margin-bottom:20px;">Final pricing depends on the size of your home or your chosen add-ons. See full packages, or book directly and we'll confirm your total before payment.</p>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <a href="/pricing" data-router-link class="btn btn-ghost">See Full Pricing</a>
          <button type="button" class="btn btn-${accent}" data-open-booking>${icon('calendar')} Book Now</button>
        </div>
      </div>
    </section>

    ${related.length ? `
      <section class="section">
        <div class="container">
          <p class="eyebrow center-text" style="margin-bottom:20px;">Related Services</p>
          <div class="related-services-grid">${related.map((s, i) => serviceCardHtml(s, i)).join('')}</div>
        </div>
      </section>
    ` : ''}
  `;

  renderFaqAccordion(qs('[data-service-faq]', root), service.faqs);

  applySeo({
    path: `/${hubSlug}/${slug}`,
    title: service.name,
    description: service.short,
    image: service.image,
  });

  return () => {};
}