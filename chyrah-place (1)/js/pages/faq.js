import { icon } from '../lib/icons.js';
import { qs } from '../lib/utils.js';
import { faqs } from '../lib/data.js';
import { renderFaqAccordion } from '../components/faq-accordion.js';
import { applySeo } from '../lib/seo.js';

export function renderFaq(root) {
  root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <p class="eyebrow">${icon('checkCircle')} Frequently Asked Questions</p>
        <h1 style="margin-top:8px;">Any doubts? <span class="italic">Let's clear them.</span></h1>
      </div>
    </section>
    <section class="section" style="padding-top:0; max-width:820px; margin:0 auto;">
      <div class="container" data-faq></div>
    </section>
    <section class="section" style="background:var(--color-stone);">
      <div class="container center-text">
        <p class="eyebrow">Still have a question?</p>
        <h2 style="margin:8px 0 20px;">Message us directly.</h2>
        <a href="/contact" data-router-link class="btn btn-primary">${icon('mail')} Contact Us</a>
      </div>
    </section>
  `;

  renderFaqAccordion(qs('[data-faq]', root), faqs);

  applySeo({
    path: '/faq',
    title: 'FAQ',
    description: 'Answers to common questions about booking, service areas, payment, and etiquette for Chyrah Place home and beauty services.',
  });

  return () => {};
}
