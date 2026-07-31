import { icon } from '../lib/icons.js';
import { qs, qsa, el, formatNaira, isValidEmail, isValidPhone, uid } from '../lib/utils.js';
import { packageCategories, officeCenter } from '../lib/data.js';
import { renderCalendar, renderTimeSlots } from './calendar-picker.js';
import { initMapPicker, createAddressSearch } from './map-picker.js';
import { payWithPaystack } from './paystack-checkout.js';
import { bookingsWriteEndpoint } from '../lib/supabase-client.js';

const BEAUTY_PRICES = { pedicure: 20000, manicure: 15000, both: 32000 };
const STEPS = ['service', 'datetime', 'location'];

function createState(defaults = {}) {
  return {
    hub: 'home-services',
    packageKey: 'ballers',
    bedroomSize: null,
    beautyChoice: null,
    date: null,
    time: null,
    address: '',
    lat: officeCenter.lat,
    lng: officeCenter.lng,
    withinArea: true,
    name: '',
    email: '',
    phone: '',
    ...defaults,
  };
}

function computePrice(state) {
  if (state.hub === 'beauty') {
    return state.beautyChoice ? BEAUTY_PRICES[state.beautyChoice] : 0;
  }
  const category = packageCategories.find((c) => c.key === state.packageKey);
  if (!category || !state.bedroomSize) return 0;
  const tier = category.tiers.find((t) => t.size === state.bedroomSize);
  return tier ? tier.price : 0;
}

function isServiceComplete(state) {
  if (state.hub === 'beauty') return Boolean(state.beautyChoice);
  return Boolean(state.packageKey && state.bedroomSize);
}

function isDatetimeComplete(state) {
  return Boolean(state.date && state.time);
}

function isLocationComplete(state) {
  return Boolean(state.address && isValidEmail(state.email) && isValidPhone(state.phone) && state.name.trim().length > 1);
}

function isCheckoutReady(state) {
  return isServiceComplete(state) && isDatetimeComplete(state) && isLocationComplete(state);
}

function renderServiceStep(container, state, update) {
  const category = packageCategories.find((c) => c.key === state.packageKey) || packageCategories[1];
  container.innerHTML = `
    <div class="tabs" style="border:none; margin-bottom:16px; gap:8px;">
      <button type="button" class="showcase-tab${state.hub === 'home-services' ? ' is-active' : ''}" data-hub="home-services">${icon('home')} Home Cleaning</button>
      <button type="button" class="showcase-tab${state.hub === 'beauty' ? ' is-active' : ''}" data-hub="beauty">${icon('sparkleHeart')} Beauty</button>
    </div>
    <div data-hub-body></div>
  `;

  qsa('[data-hub]', container).forEach((btn) => {
    btn.addEventListener('click', () => {
      update({ hub: btn.dataset.hub });
      renderServiceStep(container, state, update);
    });
  });

  const body = qs('[data-hub-body]', container);

  if (state.hub === 'home-services') {
    body.innerHTML = `
      <p class="eyebrow" style="margin-bottom:8px;">Package</p>
      <div class="option-grid" data-package-grid style="margin-bottom:20px;">
        ${packageCategories.map((c) => `
          <div class="option-card${state.packageKey === c.key ? ' is-selected' : ''}" data-package="${c.key}">
            <div class="option-card-title">${c.name}</div>
            <div class="option-card-price">${c.cycle}</div>
          </div>
        `).join('')}
      </div>
      <p class="eyebrow" style="margin-bottom:8px;">Home Size</p>
      <div class="option-grid" data-bedroom-grid>
        ${category.tiers.map((t) => `
          <div class="option-card${state.bedroomSize === t.size ? ' is-selected' : ''}" data-bedroom="${t.size}">
            <div class="option-card-title">${t.size}</div>
            <div class="option-card-price">${formatNaira(t.price)}${t.cycle === 'Monthly' ? ' /mo' : ''}</div>
          </div>
        `).join('')}
      </div>
    `;
    qsa('[data-package]', body).forEach((cardEl) => {
      cardEl.addEventListener('click', () => {
        update({ packageKey: cardEl.dataset.package, bedroomSize: null });
        renderServiceStep(container, state, update);
      });
    });
    qsa('[data-bedroom]', body).forEach((cardEl) => {
      cardEl.addEventListener('click', () => {
        update({ bedroomSize: cardEl.dataset.bedroom });
        renderServiceStep(container, state, update);
      });
    });
  } else {
    body.innerHTML = `
      <p class="eyebrow" style="margin-bottom:8px;">Choose Treatment</p>
      <div class="option-grid">
        <div class="option-card${state.beautyChoice === 'pedicure' ? ' is-selected' : ''}" data-beauty="pedicure">
          <div class="option-card-title">Pedicure</div>
          <div class="option-card-price">${formatNaira(BEAUTY_PRICES.pedicure)}</div>
        </div>
        <div class="option-card${state.beautyChoice === 'manicure' ? ' is-selected' : ''}" data-beauty="manicure">
          <div class="option-card-title">Manicure</div>
          <div class="option-card-price">${formatNaira(BEAUTY_PRICES.manicure)}</div>
        </div>
        <div class="option-card${state.beautyChoice === 'both' ? ' is-selected' : ''}" data-beauty="both">
          <div class="option-card-title">Pedicure + Manicure</div>
          <div class="option-card-price">${formatNaira(BEAUTY_PRICES.both)}</div>
        </div>
      </div>
    `;
    qsa('[data-beauty]', body).forEach((cardEl) => {
      cardEl.addEventListener('click', () => {
        update({ beautyChoice: cardEl.dataset.beauty });
        renderServiceStep(container, state, update);
      });
    });
  }
}

