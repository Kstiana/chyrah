import { icon } from '../lib/icons.js';
import { qs } from '../lib/utils.js';
import { serviceAreas, officeCenter, serviceRadiusKm } from '../lib/data.js';
import { haversineKm } from '../lib/utils.js';
import { searchAddress } from './map-picker.js';

export function renderServiceAreaMap(mapId) {
  if (!window.L) return null;
  const map = window.L.map(mapId, { scrollWheelZoom: false }).setView([officeCenter.lat, officeCenter.lng], 11);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  window.L.circle([officeCenter.lat, officeCenter.lng], {
    radius: serviceRadiusKm * 1000,
    color: '#1E6B42',
    weight: 1.4,
    fillColor: '#1E6B42',
    fillOpacity: 0.07,
  }).addTo(map);

  serviceAreas.forEach((area) => {
    window.L.circleMarker([area.lat, area.lng], {
      radius: 6,
      color: '#C7A84F',
      fillColor: '#C7A84F',
      fillOpacity: 1,
      weight: 1.5,
    }).addTo(map).bindTooltip(area.name);
  });

  return map;
}

export function mountAddressChecker(container) {
  container.innerHTML = `
    <div class="field" style="margin-bottom:0;">
      <label for="area-input">Check your address</label>
      <input id="area-input" type="text" placeholder="Any city, estate, or district in Nigeria" autocomplete="off" />
    </div>
    <div class="area-result" data-result>
      ${icon('checkCircle')}
      <span></span>
    </div>
  `;

  const input = qs('#area-input', container);
  const result = qs('[data-result]', container);
  let timer = null;

  input.addEventListener('input', () => {
    clearTimeout(timer);
    const value = input.value.trim();
    if (value.length < 3) {
      result.classList.remove('is-visible');
      return;
    }
    timer = setTimeout(() => checkAddress(value), 500);
  });

  async function checkAddress(value) {
    const localMatch = serviceAreas.find((a) => a.name.toLowerCase().includes(value.toLowerCase()));
    if (localMatch) {
      showResult(true, `Yes, we service ${localMatch.name} and surrounding streets, with same-week availability.`);
      return;
    }

    const results = await searchAddress(value);
    if (!results.length) {
      showResult(false, "We couldn't locate that address. Try a nearby landmark, district, or city name.");
      return;
    }
    const nearest = results[0];
    const distance = haversineKm(officeCenter, nearest);
    if (distance <= serviceRadiusKm) {
      showResult(true, 'Yes, this is within our Abuja hub — fast scheduling available.');
    } else {
      showResult(true, "Yes, we serve this location. Our team will coordinate scheduling for your area.");
    }
  }

  function showResult(isYes, message) {
    result.classList.add('is-visible');
    result.classList.toggle('is-yes', isYes);
    result.classList.toggle('is-no', !isYes);
    result.innerHTML = `${icon(isYes ? 'checkCircle' : 'xCircle')}<span>${message}</span>`;
  }
}
