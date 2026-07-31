import { officeCenter, serviceRadiusKm } from '../lib/data.js';
import { haversineKm, debounce } from '../lib/utils.js';

let mapInstance = null;

export function initMapPicker(containerId, { initial, onChange }) {
  if (!window.L) return null;
  const start = initial || officeCenter;

  const map = window.L.map(containerId, {
    zoomControl: true,
    attributionControl: true,
  }).setView([start.lat, start.lng], 12);

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  window.L.circle([officeCenter.lat, officeCenter.lng], {
    radius: serviceRadiusKm * 1000,
    color: '#1E6B42',
    weight: 1,
    fillColor: '#1E6B42',
    fillOpacity: 0.06,
  }).addTo(map);

  const marker = window.L.marker([start.lat, start.lng], { draggable: true }).addTo(map);

  function emitChange(lat, lng) {
    const withinArea = haversineKm(officeCenter, { lat, lng }) <= serviceRadiusKm;
    onChange({ lat, lng, withinArea });
  }

  marker.on('dragend', () => {
    const pos = marker.getLatLng();
    emitChange(pos.lat, pos.lng);
  });

  map.on('click', (e) => {
    marker.setLatLng(e.latlng);
    emitChange(e.latlng.lat, e.latlng.lng);
  });

  mapInstance = map;
  emitChange(start.lat, start.lng);

  return {
    map,
    marker,
    setPosition(lat, lng) {
      map.setView([lat, lng], 14);
      marker.setLatLng([lat, lng]);
      emitChange(lat, lng);
    },
    destroy() {
      map.remove();
      mapInstance = null;
    },
  };
}

export async function searchAddress(query) {
  if (!query || query.trim().length < 3) return [];
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&countrycodes=ng&q=${encodeURIComponent(`${query}, Nigeria`)}`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) return [];
  const results = await response.json();
  return results.map((r) => ({ label: r.display_name, lat: Number(r.lat), lng: Number(r.lon) }));
}

export async function reverseGeocode(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) return '';
  const data = await response.json();
  return data.display_name || '';
}

export function createAddressSearch(callback) {
  const trigger = debounce(async (query) => {
    const results = await searchAddress(query);
    callback(results);
  }, 400);
  return trigger;
}
