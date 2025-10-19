export function EnergyThetaQzModule(groupEl) {
  if (!groupEl) return;

  const e1Input = groupEl.querySelector('[data-name="energy1"]');
  const e1Unit = groupEl.querySelector('[data-name="energy1-unit"]');
  const t1Input = groupEl.querySelector('[data-name="theta1"]');
  const t1Unit = groupEl.querySelector('[data-name="theta1-unit"]');
  const qz1Input = groupEl.querySelector('[data-name="qz1"]');
  const qz1Unit = groupEl.querySelector('[data-name="qz1-unit"]');

  const e2Input = groupEl.querySelector('[data-name="energy2"]');
  const e2Unit = groupEl.querySelector('[data-name="energy2-unit"]');
  const t2Input = groupEl.querySelector('[data-name="theta2"]');
  const t2Unit = groupEl.querySelector('[data-name="theta2-unit"]');
  const qz2Input = groupEl.querySelector('[data-name="qz2"]');
  const qz2Unit = groupEl.querySelector('[data-name="qz2-unit"]');

  const toNumber = (input) => {
    const n = input.valueAsNumber;
    return isNaN(n) ? null : n;
  };

  const updateQz1 = () => {
    const theta = toNumber(t1Input);
    const energy = toNumber(e1Input);
    if (theta === null || energy === null) return;

    const eVal = energy * parseFloat(e1Unit.value);
    const lambda = 1239.841984 / eVal * 1e-10; // eV → m
    const thetaRad = theta * parseFloat(t1Unit.value);
    const qz = 4 * Math.PI * Math.sin(thetaRad) / lambda;
    qz1Input.value = (qz / parseFloat(qz1Unit.value)).toExponential(6);
  };

  const updateQz2 = () => {
    const theta = toNumber(t2Input);
    const energy = toNumber(e2Input);
    if (theta === null || energy === null) return;

    const eVal = energy * parseFloat(e2Unit.value);
    const lambda = 1239.841984 / eVal * 1e-10;
    const thetaRad = theta * parseFloat(t2Unit.value);
    const qz = 4 * Math.PI * Math.sin(thetaRad) / lambda;
    qz2Input.value = (qz / parseFloat(qz2Unit.value)).toExponential(6);
  };

  // 이벤트 연결
  [t1Input, t1Unit, e1Input, e1Unit].forEach((el) =>
    el.addEventListener("input", updateQz1)
  );
  [t2Input, t2Unit, e2Input, e2Unit].forEach((el) =>
    el.addEventListener("input", updateQz2)
  );

  // 초기 계산: 이미 값이 있으면 자동 업데이트
  updateQz1();
  updateQz2();
}
