import { icon } from '../lib/icons.js';
import { qs } from '../lib/utils.js';
import { services, hubs, images } from '../lib/data.js';
import { serviceCardHtml } from '../components/service-card.js';
import { applySeo } from '../lib/seo.js';
import { renderTrustBand } from '../components/trust-band.js';

export function renderHomeServicesHub(root) {
  const hub = hubs['home-services'];
  const hubServices = services.filter((s) => s.hub === 'home-services');

  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('home')} Home Services</p>
        <h1 style="margin-top:8px;">${hub.tagline}</h1>
        <p class="body-lg max-w-copy mx-auto" style="margin-top:12px;">${hub.description}</p>
      </div>
    </section>
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="grid-3">${hubServices.map((s, i) => serviceCardHtml(s, i)).join('')}</div>
      </div>
    </section>
    <div data-trust-band></div>
    <section class="section">
      <div class="container center-text">
        <p class="eyebrow">Need more than one thing done?</p>
        <h2 style="margin:8px 0 20px;">Custom Home Care builds a plan around <span class="italic">exactly</span> what you need.</h2>
        <a href="/home-services/custom-home-care" data-router-link class="btn btn-home">${icon('target')} Explore Custom Home Care</a>
      </div>
    </section>
  `;

  renderTrustBand(qs('[data-trust-band]', root));

  applySeo({
    path: '/home-services',
    title: 'Home Services',
    description: 'Domestic cleaning, office cleaning, and custom home care across Nigeria — trained, insured, and background-checked professionals.',
    image: images.livingRoom,
  });

  return () => {};
}
