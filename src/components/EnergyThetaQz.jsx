import React, { useState, useEffect } from "react";
import { energyUnits, thetaUnits, qzUnits } from "../constants";

export default function EnergyThetaQz() {
  const [energy, setEnergy] = useState(6.0);
  const [energyUnit, setEnergyUnit] = useState(1e3);
  const [theta, setTheta] = useState(30.0);
  const [thetaUnit, setThetaUnit] = useState(Math.PI / 180);
  const [qz, setQz] = useState(null);
  const [qzUnit, setQzUnit] = useState(1e10);

  const lambdaFromEnergy = (E) => 1239.841984 / (E * energyUnit) * 1e-10;
  const thetaToRad = (θ) => θ * thetaUnit;
  const radToTheta = (rad) => rad / thetaUnit;

  useEffect(() => {
    if (energy != null && theta != null) {
      const λ = lambdaFromEnergy(energy);
      const θRad = thetaToRad(theta);
      const Q = 4 * Math.PI * Math.sin(θRad) / λ;
      setQz(Q / qzUnit);
    }
  }, [energy, theta, energyUnit, thetaUnit, qzUnit]);

  useEffect(() => {
    if (energy != null && qz != null) {
      const λ = lambdaFromEnergy(energy);
      const θRad = Math.asin(qz * qzUnit * λ / (4 * Math.PI));
      setTheta(radToTheta(θRad));
    }
  }, [qz, energy, energyUnit, qzUnit, thetaUnit]);

  return (
    <section>
      <h2>Energy ↔ Theta ↔ Qz</h2>
      <div>
        <label>Energy:</label>
        <input type="number" value={energy} onChange={e => setEnergy(parseFloat(e.target.value))} />
        <select value={energyUnit} onChange={e => setEnergyUnit(parseFloat(e.target.value))}>
          {energyUnits.map(u => <option key={u.label} value={u.value}>{u.label}</option>)}
        </select>
      </div>
      <div>
        <label>Theta:</label>
        <input type="number" value={theta} onChange={e => setTheta(parseFloat(e.target.value))} />
        <select value={thetaUnit} onChange={e => setThetaUnit(parseFloat(e.target.value))}>
          {thetaUnits.map(u => <option key={u.label} value={u.value}>{u.label}</option>)}
        </select>
      </div>
      <div>
        <label>Qz:</label>
        <input type="number" value={qz || ""} onChange={e => setQz(parseFloat(e.target.value))} />
        <select value={qzUnit} onChange={e => setQzUnit(parseFloat(e.target.value))}>
          {qzUnits.map(u => <option key={u.label} value={u.value}>{u.label}</option>)}
        </select>
      </div>
    </section>
  );
}
