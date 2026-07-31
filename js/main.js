import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initRouter, onRouteChange } from './router/router.js';
import { mountBackToTop } from './components/back-to-top.js';
import { icon } from './lib/icons.js';
import { brand } from './lib/data.js';
import { qs } from './lib/utils.js';

function mountShell() {
  const app = qs('#app-shell');
  app.innerHTML = `
    <div data-header-mount></div>
    <main>
      <div id="route-outlet"></div>
    </main>
    <div data-footer-mount></div>
    <a class="whatsapp-float" href="https://wa.me/${brand.whatsapp}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">${icon('whatsapp')}</a>
    <div data-back-to-top-mount></div>
  `;

  renderHeader(qs('[data-header-mount]', app));
  renderFooter(qs('[data-footer-mount]', app));
  mountBackToTop(qs('[data-back-to-top-mount]', app));
}

mountShell();
initRouter();

onRouteChange(() => {
  document.querySelectorAll('.mobile-menu.is-open').forEach((el) => el.classList.remove('is-open'));
});
