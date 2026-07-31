import { icon } from '../lib/icons.js';
import { hubs } from '../lib/data.js';

function panelHtml(hub) {
  const accent = hub.accent;
  return `
    <div class="hub-panel hub-panel-${accent} faded-in">
      <div class="arch-frame"><img src="${hub.image}" alt="${hub.name}" loading="lazy" /></div>
      <div>
        <div class="service-card-icon ${accent}" style="margin-bottom:14px;">${icon(hub.icon)}</div>
        <h3 class="h2" style="margin-bottom:8px;">${hub.tagline}</h3>
        <p class="body-text" style="margin-bottom:18px;">${hub.description}</p>
        <a href="/${hub.slug}" data-router-link class="link-arrow" style="color:var(--color-${accent});">
          Explore ${hub.name} ${icon('arrowRight')}
        </a>
      </div>
    </div>
  `;
}

export function renderHubSplit(container) {
  container.innerHTML = `
    <div class="hub-split">
      ${panelHtml(hubs['home-services'])}
      ${panelHtml(hubs.beauty)}
    </div>
  `;
}
