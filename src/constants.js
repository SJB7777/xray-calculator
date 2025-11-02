export const h = 4.135667696e-15; // eV·s
export const c = 2.99792458e8;    // m/s

export const energyUnits = [
  { label: "eV", value: 1 },
  { label: "keV", value: 1e3 },
  { label: "MeV", value: 1e6 },
  { label: "J", value: 6.242e18 },
];

export const wavelengthUnits = [
  { label: "Å", value: 1e-10 },
  { label: "nm", value: 1e-9 },
  { label: "μm", value: 1e-6 },
  { label: "m", value: 1 },
];

export const freqUnits = [
  { label: "EHz", value: 1e18 },
  { label: "PHz", value: 1e15 },
  { label: "THz", value: 1e12 },
  { label: "GHz", value: 1e9 },
  { label: "MHz", value: 1e6 },
  { label: "kHz", value: 1e3 },
  { label: "Hz", value: 1 },
];

export const thetaUnits = [
  { label: "°", value: Math.PI / 180 },
  { label: "rad", value: 1 },
];

export const qzUnits = [
  { label: "1/Å", value: 1e10 },
  { label: "1/nm", value: 1e9 },
  { label: "1/m", value: 1 },
];
