// EnergyWavelengthFrequencyModule.js
import { h, c } from './constants.js';

/**
 * Frequency ↔ Energy ↔ Wavelength 계산
 * groupEl: section[data-group="freq-energy-wavelength"] 단위 DOM 범위
 */
export function EnergyWavelengthFrequencyModule(groupEl) {
  if (!groupEl) return;

  const inputs = {
    energy: groupEl.querySelector('[data-name="energy"]'),
    wavelength: groupEl.querySelector('[data-name="wavelength"]'),
    frequency: groupEl.querySelector('[data-name="frequency"]')
  };

  const units = {
    energy: groupEl.querySelector('[data-name="energy-unit"]'),
    wavelength: groupEl.querySelector('[data-name="wavelength-unit"]'),
    frequency: groupEl.querySelector('[data-name="frequency-unit"]')
  };

  if (!inputs.energy || !inputs.wavelength || !inputs.frequency ||
      !units.energy || !units.wavelength || !units.frequency) return;

  const toNum = input => {
    const n = input.valueAsNumber;
    return isNaN(n) ? null : n;
  };

  const fmt = n => n.toFixed(6); // 소수점 6자리 고정

  const update = (source) => {
    const eVal = toNum(inputs.energy);
    const wVal = toNum(inputs.wavelength);
    const fVal = toNum(inputs.frequency);

    if (source === 'energy' && eVal !== null) {
      const E = eVal * parseFloat(units.energy.value);
      const f = E / h;
      const λ = c / f;
      inputs.frequency.value = fmt(f / parseFloat(units.frequency.value));
      inputs.wavelength.value = fmt(λ / parseFloat(units.wavelength.value));
    } 
    else if (source === 'wavelength' && wVal !== null) {
      const λ = wVal * parseFloat(units.wavelength.value);
      const f = c / λ;
      const E = h * f;
      inputs.frequency.value = fmt(f / parseFloat(units.frequency.value));
      inputs.energy.value = fmt(E / parseFloat(units.energy.value));
    } 
    else if (source === 'frequency' && fVal !== null) {
      const f = fVal * parseFloat(units.frequency.value);
      const E = h * f;
      const λ = c / f;
      inputs.energy.value = fmt(E / parseFloat(units.energy.value));
      inputs.wavelength.value = fmt(λ / parseFloat(units.wavelength.value));
    }
  };

  // 이벤트 등록
  Object.keys(inputs).forEach(name => {
    inputs[name].addEventListener('input', () => update(name));
    units[name].addEventListener('change', () => update(name));
  });

  // 초기값 반영 (Energy 우선)
  if (toNum(inputs.energy) !== null) update('energy');
  else if (toNum(inputs.frequency) !== null) update('frequency');
  else if (toNum(inputs.wavelength) !== null) update('wavelength');
}
