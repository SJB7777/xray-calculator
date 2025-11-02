export function EnergyThetaQzModule(groupEl) {
  if (!groupEl) return;

  const items = [
    {
      energy: groupEl.querySelector('[data-name="energy1"]'),
      energyUnit: groupEl.querySelector('[data-name="energy1-unit"]'),
      theta: groupEl.querySelector('[data-name="theta1"]'),
      thetaUnit: groupEl.querySelector('[data-name="theta1-unit"]'),
      qz: groupEl.querySelector('[data-name="qz1"]'),
      qzUnit: groupEl.querySelector('[data-name="qz1-unit"]')
    },
    {
      energy: groupEl.querySelector('[data-name="energy2"]'),
      energyUnit: groupEl.querySelector('[data-name="energy2-unit"]'),
      theta: groupEl.querySelector('[data-name="theta2"]'),
      thetaUnit: groupEl.querySelector('[data-name="theta2-unit"]'),
      qz: groupEl.querySelector('[data-name="qz2"]'),
      qzUnit: groupEl.querySelector('[data-name="qz2-unit"]')
    }
  ];

  const h = 4.135667696e-15; // eV·s
  const c = 2.99792458e8;    // m/s

  const toNum = input => {
    let n = input.valueAsNumber;
    if (isNaN(n)) n = parseFloat(input.value);
    return isNaN(n) ? null : n;
  };

  const fmt = n => n.toExponential(6);

  const lambdaFromEnergy = (E, unitEl) => (1239.841984 / (E * parseFloat(unitEl.value))) * 1e-10; // eV→m

  const thetaToRad = (theta, unitEl) => theta * parseFloat(unitEl.value);

  const radToTheta = (rad, unitEl) => rad / parseFloat(unitEl.value);

  const qzFromThetaLambda = (thetaRad, lambda) => 4 * Math.PI * Math.sin(thetaRad) / lambda;

  const thetaFromQzLambda = (qz, lambda) => Math.asin((qz * lambda) / (4 * Math.PI));

  const update = (item, source) => {
    const E = toNum(item.energy);
    const theta = toNum(item.theta);
    const qz = toNum(item.qz);

    if (source === 'energy') {
      if (E === null || theta === null) return;
      const λ = lambdaFromEnergy(E, item.energyUnit);
      const θRad = thetaToRad(theta, item.thetaUnit);
      const qzVal = qzFromThetaLambda(θRad, λ);
      item.qz.value = fmt(qzVal / parseFloat(item.qzUnit.value));
    } 
    else if (source === 'theta') {
      if (theta === null || E === null) return;
      const λ = lambdaFromEnergy(E, item.energyUnit);
      const θRad = thetaToRad(theta, item.thetaUnit);
      const qzVal = qzFromThetaLambda(θRad, λ);
      item.qz.value = fmt(qzVal / parseFloat(item.qzUnit.value));
    } 
    else if (source === 'qz') {
      if (qz === null || E === null) return;
      const λ = lambdaFromEnergy(E, item.energyUnit);
      const θRad = thetaFromQzLambda(qz * parseFloat(item.qzUnit.value), λ);
      item.theta.value = radToTheta(θRad, item.thetaUnit);
    }
  };

  items.forEach(item => {
    [
      { el: item.energy, src: 'energy' },
      { el: item.theta, src: 'theta' },
      { el: item.qz, src: 'qz' },
      { el: item.energyUnit, src: 'energy' },
      { el: item.thetaUnit, src: 'theta' },
      { el: item.qzUnit, src: 'qz' }
    ].forEach(({el, src}) => {
      el.addEventListener('input', () => update(item, src));
      el.addEventListener('change', () => update(item, src));
    });

    // 초기 계산
    setTimeout(() => {
      if (toNum(item.energy) !== null && toNum(item.theta) !== null) update(item, 'energy');
      else if (toNum(item.energy) !== null && toNum(item.qz) !== null) update(item, 'qz');
    }, 0);
  });
}
