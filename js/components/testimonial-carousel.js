import { icon } from '../lib/icons.js';
import { qs, qsa } from '../lib/utils.js';
import { testimonials } from '../lib/data.js';

function starRow(rating) {
  return `<div class="stars">${Array.from({ length: rating }).map(() => icon('star')).join('')}</div>`;
}

function cardHtml(t) {
  return `
    <article class="testimonial-card card">
      <div class="arch-frame"><img src="${t.image}" alt="" loading="lazy" /></div>
      ${starRow(t.rating)}
      <p class="testimonial-quote italic">&ldquo;${t.quote}&rdquo;</p>
      <div class="testimonial-meta">
        <strong style="color:var(--color-charcoal);">${t.name}</strong> &middot; ${t.role}<br/>
        ${t.verified ? `<span class="badge badge-verified" style="margin-top:6px;">${icon('checkCircle')} Verified Client</span>` : ''}
        <span style="display:block; margin-top:4px;">${t.service} &middot; ${t.date}</span>
      </div>
    </article>
  `;
}

export function renderTestimonials(container) {
  container.innerHTML = `
    <div class="testimonial-track" data-track>
      ${testimonials.map(cardHtml).join('')}
    </div>
    <div class="dot-indicator" data-dots>
      ${testimonials.map((_, i) => `<span class="dot${i === 0 ? ' is-active' : ''}"></span>`).join('')}
    </div>
  `;

  const track = qs('[data-track]', container);
  const dots = qsa('[data-dots] .dot', container);

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });
  window.addEventListener('mouseup', () => { isDown = false; });
  track.addEventListener('mouseleave', () => { isDown = false; });
  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    track.scrollLeft = scrollStart - (e.pageX - startX);
  });

  track.addEventListener('scroll', () => {
    const index = Math.round(track.scrollLeft / (track.firstElementChild.getBoundingClientRect().width + 24));
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }, { passive: true });
}
