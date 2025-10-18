document.addEventListener("DOMContentLoaded", function() {

	const h = 4.135667696e-16; // Planck constant (eV·s)
	const c = 2.99792458e8; // Light speed (m/s)
	const hc = 1.23984198e-6; //  (m·eV)

	const fInput = document.getElementById("frequency");
	const eInput = document.getElementById("energy");
	const wInput = document.getElementById("wavelength");

	const fUnit = document.getElementById("frequency-unit");
	const eUnit = document.getElementById("energy-unit");
	const wUnit = document.getElementById("wavelength-unit");

	function toNumber(value) {
		const n = parseFloat(value);
		return isNaN(n) ? null : n;
	}

	function updateFromFrequency() {
		const f_val = toNumber(fInput.value);
		if (f_val === null) return;
		const f = f_val * parseFloat(fUnit.value); // Hz

		const E_eV = h * f;
		const lam_m = hc / E_eV;

		// Convert to current units
		eInput.value = (E_eV / parseFloat(eUnit.value)).toExponential(6);
		wInput.value = (lam_m / parseFloat(wUnit.value)).toExponential(6);
	}

	function updateFromEnergy() {
		const E_val = toNumber(eInput.value);
		if (E_val === null) return;
		const E_eV = E_val * parseFloat(eUnit.value);

		const f = E_eV / h;
		const lam_m = f * c;

		fInput.value = (f / parseFloat(fUnit.value)).toExponential(6);
		wInput.value = (lam_m / parseFloat(wUnit.value)).toExponential(6);
	}

	function updateFromWavelength() {
		const lam_val = toNumber(wInput.value);
		if (lam_val === null) return;
		const lam_m = lam_val * parseFloat(wUnit.value);

		const f = c / lam_m;
		const E_eV = h * f;

		fInput.value = (f / parseFloat(fUnit.value)).toExponential(6);
		eInput.value = (E_eV / parseFloat(eUnit.value)).toExponential(6);
	}

	// 단위 선택이 바뀌면 즉시 다시 계산 반영
	fUnit.addEventListener("change", updateFromFrequency);
	eUnit.addEventListener("change", updateFromEnergy);
	wUnit.addEventListener("change", updateFromWavelength);

	fInput.addEventListener("input", updateFromFrequency);
	eInput.addEventListener("input", updateFromEnergy);
	wInput.addEventListener("input", updateFromWavelength);
});