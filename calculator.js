document.addEventListener('DOMContentLoaded', function () {
    const aorticStenosisLink = document.getElementById('aorticStenosisLink');
    const mitralValveLink = document.getElementById('mitralStenosisLink');
    const aorticValveSection = document.getElementById('aorticValveSection');
    const mitralValveSection = document.getElementById('mitralStenosisSection');
    const PISALink = document.getElementById('PISALink');
    const PISASection = document.getElementById('PISASection');

    const radiusInput = document.getElementById('radius');
    const aliasingVelocityInput = document.getElementById('aliasingVelocity');
    const mrVtiMaxInput = document.getElementById('mrVtiMax');
    const eroaResultOutput = document.getElementById('eroaResult');

    function hideAllSections() {
        console.log('Hiding all sections');
        const sections = document.querySelectorAll(
            '#aorticValveSection, #mitralStenosisSection, #PISASection'
        );
        sections.forEach(section => {
            section.style.display = 'none';
        });
    }

    aorticStenosisLink.addEventListener('click', function (event) {
        event.preventDefault();
        hideAllSections();
        aorticValveSection.style.display = 'block';
    });

    mitralValveLink.addEventListener('click', function (event) {
        event.preventDefault();
        hideAllSections();
        mitralValveSection.style.display = 'block';
    });

    PISALink.addEventListener('click', function (event) {
        event.preventDefault();
        hideAllSections();
        PISASection.style.display = 'block';
    })


    const lvotDiamInput = document.getElementById('lvotDiam');
    const avVtiInput = document.getElementById('avVti');
    const aorticValveAreaOutput = document.getElementById('aorticValveArea');
    const dimensionlessIndexOutput = document.getElementById('dimensionlessIndex');

    function calculateResults() {
        const lvotVti = parseFloat(lvotVtiInput.value);
        const lvotDiam = parseFloat(lvotDiamInput.value);
        const avVti = parseFloat(avVtiInput.value);

        if (!isNaN(lvotVti) && !isNaN(lvotDiam) && !isNaN(avVti) && avVti !== 0) {
            const aorticValveArea = (lvotVti * (lvotDiam / 2 * Math.PI)) / avVti;
            aorticValveAreaOutput.textContent = aorticValveArea.toFixed(2);
        } else {
            aorticValveAreaOutput.textContent = 'N/A';
        }

        if (!isNaN(lvotVti) && !isNaN(avVti) && avVti !== 0) {
            const dimensionlessIndex = lvotVti / avVti;
            dimensionlessIndexOutput.textContent = dimensionlessIndex.toFixed(2);
        } else {
            dimensionlessIndexOutput.textContent = 'N/A';
        }

        let ASSseverity = "";
        const dimensionlessIndexValue = parseFloat(dimensionlessIndexOutput.textContent);

        if (!isNaN(dimensionlessIndexValue)) {
            if (dimensionlessIndexValue > 0.5 && dimensionlessIndexValue < 0.75) {
                ASSseverity = 'Mild Aortic Stenosis by DI';
            } else if (dimensionlessIndexValue > 0.25 && dimensionlessIndexValue <= 0.50) {
                ASSseverity = 'Moderate Aortic Stenosis by DI';
            } else if (dimensionlessIndexValue <= 0.25) {
                ASSseverity = 'Severe Aortic Stenosis by DI';
            } else {
                ASSseverity = 'No significant aortic Stenosis by DI';
            }
        }

        document.getElementById('aorticStenosisSeverity').textContent = ASSseverity;
    }


    lvotVtiInput.addEventListener('input', calculateResults);
    lvotDiamInput.addEventListener('input', calculateResults);
    avVtiInput.addEventListener('input', calculateResults);

    function calculateEROA() {
        const radius = parseFloat(radiusInput.value);
        const aliasingVelocity = parseFloat(aliasingVelocityInput.value);
        const mrVtiMax = parseFloat(mrVtiMaxInput.value);

        if (!isNaN(radius) && !isNaN(aliasingVelocity) && !isNaN(mrVtiMax) && mrVtiMax !== 0) {
            const eroa = (Math.PI * Math.pow(radius, 2) * 2 * aliasingVelocity) / mrVtiMax;
            eroaResultOutput.textContent = eroa.toFixed(2);
        } else {
            eroaResultOutput.textContent = 'N/A';
        }
    }


    radiusInput.addEventListener('input', calculateEROA);
    aliasingVelocityInput.addEventListener('input', calculateEROA);
    mrVtiMaxInput.addEventListener('input', calculateEROA);
