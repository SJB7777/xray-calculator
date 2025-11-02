import React, { useState, useEffect } from "react";
import { h, c, energyUnits, wavelengthUnits, freqUnits } from "../constants";

export default function EnergyWavelengthFrequency() {
  const [energy, setEnergy] = useState(5.5);
  const [energyUnit, setEnergyUnit] = useState(1e3);
  const [wavelength, setWavelength] = useState(null);
  const [wavelengthUnit, setWavelengthUnit] = useState(1e-10);
  const [frequency, setFrequency] = useState(null);
  const [frequencyUnit, setFrequencyUnit] = useState(1e18);

  useEffect(() => {
    if (energy != null) {
      const E = energy * energyUnit;
      const f = E / h;
      const λ = c / f;
      setFrequency(f / frequencyUnit);
      setWavelength(λ / wavelengthUnit);
    }
  }, [energy, energyUnit, wavelengthUnit, frequencyUnit]);

  useEffect(() => {
    if (wavelength != null) {
      const λ = wavelength * wavelengthUnit;
      const f = c / λ;
      const E = h * f;
      setFrequency(f / frequencyUnit);
      setEnergy(E / energyUnit);
    }
  }, [wavelength, wavelengthUnit, energyUnit, frequencyUnit]);

  useEffect(() => {
    if (frequency != null) {
      const f = frequency * frequencyUnit;
      const E = h * f;
      const λ = c / f;
      setEnergy(E / energyUnit);
      setWavelength(λ / wavelengthUnit);
    }
  }, [frequency, energyUnit, wavelengthUnit, frequencyUnit]);

  return (
    <section>
      <h2>Energy ↔ Wavelength ↔ Frequency</h2>
      <div>
        <label>Energy:</label>
        <input type="number" value={energy} onChange={e => setEnergy(parseFloat(e.target.value))} />
        <select value={energyUnit} onChange={e => setEnergyUnit(parseFloat(e.target.value))}>
          {energyUnits.map(u => <option key={u.label} value={u.value}>{u.label}</option>)}
        </select>
      </div>
      <div>
        <label>Wavelength:</label>
        <input type="number" value={wavelength || ""} onChange={e => setWavelength(parseFloat(e.target.value))} />
        <select value={wavelengthUnit} onChange={e => setWavelengthUnit(parseFloat(e.target.value))}>
          {wavelengthUnits.map(u => <option key={u.label} value={u.value}>{u.label}</option>)}
        </select>
      </div>
      <div>
        <label>Frequency:</label>
        <input type="number" value={frequency || ""} onChange={e => setFrequency(parseFloat(e.target.value))} />
        <select value={frequencyUnit} onChange={e => setFrequencyUnit(parseFloat(e.target.value))}>
          {freqUnits.map(u => <option key={u.label} value={u.value}>{u.label}</option>)}
        </select>
      </div>
    </section>
  );
}
