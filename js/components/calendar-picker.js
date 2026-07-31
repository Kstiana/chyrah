import { icon } from '../lib/icons.js';
import { qs, qsa } from '../lib/utils.js';

const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TIME_SLOTS = ['08:00 AM', '09:30 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'];

export function renderCalendar(container, { selectedDate, onSelect }) {
  let viewDate = selectedDate ? new Date(selectedDate) : new Date();
  viewDate.setDate(1);
  let currentSelected = selectedDate ? new Date(selectedDate) : null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function draw() {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDow = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let cells = '';
    for (let i = 0; i < firstDow; i += 1) {
      cells += `<span class="calendar-day is-empty"></span>`;
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      const cellDate = new Date(year, month, d);
      const isPast = cellDate < today;
      const isSelected = currentSelected && cellDate.toDateString() === currentSelected.toDateString();
      cells += `<button type="button" class="calendar-day${isSelected ? ' is-selected' : ''}" data-day="${d}" ${isPast ? 'disabled' : ''}>${d}</button>`;
    }

    container.innerHTML = `
      <div class="calendar-head">
        <button type="button" data-cal-prev aria-label="Previous month">${icon('chevronLeft')}</button>
        <span class="font-mono">${MONTHS[month]} ${year}</span>
        <button type="button" data-cal-next aria-label="Next month">${icon('chevronRight')}</button>
      </div>
      <div class="calendar-grid">
        ${DOW.map((d) => `<span class="calendar-dow">${d}</span>`).join('')}
        ${cells}
      </div>
    `;

    qs('[data-cal-prev]', container).addEventListener('click', () => {
      viewDate = new Date(year, month - 1, 1);
      draw();
    });
    qs('[data-cal-next]', container).addEventListener('click', () => {
      viewDate = new Date(year, month + 1, 1);
      draw();
    });
    qsa('.calendar-day:not(.is-empty)', container).forEach((btn) => {
      btn.addEventListener('click', () => {
        const day = Number(btn.dataset.day);
        const picked = new Date(year, month, day);
        currentSelected = picked;
        onSelect(picked);
        draw();
      });
    });
  }

  draw();
}

export function renderTimeSlots(container, { selectedTime, onSelect }) {
  container.innerHTML = `
    <div class="time-slot-grid">
      ${TIME_SLOTS.map((slot) => `<button type="button" class="time-slot${slot === selectedTime ? ' is-selected' : ''}" data-slot="${slot}">${slot}</button>`).join('')}
    </div>
  `;
  qsa('.time-slot', container).forEach((btn) => {
    btn.addEventListener('click', () => {
      onSelect(btn.dataset.slot);
      qsa('.time-slot', container).forEach((b) => b.classList.toggle('is-selected', b === btn));
    });
  });
}

export { TIME_SLOTS };
