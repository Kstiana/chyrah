import { icon } from '../lib/icons.js';
import { qs, isValidEmail } from '../lib/utils.js';
import { brand } from '../lib/data.js';
import { applySeo } from '../lib/seo.js';

export function renderContact(root) {
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('mail')} Contact</p>
        <h1 style="margin-top:8px;">Let's talk.</h1>
      </div>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="contact-grid">
          <div class="faded-in">
            <div class="contact-info-item">${icon('phone')}<div><strong>WhatsApp / Phone</strong><br/><a href="https://wa.me/${brand.whatsapp}" target="_blank" rel="noopener">${brand.whatsappDisplay}</a></div></div>
            <div class="contact-info-item">${icon('mail')}<div><strong>Email</strong><br/><a href="mailto:${brand.email}">${brand.email}</a></div></div>
            <div class="contact-info-item">${icon('instagram')}<div><strong>Instagram</strong><br/><a href="${brand.instagramUrl}" target="_blank" rel="noopener">${brand.instagram}</a></div></div>
            <div class="contact-info-item">${icon('mapPin')}<div><strong>Office Address</strong><br/>${brand.address}</div></div>
            <div class="social-row">
              <a class="social-btn" href="${brand.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
              <a class="social-btn" href="https://wa.me/${brand.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('whatsapp')}</a>
              <a class="social-btn" href="mailto:${brand.email}" aria-label="Email">${icon('mail')}</a>
            </div>
          </div>

          <form class="faded-in" data-contact-form style="display:flex; flex-direction:column; gap:16px;">
            <div class="field">
              <label for="c-name">Name</label>
              <input id="c-name" type="text" name="name" required placeholder="Your name" />
            </div>
            <div class="field">
              <label for="c-email">Email</label>
              <input id="c-email" type="email" name="email" required placeholder="you@email.com" />
            </div>
            <div class="field">
              <label for="c-message">Message</label>
              <textarea id="c-message" name="message" rows="5" required placeholder="How can we help?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary" data-submit-btn>${icon('mail')} Send Message</button>
            <p data-form-status style="font-size:13.5px; color:var(--color-charcoal-soft); display:none;"></p>
          </form>
        </div>
      </div>
    </section>
  `;

  const form = qs('[data-contact-form]', root);
  const status = qs('[data-form-status]', root);
  const submitBtn = qs('[data-submit-btn]', root);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    if (!isValidEmail(data.email)) {
      status.style.display = 'block';
      status.textContent = 'Please enter a valid email address.';
      return;
    }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    try {
      await fetch('/api/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      status.style.display = 'block';
      status.textContent = "Message sent. We'll respond shortly.";
      form.reset();
    } catch (err) {
      status.style.display = 'block';
      status.textContent = 'Something went wrong. Please message us on WhatsApp instead.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${icon('mail')} Send Message`;
    }
  });

  applySeo({
    path: '/contact',
    title: 'Contact',
    description: 'Get in touch with Chyrah Place via WhatsApp, email, or Instagram, or visit our head office in Galadimawa, Abuja.',
  });

  return () => {};
}
