import { icon } from '../lib/icons.js';
import { services, hubs, images } from '../lib/data.js';
import { serviceCardHtml } from '../components/service-card.js';
import { applySeo } from '../lib/seo.js';

export function renderBeautyHub(root) {
  const hub = hubs.beauty;
  const hubServices = services.filter((s) => s.hub === 'beauty');

  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('sparkleHeart')} Care & Beauty</p>
        <h1 style="margin-top:8px;">${hub.tagline}</h1>
        <p class="body-lg max-w-copy mx-auto" style="margin-top:12px;">${hub.description}</p>
      </div>
    </section>
    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="grid-2" style="max-width:760px; margin:0 auto;">${hubServices.map((s, i) => serviceCardHtml(s, i)).join('')}</div>
      </div>
    </section>
    <section class="section" style="background:var(--color-beauty-wash);">
      <div class="container center-text">
        <p class="eyebrow">Pair it with a clean</p>
        <h2 style="margin:8px 0 20px;">Book beauty and home cleaning in the <span class="italic">same visit.</span></h2>
        <a href="/home-services" data-router-link class="btn btn-beauty">${icon('home')} See Home Services</a>
      </div>
    </section>
  `;

  applySeo({
    path: '/beauty',
    title: 'Care & Beauty',
    description: 'Pedicure and manicure sessions delivered to your home anywhere in Nigeria, with salon-grade hygiene and care.',
    image: images.spaHands,
  });

  return () => {};
}