function renderDatetimeStep(container, state, update) {
  container.innerHTML = `
    <p class="eyebrow" style="margin-bottom:8px;">Select Date</p>
    <div data-calendar style="margin-bottom:20px;"></div>
    <p class="eyebrow" style="margin-bottom:8px;">Select Time</p>
    <div data-timeslots></div>
  `;
  renderCalendar(qs('[data-calendar]', container), {
    selectedDate: state.date,
    onSelect: (date) => update({ date }),
  });
  renderTimeSlots(qs('[data-timeslots]', container), {
    selectedTime: state.time,
    onSelect: (time) => update({ time }),
  });
}

function renderLocationStep(container, state, update) {
  const mapId = `booking-map-${Math.random().toString(36).slice(2, 8)}`;
  container.innerHTML = `
    <p class="eyebrow" style="margin-bottom:8px;">Your Address</p>
    <div class="field" style="margin-bottom:12px; position:relative;">
      <input type="text" placeholder="Search your street, estate, or city in Nigeria" data-address-search value="${state.address}" autocomplete="off" />
      <div data-address-results style="position:absolute; top:calc(100% + 4px); left:0; right:0; background:var(--color-white); border:1px solid var(--color-line); border-radius:12px; z-index:20; overflow:hidden; display:none;"></div>
    </div>
    <div class="map-shell" id="${mapId}" style="margin-bottom:12px;"></div>
    <div class="area-result${state.address ? ' is-visible' : ''} is-yes" data-area-result>
      ${icon('checkCircle')}
      <span>${state.withinArea ? 'Within our Abuja hub — fast scheduling available.' : "We'll coordinate a team for this location."}</span>
    </div>
    <div class="grid-2" style="margin:20px 0 12px;">
      <div class="field">
        <label for="bw-name">Full name</label>
        <input id="bw-name" type="text" data-name value="${state.name}" placeholder="Your name" />
      </div>
      <div class="field">
        <label for="bw-phone">Phone</label>
        <input id="bw-phone" type="tel" data-phone value="${state.phone}" placeholder="080..." />
      </div>
    </div>
    <div class="field">
      <label for="bw-email">Email</label>
      <input id="bw-email" type="email" data-email value="${state.email}" placeholder="you@email.com" />
    </div>
  `;

  const mapControl = initMapPicker(mapId, {
    initial: { lat: state.lat, lng: state.lng },
    onChange: ({ lat, lng, withinArea }) => {
      update({ lat, lng, withinArea });
      const resultEl = qs('[data-area-result]', container);
      resultEl.classList.add('is-visible', 'is-yes');
      resultEl.innerHTML = `${icon('checkCircle')}<span>${withinArea ? 'Within our Abuja hub — fast scheduling available.' : "We'll coordinate a team for this location."}</span>`;
    },
  });

  const searchInput = qs('[data-address-search]', container);
  const resultsBox = qs('[data-address-results]', container);
  const trigger = createAddressSearch((results) => {
    if (!results.length) { resultsBox.style.display = 'none'; return; }
    resultsBox.innerHTML = results.map((r, i) => `<button type="button" data-result="${i}" style="display:block; width:100%; text-align:left; padding:10px 14px; border:none; background:none; cursor:pointer; font-size:13.5px; border-bottom:1px solid var(--color-line-soft);">${r.label}</button>`).join('');
    resultsBox.style.display = 'block';
    qsa('[data-result]', resultsBox).forEach((btn) => {
      btn.addEventListener('click', () => {
        const r = results[Number(btn.dataset.result)];
        searchInput.value = r.label;
        update({ address: r.label, lat: r.lat, lng: r.lng });
        mapControl && mapControl.setPosition(r.lat, r.lng);
        resultsBox.style.display = 'none';
      });
    });
  });

  searchInput.addEventListener('input', (e) => {
    update({ address: e.target.value });
    trigger(e.target.value);
  });

  qs('[data-name]', container).addEventListener('input', (e) => update({ name: e.target.value }));
  qs('[data-phone]', container).addEventListener('input', (e) => update({ phone: e.target.value }));
  qs('[data-email]', container).addEventListener('input', (e) => update({ email: e.target.value }));

  return () => mapControl && mapControl.destroy();
}

