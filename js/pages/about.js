import { icon } from '../lib/icons.js';
import { qs } from '../lib/utils.js';
import { images, whyChooseUs } from '../lib/data.js';
import { renderTrustBand } from '../components/trust-band.js';
import { applySeo } from '../lib/seo.js';

export function renderAbout(root) {
  root.innerHTML = `
    <section class="hero" style="padding-bottom:0;">
      <div class="container">
        <div class="two-col-desktop">
          <div class="faded-in">
            <p class="eyebrow">Who We Are</p>
            <h1 style="margin:10px 0 16px;">We don't just clean, <span class="italic">we care.</span></h1>
            <p class="body-lg">At Chyrah Place, we pride ourselves on providing exceptional service to every home we visit. Our team of highly trained staff is dedicated to ensuring that each home receives personal care, attention, and a true pampering experience.</p>
          </div>
          <div class="arch-frame faded-in"><img src="${images.aboutTeam}" alt="Chyrah Place team" loading="lazy" /></div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">What Makes Us Stand Out</p>
        </div>
        <div class="grid-3">
          <div class="value-chip faded-in">${icon('award')}<h4 style="margin:10px 0 6px;">High Level of Professionalism</h4></div>
          <div class="value-chip faded-in">${icon('search')}<h4 style="margin:10px 0 6px;">Attention to Detail</h4></div>
          <div class="value-chip faded-in">${icon('shieldCheck')}<h4 style="margin:10px 0 6px;">Safety You Can Trust</h4></div>
        </div>
      </div>
    </section>

    <section class="section" style="background:var(--color-stone);">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow">Why Choose Us</p>
          <h2 style="margin-top:8px;">Chyrah Place is your one-stop <span class="italic">luxury solution.</span></h2>
        </div>
        <div class="about-values-grid">
          ${whyChooseUs.map((v) => `<div class="value-chip faded-in">${icon(v.icon)}<h4 style="margin-top:8px; font-size:14.5px;">${v.name}</h4></div>`).join('')}
        </div>
      </div>
    </section>

    <div data-trust-band></div>

    <section class="section">
      <div class="container center-text">
        <h2 style="margin-bottom:20px;">Relax, we go run am.</h2>
        <button type="button" class="btn btn-primary" data-open-booking>${icon('calendar')} Book Now</button>
      </div>
    </section>
  `;

  renderTrustBand(qs('[data-trust-band]', root));

  applySeo({
    path: '/about',
    title: 'Who We Are',
    description: 'Meet Chyrah Place — a premium home service brand bringing cleaning and beauty care to doorsteps across Nigeria.',
  });

  return () => {};
}
