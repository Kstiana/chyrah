import { icon } from '../lib/icons.js';
import { qs, qsa, formatNaira } from '../lib/utils.js';
import { services, images, packageCategories, brand } from '../lib/data.js';
import { renderHubSplit } from '../components/hub-panel.js';
import { renderStepsRow } from '../components/how-it-works.js';
import { renderTrustBand } from '../components/trust-band.js';
import { renderTestimonials } from '../components/testimonial-carousel.js';
import { renderFaqAccordion } from '../components/faq-accordion.js';
import { serviceCardHtml } from '../components/service-card.js';
import { mountBookingWidgetDesktop } from '../components/booking-widget.js';
import { faqs } from '../lib/data.js';

const SHOWCASE_TABS = [
  { key: 'home', label: 'Home', icon: 'home', image: images.livingRoom, stat: '1,200+', statLabel: 'homes cleaned', text: 'Room-by-room deep cleaning that resets your space to feel brand new.' },
  { key: 'office', label: 'Office', icon: 'office', image: images.officeClean, stat: '95', statLabel: 'offices served', text: 'A spotless workspace that reflects your professional standard.' },
  { key: 'medical', label: 'Medical', icon: 'medical', image: images.bathroomClean, stat: '100%', statLabel: 'sanitised protocol', text: 'Hygiene-first cleaning.' },
  { key: 'beauty', label: 'Beauty', icon: 'sparkleHeart', image: images.pedicure, stat: '4.9', statLabel: 'average rating', text: 'Pedicure and manicure sessions.' },
];

