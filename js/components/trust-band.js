import { icon } from '../lib/icons.js';
import { trustPoints } from '../lib/data.js';

export function renderTrustBand(container) {
  container.innerHTML = `
    <section class="trust-band section">
      <div class="container">
        <div class="center-text max-w-copy mx-auto" style="margin-bottom:var(--space-4);">
          <p class="eyebrow" style="color:var(--color-gold);">Trust & Vetting</p>
          <h2 style="color:var(--color-base); margin-top:8px;">Strangers in your home shouldn't feel like strangers.</h2>
        </div>
        <div class="trust-grid">
          ${trustPoints.map((t) => `
            <div class="trust-item faded-in">
              ${icon(t.icon)}
              <h4>${t.title}</h4>
              <p>${t.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
