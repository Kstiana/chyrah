import { icon } from '../lib/icons.js';
import { qs, qsa } from '../lib/utils.js';

export function renderFaqAccordion(container, items) {
  container.innerHTML = items.map((item, i) => `
    <div class="accordion-item${i === 0 ? ' is-open' : ''}" data-index="${i}">
      <button type="button" class="accordion-trigger" aria-expanded="${i === 0}">
        <span>${item.q}</span>
        ${icon('plus')}
      </button>
      <div class="accordion-panel">
        <div class="accordion-panel-inner"><p>${item.a}</p></div>
      </div>
    </div>
  `).join('');

  const panelItems = qsa('.accordion-item', container);

  function syncPanel(item, open) {
    const panel = qs('.accordion-panel', item);
    const trigger = qs('.accordion-trigger', item);
    trigger.setAttribute('aria-expanded', String(open));
    item.classList.toggle('is-open', open);
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : '0px';
  }

  panelItems.forEach((item) => {
    syncPanel(item, item.classList.contains('is-open'));
    qs('.accordion-trigger', item).addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');
      panelItems.forEach((other) => syncPanel(other, other === item ? willOpen : false));
    });
  });
}
