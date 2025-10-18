document.addEventListener("DOMContentLoaded", function() {
    const h = 4.135667696e-15; // eV·s
    const c = 2.99792458e8;    // m/s

    const fInput = document.getElementById("frequency");
    const eInput = document.getElementById("energy");
    const wInput = document.getElementById("wavelength");

    const fUnit = document.getElementById("frequency-unit");
    const eUnit = document.getElementById("energy-unit");
    const wUnit = document.getElementById("wavelength-unit");

    function toNumber(input) {
        const n = input.valueAsNumber;
        return isNaN(n) ? null : n;
    }

    function updateFromFrequency() {
        const f_val = toNumber(fInput);
        if (f_val === null) return;
        const f = f_val * parseFloat(fUnit.value);

        const E_eV = h * f;
        const lam_m = c / f;

        eInput.value = (E_eV / parseFloat(eUnit.value)).toExponential(6);
        wInput.value = (lam_m / parseFloat(wUnit.value)).toExponential(6);
    }

    function updateFromEnergy() {
        const E_val = toNumber(eInput);
        if (E_val === null) return;
        const E_eV = E_val * parseFloat(eUnit.value);

        const f = E_eV / h;
        const lam_m = c / f;

        fInput.value = (f / parseFloat(fUnit.value)).toExponential(6);
        wInput.value = (lam_m / parseFloat(wUnit.value)).toExponential(6);
    }

    function updateFromWavelength() {
        const lam_val = toNumber(wInput);
        if (lam_val === null) return;
        const lam_m = lam_val * parseFloat(wUnit.value);

        const f = c / lam_m;
        const E_eV = h * f;

        fInput.value = (f / parseFloat(fUnit.value)).toExponential(6);
        eInput.value = (E_eV / parseFloat(eUnit.value)).toExponential(6);
    }

    [fInput, fUnit].forEach(el => el.addEventListener("input", updateFromFrequency));
    [eInput, eUnit].forEach(el => el.addEventListener("input", updateFromEnergy));
    [wInput, wUnit].forEach(el => el.addEventListener("input", updateFromWavelength));
});
