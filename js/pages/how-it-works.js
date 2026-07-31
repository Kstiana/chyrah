import { icon } from '../lib/icons.js';
import { qs } from '../lib/utils.js';
import { images } from '../lib/data.js';
import { renderStepsRow } from '../components/how-it-works.js';
import { renderTrustBand } from '../components/trust-band.js';
import { applySeo } from '../lib/seo.js';

export function renderHowItWorks(root) {
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('checkCircle')} How It Works</p>
        <h1 style="margin-top:8px;">Booking Chyrah takes <span class="italic">minutes.</span></h1>
        <p class="body-lg max-w-copy mx-auto" style="margin-top:12px;">No calls back and forth. Choose, schedule, and relax — the rest is on us.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div data-steps-row></div>
      </div>
    </section>

    <section class="section" style="background:var(--color-stone);">
      <div class="container">
        <div class="two-col-desktop">
          <div class="arch-frame faded-in"><img src="${images.aboutTeam}" alt="A Chyrah team member arriving for an appointment" loading="lazy" /></div>
          <div class="faded-in">
            <p class="eyebrow" style="margin-bottom:14px;">What happens after you book</p>
            <div class="included-list">
              <div class="included-item">${icon('check')}<span>You get an instant confirmation by email and WhatsApp.</span></div>
              <div class="included-item">${icon('check')}<span>Your assigned team is ID-verified and briefed on your request.</span></div>
              <div class="included-item">${icon('check')}<span>They arrive within your selected window, fully equipped.</span></div>
              <div class="included-item">${icon('check')}<span>You relax. We go run am.</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div data-trust-band></div>

    <section class="section">
      <div class="container center-text">
        <h2 style="margin-bottom:20px;">Ready when you are.</h2>
        <button type="button" class="btn btn-primary" data-open-booking>${icon('calendar')} Book Now</button>
      </div>
    </section>
  `;

  renderStepsRow(qs('[data-steps-row]', root));
  renderTrustBand(qs('[data-trust-band]', root));

  applySeo({
    path: '/how-it-works',
    title: 'How It Works',
    description: 'See exactly how booking a Chyrah Place home cleaning or beauty appointment works, from selection to service.',
  });

  return () => {};
}
