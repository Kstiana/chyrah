import { icon } from '../lib/icons.js';
import { formatNaira } from '../lib/utils.js';

export function serviceCardHtml(service, index = 0) {
  const accentClass = service.hub === 'beauty' ? 'beauty' : 'home';
  const href = `/${service.hub}/${service.slug}`;
  return `
    <a href="${href}" data-router-link class="card service-card faded-in" style="transition-delay:${Math.min(index, 6) * 80}ms;">
      <div class="arch-frame"><img src="${service.image}" alt="${service.name}" loading="lazy" /></div>
      <div class="service-card-icon ${accentClass}">${icon(service.icon)}</div>
      <h3 class="h3">${service.name}</h3>
      <p style="font-size:14.5px;">${service.short}</p>
      <div class="price-tag-gold">Starting at <strong>${formatNaira(service.startingAt)}</strong></div>
      <span class="link-arrow" style="color:var(--color-${accentClass === 'home' ? 'home' : 'beauty'});">Explore ${icon('arrowRight')}</span>
    </a>
  `;
}