const STEP_RENDERERS = {
  service: renderServiceStep,
  datetime: renderDatetimeStep,
  location: renderLocationStep,
};

const STEP_LABELS = { service: 'Service', datetime: 'Date & Time', location: 'Location' };
const STEP_ICONS = { service: 'sparkles', datetime: 'calendar', location: 'mapPin' };

async function submitBooking(state, price) {
  const reference = uid('CHY');
  const payload = {
    reference,
    hub: state.hub,
    package_key: state.hub === 'home-services' ? state.packageKey : state.beautyChoice,
    bedroom_size: state.bedroomSize,
    date: state.date ? state.date.toISOString().slice(0, 10) : null,
    time: state.time,
    address: state.address,
    lat: state.lat,
    lng: state.lng,
    customer_name: state.name,
    customer_email: state.email,
    customer_phone: state.phone,
    amount: price,
  };

  try {
    await fetch(bookingsWriteEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    /* booking write is best-effort from the client; server confirms via webhook */
  }

  return reference;
}

function beginCheckout(state, totalEl, payBtn) {
  const price = computePrice(state);
  payBtn.disabled = true;
  payBtn.textContent = 'Preparing…';

  submitBooking(state, price).then((reference) => {
    payWithPaystack({
      email: state.email,
      amountNaira: price,
      name: state.name,
      phone: state.phone,
      reference,
      metadata: [
        { display_name: 'Service', variable_name: 'service', value: state.hub === 'home-services' ? `${state.packageKey} — ${state.bedroomSize}` : state.beautyChoice },
        { display_name: 'Date', variable_name: 'date', value: `${state.date ? state.date.toDateString() : ''} ${state.time || ''}` },
      ],
      onSuccess: () => {
        payBtn.textContent = 'Booked — check your email';
        payBtn.classList.add('btn-home');
      },
      onClose: () => {
        payBtn.disabled = false;
        payBtn.textContent = `Pay ${formatNaira(price)}`;
      },
    });
  });
}

export function mountBookingWidgetDesktop(root) {
  const state = createState();
  let activeStep = 'service';

  root.innerHTML = `
    <div class="tabs booking-widget-tabs" data-step-tabs>
      ${STEPS.map((s) => `<button type="button" class="tab-btn${s === activeStep ? ' is-active' : ''}" data-step="${s}">${icon(STEP_ICONS[s])} ${STEP_LABELS[s]}</button>`).join('')}
    </div>
    <div class="booking-widget-body" data-step-body></div>
    <div class="booking-total-bar">
      <div>
        <div class="booking-total-label">Estimated total</div>
        <div class="booking-total-value" data-total>${formatNaira(0)}</div>
      </div>
      <button type="button" class="btn btn-primary" data-pay-btn disabled>Continue</button>
    </div>
  `;

  const body = qs('[data-step-body]', root);
  const totalEl = qs('[data-total]', root);
  const payBtn = qs('[data-pay-btn]', root);
  let stepCleanup = null;

  function update(patch) {
    Object.assign(state, patch);
    totalEl.textContent = formatNaira(computePrice(state));
    refreshPayButton();
  }

  function refreshPayButton() {
    const ready = isCheckoutReady(state);
    payBtn.disabled = !ready;
    payBtn.textContent = ready ? `Pay ${formatNaira(computePrice(state))}` : 'Complete the steps above';
  }

  function drawStep() {
    if (typeof stepCleanup === 'function') stepCleanup();
    qsa('[data-step]', root).forEach((btn) => btn.classList.toggle('is-active', btn.dataset.step === activeStep));
    stepCleanup = STEP_RENDERERS[activeStep](body, state, update) || null;
  }

  qsa('[data-step]', root).forEach((btn) => {
    btn.addEventListener('click', () => {
      activeStep = btn.dataset.step;
      drawStep();
    });
  });

  payBtn.addEventListener('click', () => {
    if (payBtn.disabled) return;
    beginCheckout(state, totalEl, payBtn);
  });

  drawStep();
}

export function openBookingSheet(defaultHub) {
  const overlay = el(`<div class="bottom-sheet-overlay" data-bs-overlay></div>`);
  const sheet = el(`
    <div class="bottom-sheet" data-bs-sheet role="dialog" aria-modal="true" aria-label="Book a service">
      <div class="bottom-sheet-handle"></div>
      <div class="bottom-sheet-head">
        <h3 class="font-display" style="font-size:20px;" data-bs-title>Service</h3>
        <button type="button" class="icon-btn" data-bs-close aria-label="Close">${icon('close')}</button>
      </div>
      <div class="bottom-sheet-progress" data-bs-progress>
        ${STEPS.map(() => `<span></span>`).join('')}
      </div>
      <div class="bottom-sheet-body" data-bs-body></div>
      <div class="bottom-sheet-foot">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
          <span class="booking-total-label" style="color:var(--color-charcoal-soft);">Estimated total</span>
          <span class="booking-total-value" style="color:var(--color-gold-dark);" data-bs-total>${formatNaira(0)}</span>
        </div>
        <button type="button" class="btn btn-primary btn-full" data-bs-continue>Continue</button>
      </div>
    </div>
  `);

  document.body.appendChild(overlay);
  document.body.appendChild(sheet);
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    overlay.classList.add('is-open');
    sheet.classList.add('is-open');
  });

  const state = createState({ hub: defaultHub || 'home-services' });
  let stepIndex = 0;
  let stepCleanup = null;

  const body = qs('[data-bs-body]', sheet);
  const totalEl = qs('[data-bs-total]', sheet);
  const continueBtn = qs('[data-bs-continue]', sheet);
  const title = qs('[data-bs-title]', sheet);
  const progressSpans = qsa('[data-bs-progress] span', sheet);

  function close() {
    overlay.classList.remove('is-open');
    sheet.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      overlay.remove();
      sheet.remove();
    }, 380);
  }

  function update(patch) {
    Object.assign(state, patch);
    totalEl.textContent = formatNaira(computePrice(state));
    refreshContinue();
  }

  function stepValid() {
    const key = STEPS[stepIndex];
    if (key === 'service') return isServiceComplete(state);
    if (key === 'datetime') return isDatetimeComplete(state);
    return isLocationComplete(state);
  }

  function refreshContinue() {
    const isLast = stepIndex === STEPS.length - 1;
    continueBtn.disabled = false;
    continueBtn.textContent = isLast ? `Pay ${formatNaira(computePrice(state))}` : 'Continue';
  }

  function drawStep() {
    if (typeof stepCleanup === 'function') stepCleanup();
    title.textContent = STEP_LABELS[STEPS[stepIndex]];
    progressSpans.forEach((span, i) => span.classList.toggle('is-done', i <= stepIndex));
    stepCleanup = STEP_RENDERERS[STEPS[stepIndex]](body, state, update) || null;
    refreshContinue();
  }

  continueBtn.addEventListener('click', () => {
    if (!stepValid()) {
      continueBtn.textContent = 'Please complete this step';
      setTimeout(refreshContinue, 1400);
      return;
    }
    const isLast = stepIndex === STEPS.length - 1;
    if (isLast) {
      beginCheckout(state, totalEl, continueBtn);
      return;
    }
    stepIndex += 1;
    drawStep();
  });

  qs('[data-bs-close]', sheet).addEventListener('click', close);
  overlay.addEventListener('click', close);

  drawStep();

  return { close };
}
