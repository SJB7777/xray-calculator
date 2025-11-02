import { h, c } from './constants.js';

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

  // 안정적인 숫자 변환
  const toNum = input => {
    let n = input.valueAsNumber;
    if (isNaN(n)) n = parseFloat(input.value);
    return isNaN(n) ? null : n;
  };

  const fmt = n => n.toFixed(6);

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

  // 초기값 반영 (DOM 반영 후)
  setTimeout(() => {
    if (toNum(inputs.energy) !== null) update('energy');
    else if (toNum(inputs.frequency) !== null) update('frequency');
    else if (toNum(inputs.wavelength) !== null) update('wavelength');
  }, 0);
}
