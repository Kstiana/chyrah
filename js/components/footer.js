import { icon } from '../lib/icons.js';
import { brand } from '../lib/data.js';

const YEAR = new Date().getFullYear();

function paymentIcons() {
  return `
    <span title="Paystack">${icon('card')}</span>
    <span title="Bank Transfer">${icon('bank')}</span>
  `;
}

function colBrand() {
  return `
    <div class="footer-col footer-brand">
      <a href="/" data-router-link class="brand-mark">
        ${icon('logo')}
        <span class="brand-wordmark" style="color:var(--color-base);">CHYRAH</span>
      </a>
      <p>${brand.tagline} Premium home cleaning and beauty care, delivered nationwide across Nigeria.</p>
      <div class="social-row">
        <a class="social-btn" href="${brand.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram" style="border-color:rgba(250,247,241,0.25); color:var(--color-base);">${icon('instagram')}</a>
        <a class="social-btn" href="https://wa.me/${brand.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp" style="border-color:rgba(250,247,241,0.25); color:var(--color-base);">${icon('whatsapp')}</a>
        <a class="social-btn" href="mailto:${brand.email}" aria-label="Email" style="border-color:rgba(250,247,241,0.25); color:var(--color-base);">${icon('mail')}</a>
      </div>
    </div>
  `;
}

function colHomeServices() {
  return `
    <div class="footer-col">
      <h4>Home Services</h4>
      <a href="/home-services/domestic-cleaning" data-router-link>Domestic Cleaning</a>
      <a href="/home-services/office-cleaning" data-router-link>Office Cleaning</a>
      <a href="/home-services/custom-home-care" data-router-link>Custom Home Care</a>
      <a href="/pricing" data-router-link>Packages & Pricing</a>
    </div>
  `;
}

function colBeauty() {
  return `
    <div class="footer-col">
      <h4>Care & Beauty</h4>
      <a href="/beauty/pedicure" data-router-link>Pedicure</a>
      <a href="/beauty/manicure" data-router-link>Manicure</a>
      <a href="/beauty" data-router-link>Beauty Hub</a>
      <a href="/how-it-works" data-router-link>How It Works</a>
    </div>
  `;
}

function colContact() {
  return `
    <div class="footer-col">
      <h4>Contact</h4>
      <a href="tel:+${brand.whatsapp}">${brand.whatsappDisplay}</a>
      <a href="mailto:${brand.email}">${brand.email}</a>
      <span style="display:block; padding:6px 0; color:rgba(250,247,241,0.75); font-size:14.5px;">${brand.address}</span>
      <a href="/contact" data-router-link>Contact Page</a>
    </div>
  `;
}

export function renderFooter(root) {
  root.innerHTML = `
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid desktop-only">
          ${colBrand()}
          ${colHomeServices()}
          ${colBeauty()}
          ${colContact()}
        </div>
        <div class="footer-accordion">
          ${colBrand()}
          <details class="footer-col">
            <summary>Home Services ${icon('chevronDown')}</summary>
            <a href="/home-services/domestic-cleaning" data-router-link>Domestic Cleaning</a>
            <a href="/home-services/office-cleaning" data-router-link>Office Cleaning</a>
            <a href="/home-services/custom-home-care" data-router-link>Custom Home Care</a>
            <a href="/pricing" data-router-link>Packages & Pricing</a>
          </details>
          <details class="footer-col">
            <summary>Care & Beauty ${icon('chevronDown')}</summary>
            <a href="/beauty/pedicure" data-router-link>Pedicure</a>
            <a href="/beauty/manicure" data-router-link>Manicure</a>
            <a href="/beauty" data-router-link>Beauty Hub</a>
          </details>
          <details class="footer-col">
            <summary>Contact ${icon('chevronDown')}</summary>
            <a href="tel:+${brand.whatsapp}">${brand.whatsappDisplay}</a>
            <a href="mailto:${brand.email}">${brand.email}</a>
            <span style="display:block; padding:6px 0; color:rgba(250,247,241,0.75); font-size:14.5px;">${brand.address}</span>
          </details>
        </div>
        <div class="footer-bottom">
          <span>&copy; ${YEAR} Chyrah Place. All rights reserved.</span>
          <div class="footer-payments">${paymentIcons()}</div>
          <div class="footer-legal">
            <a href="/faq" data-router-link>FAQ</a>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
