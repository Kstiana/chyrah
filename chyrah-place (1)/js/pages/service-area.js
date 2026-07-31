import { icon } from '../lib/icons.js';
import { qs } from '../lib/utils.js';
import { serviceAreas } from '../lib/data.js';
import { renderServiceAreaMap, mountAddressChecker } from '../components/service-area-checker.js';
import { applySeo } from '../lib/seo.js';

export function renderServiceArea(root) {
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('mapPin')} Nationwide Coverage</p>
        <h1 style="margin-top:8px;">Do we cover <span class="italic">your address?</span></h1>
        <p class="body-lg max-w-copy mx-auto" style="margin-top:12px;">Chyrah Place serves clients across Nigeria. Abuja is our home base, shown in detail below — but wherever you are, enter your address and we'll confirm your team.</p>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="two-col-desktop" style="align-items:flex-start;">
          <div class="map-shell faded-in" id="area-map" style="height:420px;"></div>
          <div class="area-check-card faded-in" data-checker></div>
        </div>
        <div style="margin-top:var(--space-4);">
          <p class="eyebrow" style="margin-bottom:12px;">Abuja hub districts</p>
          <div style="display:flex; flex-wrap:wrap; gap:10px;">
            ${serviceAreas.map((a) => `<span class="badge">${icon('mapPin')} ${a.name}</span>`).join('')}
          </div>
        </div>
      </div>
    </section>
  `;

  renderServiceAreaMap('area-map');
  mountAddressChecker(qs('[data-checker]', root));

  applySeo({
    path: '/service-area',
    title: 'Service Area',
    description: 'Chyrah Place serves clients nationwide across Nigeria, with detailed coverage across Abuja districts including Maitama, Asokoro, Wuse, and Gwarinpa.',
  });

  return () => {};
}
