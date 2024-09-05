document.addEventListener('DOMContentLoaded', function () {
    const aorticStenosisLink = document.getElementById('aorticStenosisLink');
    const mitralValveLink = document.getElementById('mitralStenosisLink');
    const aorticValveSection = document.getElementById('aorticValveSection');
    const mitralValveSection = document.getElementById('mitralStenosisSection');
    const PISALink = document.getElementById('PISALink');
    const PISASection = document.getElementById('PISASection');


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


    const lvotVtiInput = document.getElementById('lvotVti');
    const lvotDiamInput = document.getElementById('lvotDiam');
    const avVtiInput = document.getElementById('avVti');
    const aorticValveAreaOutput = document.getElementById('aorticValveArea');
    const dimensionlessIndexOutput = document.getElementById('dimensionlessIndex');

    function calculateAVAResults() {
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
        const dimensionlessIndex = parseFloat(dimensionlessIndexOutput.textContent);

        if (!isNaN(dimensionlessIndex)) {
            if (dimensionlessIndex > 0.5 && dimensionlessIndex < 0.75) {
                ASSseverity = 'Mild Aortic Stenosis by DI';
            } else if (dimensionlessIndex > 0.25 && dimensionlessIndex <= 0.50) {
                ASSseverity = 'Moderate Aortic Stenosis by DI';
            } else if (dimensionlessIndex <= 0.25) {
                ASSseverity = 'Severe Aortic Stenosis by DI';
            } else {
                ASSseverity = 'No significant aortic Stenosis by DI';
            }
        }
        document.getElementById('aorticStenosisSeverity').textContent = ASSseverity;
    };

    const aliasingVelocityInput = document.getElementById('aliasingVelocity');
    const mrVtimaxInput = document.getElementById('mrVtiMax');
    const mrRadiusInput = document.getElementById('radius');
    const eroaOutput = document.getElementById('eroaResult');

    function calculatePISA(){
        const aliasingVelocity = parseFloat(aliasingVelocityInput.value);
        const mrVtimax = parseFloat(mrVtimaxInput.value);
        const mrRadius = parseFloat(mrRadiusInput.value);
        if (!isNaN(aliasingVelocity) && !isNaN(mrVtimax) && !isNaN(mrRadius)){
            const eroa = (Math.PI * Math.pow(mrRadius, 2) * aliasingVelocity) / mrVtimax;
            eroaOutput.textContent = eroa.toFixed(2);
        }else{
            eroaOutput.textContent = 'N/A';
        }
    };

    lvotVtiInput.addEventListener('input', calculateAVAResults);
    lvotDiamInput.addEventListener('input', calculateAVAResults);
    avVtiInput.addEventListener('input', calculateAVAResults);
    mrVtimaxInput.addEventListener('input', calculatePISA);
    mrRadiusInput.addEventListener('input', calculatePISA);
    aliasingVelocityInput.addEventListener('input', calculatePISA);
});
