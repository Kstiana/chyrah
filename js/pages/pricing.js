import { icon } from '../lib/icons.js';
import { qs, qsa, formatNaira } from '../lib/utils.js';
import { packageCategories } from '../lib/data.js';
import { applySeo } from '../lib/seo.js';
import { openBookingSheet } from '../components/booking-widget.js';

function categoryCard(cat) {
  return `
    <button type="button" class="pricing-card${cat.popular ? ' is-popular' : ''} faded-in" data-category-card="${cat.key}" style="text-align:left; cursor:pointer; width:100%;">
      ${cat.popular ? '<span class="pricing-card-badge">Most Popular</span>' : ''}
      <span class="pricing-card-tier">${cat.name}</span>
      <span style="font-size:14px; color:var(--color-charcoal-soft);">${cat.tagline}</span>
      <hr class="divider-gold" />
      <span class="pricing-card-price">${formatNaira(cat.tiers[0].price)}<span style="font-size:14px;"> +</span></span>
      <span class="pricing-card-cycle">${cat.cycle}</span>
      <ul>
        ${cat.includes.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}
      </ul>
      <span class="btn ${cat.popular ? 'btn-primary' : 'btn-ghost'} btn-full" style="margin-top:auto;">See ${cat.tiers.length} plans ${icon('arrowRight')}</span>
    </button>
  `;
}

function tierCard(cat, tier) {
  return `
    <div class="pricing-card faded-in">
      <span class="pricing-card-tier" style="font-size:19px;">${tier.size}</span>
      <span style="font-size:13.5px; color:var(--color-charcoal-soft);">${cat.name}</span>
      <hr class="divider-gold" />
      <span class="pricing-card-price">${formatNaira(tier.price)}</span>
      <span class="pricing-card-cycle">${tier.cycle === 'Monthly' ? 'Every month' : 'One-time'}</span>
      <ul>
        ${cat.includes.map((i) => `<li>${icon('check')}<span>${i}</span></li>`).join('')}
      </ul>
      <button type="button" class="btn btn-primary btn-full" data-book-tier style="margin-top:auto;">${icon('calendar')} Book This Plan</button>
    </div>
  `;
}

export function renderPricing(root) {
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('award')} Packages</p>
        <h1 style="margin-top:8px;">Priced like a <span class="italic">tasting menu,</span> not a spreadsheet.</h1>
        <p class="body-lg max-w-copy mx-auto" style="margin-top:12px;">Pick a package, then your home size. No hidden fees, no fine print.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="pricing-tabs" data-pricing-tabs style="margin-bottom:var(--space-4);">
          <button type="button" class="pricing-tab is-active" data-tab-all>All Packages</button>
          ${packageCategories.map((c) => `<button type="button" class="pricing-tab" data-tab="${c.key}">${c.name}</button>`).join('')}
        </div>
        <div data-pricing-body></div>
      </div>
    </section>
  `;

  const body = qs('[data-pricing-body]', root);
  const tabs = qsa('[data-pricing-tabs] .pricing-tab', root);

  function setActiveTab(target) {
    tabs.forEach((t) => t.classList.toggle('is-active', t === target));
  }

  function reveal() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        qsa('.faded-in', body).forEach((el) => el.classList.add('is-visible'));
      });
    });
  }

  function drawAll() {
    body.innerHTML = `<div class="pricing-grid">${packageCategories.map(categoryCard).join('')}</div>`;
    qsa('[data-category-card]', body).forEach((cardEl) => {
      cardEl.addEventListener('click', () => {
        const key = cardEl.dataset.categoryCard;
        setActiveTab(qs(`[data-tab="${key}"]`, root));
        drawCategory(key);
      });
    });
    reveal();
  }

  function drawCategory(key) {
    const cat = packageCategories.find((c) => c.key === key);
    body.innerHTML = `
      <div style="margin-bottom:var(--space-3);">
        <button type="button" class="link-arrow" data-back-all style="transform:scaleX(-1);">${icon('arrowRight')}</button>
        <span style="margin-left:8px; font-size:14px; color:var(--color-charcoal-soft);">${cat.name} — ${cat.tagline}</span>
      </div>
      <div class="pricing-grid">${cat.tiers.map((t) => tierCard(cat, t)).join('')}</div>
    `;
    qs('[data-back-all]', body).addEventListener('click', () => {
      setActiveTab(qs('[data-tab-all]', root));
      drawAll();
    });
    qsa('[data-book-tier]', body).forEach((btn) => {
      btn.addEventListener('click', () => openBookingSheet('home-services'));
    });
    reveal();
  }

  qs('[data-tab-all]', root).addEventListener('click', () => {
    setActiveTab(qs('[data-tab-all]', root));
    drawAll();
  });

  qsa('[data-tab]', root).forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveTab(btn);
      drawCategory(btn.dataset.tab);
    });
  });

  drawAll();

  applySeo({
    path: '/pricing',
    title: 'Pricing & Packages',
    description: 'Chyrah Classic, Ballers, and Elite cleaning packages for homes across Nigeria — transparent, one-time and monthly pricing by bedroom size.',
  });

  return () => {};
}