function heroSection() {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-grid">
          <div class="hero-copy faded-in">
            <p class="eyebrow">${icon('shieldCheck')} Trusted premium home service brand</p>
            <h1>Premium <span class="italic">Cleaning</span> & Home Care Services</h1>
            <p class="body-lg">Domestic cleaning, pedicure, and manicure — delivered to your doorstep across Nigeria. ${brand.tagline}</p>
            <div class="hero-actions">
              <button type="button" class="btn btn-primary" data-open-booking>${icon('calendar')} Book Now</button>
              <a href="/home-services" data-router-link class="btn btn-outline-gold">View Services</a>
            </div>
            <div class="hero-trust-row">
              <span class="hero-trust-item">${icon('star')} 4.9 Rated</span>
              <span class="hero-trust-item">${icon('shieldCheck')} Licensed</span>
              <span class="hero-trust-item">${icon('lock')} Insured</span>
              <span class="hero-trust-item">${icon('headset')} 24/7 Support</span>
            </div>
          </div>
          <div class="hero-showcase faded-in">
            <div class="showcase-tabs" data-showcase-tabs>
              ${SHOWCASE_TABS.map((t, i) => `<button type="button" class="showcase-tab${i === 0 ? ' is-active' : ''}" data-tab="${t.key}">${icon(t.icon)} ${t.label}</button>`).join('')}
            </div>
            <div class="showcase-panel" data-showcase-panel></div>
            <div class="showcase-dots" data-showcase-dots>
              ${SHOWCASE_TABS.map((t, i) => `<button type="button" class="dot${i === 0 ? ' is-active' : ''}" data-tab="${t.key}" aria-label="Show ${t.label} example"></button>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function drawShowcase(root) {
  const panel = qs('[data-showcase-panel]', root);
  function draw(key) {
    const tab = SHOWCASE_TABS.find((t) => t.key === key);
    panel.innerHTML = `
      <div class="arch-frame">
        <img src="${tab.image}" alt="${tab.label} service" />
        <div class="showcase-stats">
          <div><div class="showcase-stat-num">${tab.stat}</div><div class="showcase-stat-label">${tab.statLabel}</div></div>
        </div>
      </div>
      <p class="showcase-caption">${tab.text}</p>
    `;
  }

  function setActive(key) {
    qsa('[data-tab]', root).forEach((btn) => btn.classList.toggle('is-active', btn.dataset.tab === key));
    draw(key);
  }

  qsa('[data-showcase-tabs] [data-tab], [data-showcase-dots] [data-tab]', root).forEach((btn) => {
    btn.addEventListener('click', () => setActive(btn.dataset.tab));
  });

  setActive('home');
}

function featuredSection() {
  return `
    <section class="section">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">Featured Excellence</p>
          <h2 style="margin-top:8px;">Bespoke home and beauty services, <span class="italic">tailored to your lifestyle.</span></h2>
        </div>
        <div class="grid-3" data-service-grid></div>
      </div>
    </section>
  `;
}

function hubSection() {
  return `
    <section class="section" style="padding-top:0;">
      <div class="container" data-hub-split></div>
    </section>
  `;
}

function stepsSection() {
  return `
    <section class="section" style="background:var(--color-stone);">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-5);">
          <p class="eyebrow">How It Works</p>
          <h2 style="margin-top:8px;">From booking to <span class="italic">relax</span>, in four steps.</h2>
        </div>
        <div data-steps-row></div>
      </div>
    </section>
  `;
}

function bookingSection() {
  return `
    <section class="section" id="book">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">Live Booking</p>
          <h2 style="margin-top:8px;">Book your visit, <span class="italic">right here.</span></h2>
        </div>
        <div class="booking-widget" style="max-width:820px; margin:0 auto;" data-booking-widget></div>
      </div>
    </section>
  `;
}

function gallerySection() {
  const rows = [
    { image: images.suppliesBucket, name: 'Domestic Cleaning', text: 'Our staff move room to room with a consistent standard — not a rushed once-over, but the kind of clean you notice in the corners.', price: 30000, href: '/home-services/domestic-cleaning' },
    { image: images.pedicure, name: 'Pedicure', text: 'A warm soak, careful shaping, and a finish that lasts — the full spa treatment, without the drive.', price: 20000, href: '/beauty/pedicure' },
    { image: images.officeClean, name: 'Office Cleaning', text: 'Scheduled around your business hours, so your team walks into a spotless workspace every single time.', price: 45000, href: '/home-services/office-cleaning' },
  ];
  return `
    <section class="section">
      <div class="container" style="display:flex; flex-direction:column; gap:var(--space-6);">
        ${rows.map((r, i) => `
          <div class="zigzag-row${i % 2 ? ' reverse' : ''} faded-in">
            <div class="zigzag-image"><div class="arch-frame"><img src="${r.image}" alt="${r.name}" loading="lazy" /></div></div>
            <div>
              <p class="eyebrow" style="margin-bottom:8px;">${r.name}</p>
              <p class="body-lg" style="margin-bottom:16px;">${r.text}</p>
              <div class="price-tag-gold" style="margin-bottom:18px;">Starting at <strong>${formatNaira(r.price)}</strong></div>
              <div><a href="${r.href}" data-router-link class="link-arrow">Learn more ${icon('arrowRight')}</a></div>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function testimonialsSection() {
  return `
    <section class="section" style="background:var(--color-stone);">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">Loved by busy professionals across Nigeria</p>
          <h2 style="margin-top:8px;">What our clients say.</h2>
        </div>
        <div data-testimonials></div>
        <div class="center-text" style="margin-top:var(--space-4);">
          <a href="${brand.instagramUrl}" target="_blank" rel="noopener" class="link-arrow" style="justify-content:center;">${icon('instagram')} Follow ${brand.instagram} for daily inspo</a>
        </div>
      </div>
    </section>
  `;
}

function pricingPreviewSection() {
  const popular = packageCategories.find((c) => c.popular);
  return `
    <section class="section">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">Packages</p>
          <h2 style="margin-top:8px;">Three ways to keep it <span class="italic">spotless.</span></h2>
        </div>
        <div class="pricing-grid">
          ${packageCategories.map((c) => `
            <div class="pricing-card${c.popular ? ' is-popular' : ''} faded-in">
              ${c.popular ? '<span class="pricing-card-badge">Most Popular</span>' : ''}
              <span class="pricing-card-tier">${c.name}</span>
              <span style="font-size:14px; color:var(--color-charcoal-soft);">${c.tagline}</span>
              <hr class="divider-gold" />
              <span class="pricing-card-price">${formatNaira(c.tiers[0].price)}</span>
              <span class="pricing-card-cycle">From, ${c.cycle.toLowerCase()}</span>
              <a href="/pricing" data-router-link class="btn ${c.popular ? 'btn-primary' : 'btn-ghost'} btn-full" style="margin-top:10px;">See ${c.name} plans</a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}

function faqSection() {
  return `
    <section class="section" style="background:var(--color-stone);">
      <div class="container" style="max-width:820px;">
        <div class="center-text" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">Frequently Asked Questions</p>
          <h2 style="margin-top:8px;">Any doubts? Let's clear them.</h2>
        </div>
        <div data-faq></div>
      </div>
    </section>
  `;
}

function finalCtaSection() {
  return `
    <section class="section">
      <div class="container">
        <div class="final-cta faded-in">
          <img src="${images.finalCta}" alt="Fresh folded towels ready for a client" loading="lazy" />
          <div class="final-cta-content">
            <h2>Book your first visit.</h2>
            <button type="button" class="btn btn-primary" data-open-booking>${icon('calendar')} Book Now</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderHome(root) {
  root.innerHTML = `
    ${heroSection()}
    ${featuredSection()}
    ${hubSection()}
    ${stepsSection()}
    ${bookingSection()}
    ${gallerySection()}
    <div data-trust-band></div>
    ${testimonialsSection()}
    ${pricingPreviewSection()}
    ${faqSection()}
    ${finalCtaSection()}
  `;

  drawShowcase(root);
  qs('[data-service-grid]', root).innerHTML = services.slice(0, 6).map((s, i) => serviceCardHtml(s, i)).join('');
  renderHubSplit(qs('[data-hub-split]', root));
  renderStepsRow(qs('[data-steps-row]', root));
  mountBookingWidgetDesktop(qs('[data-booking-widget]', root));
  renderTrustBand(qs('[data-trust-band]', root));
  renderTestimonials(qs('[data-testimonials]', root));
  renderFaqAccordion(qs('[data-faq]', root), faqs.slice(0, 4));

  return () => {};
}
