// EnergyWavelengthFrequencyModule.js
import { h, c } from './constants.js';

/**
 * Frequency ↔ Energy ↔ Wavelength 계산 모듈
 * groupEl: section[data-group="freq-energy-wavelength"]
 */
export function EnergyWavelengthFrequencyModule(groupEl) {
  if (!groupEl) return;

  // --- DOM 선택자 ---
  const fInput = groupEl.querySelector('[data-name="frequency"]');
  const eInput = groupEl.querySelector('[data-name="energy"]');
  const wInput = groupEl.querySelector('[data-name="wavelength"]');

  const fUnit = groupEl.querySelector('[data-name="frequency-unit"]');
  const eUnit = groupEl.querySelector('[data-name="energy-unit"]');
  const wUnit = groupEl.querySelector('[data-name="wavelength-unit"]');

  if (!fInput || !eInput || !wInput || !fUnit || !eUnit || !wUnit) {
    console.warn("EnergyWavelengthFrequencyModule: DOM 요소를 찾지 못했습니다.");
    return;
  }

  // --- 유틸 함수 ---
  const toNumber = input => {
    const n = input.valueAsNumber;
    return Number.isNaN(n) ? null : n;
  };

  const formatNumber = (num) => num.toExponential(6);

  // --- 계산 ---
  const updateFromFrequency = () => {
    const fVal = toNumber(fInput);
    if (fVal === null) return;
    const fSI = fVal * parseFloat(fUnit.value);
    eInput.value = formatNumber(h * fSI / parseFloat(eUnit.value));
    wInput.value = formatNumber(c / fSI / parseFloat(wUnit.value));
  };

  const updateFromEnergy = () => {
    const eVal = toNumber(eInput);
    if (eVal === null) return;
    const E_SI = eVal * parseFloat(eUnit.value);
    const fSI = E_SI / h;
    fInput.value = formatNumber(fSI / parseFloat(fUnit.value));
    wInput.value = formatNumber(c / fSI / parseFloat(wUnit.value));
  };

  const updateFromWavelength = () => {
    const wVal = toNumber(wInput);
    if (wVal === null) return;
    const wSI = wVal * parseFloat(wUnit.value);
    const fSI = c / wSI;
    fInput.value = formatNumber(fSI / parseFloat(fUnit.value));
    eInput.value = formatNumber(h * fSI / parseFloat(eUnit.value));
  };

  // --- 이벤트 등록 (input + select) ---
  [[fInput, updateFromFrequency], [fUnit, updateFromFrequency],
   [eInput, updateFromEnergy], [eUnit, updateFromEnergy],
   [wInput, updateFromWavelength], [wUnit, updateFromWavelength]].forEach(
    ([el, fn]) => {
      el.addEventListener('input', fn);
      if (el.tagName === 'SELECT') el.addEventListener('change', fn);
    }
  );

  // --- 초기값 반영 ---
  // 우선순위: Energy > Frequency > Wavelength
  if (toNumber(eInput) !== null) updateFromEnergy();
  else if (toNumber(fInput) !== null) updateFromFrequency();
  else if (toNumber(wInput) !== null) updateFromWavelength();
}
