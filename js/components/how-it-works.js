import { icon } from '../lib/icons.js';
import { howItWorks } from '../lib/data.js';

export function renderStepsRow(container) {
  container.innerHTML = `
    <div class="steps-row">
      ${howItWorks.map((step, i) => `
        <div class="step-node faded-in" style="transition-delay:${i * 90}ms;">
          <div class="step-icon">${icon(step.icon)}</div>
          <div>
            <h4 style="font-size:16px; font-weight:500; margin-bottom:4px;">${step.title}</h4>
            <p style="font-size:13.5px;">${step.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
