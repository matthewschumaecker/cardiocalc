document.addEventListener('DOMContentLoaded', function () {
    const aorticStenosisLink = document.getElementById('aorticStenosisLink');
    const aorticValveSection = document.getElementById('aorticValveSection');
    const lvotVtiInput = document.getElementById('lvotVti');

    aorticStenosisLink.addEventListener('click', function (event) {
        event.preventDefault();
        aorticValveSection.style.display = 'block';
    });
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

        var ASSseverity = "";
        dimensionlessIndex = dimensionlessIndexOutput.value;

        if(isNaN(dimensionlessIndexOutput.value){
            if (0.5 < dimensionlessIndexOutput.value < 0.75){
                ASSseverity = 'Mild Aortic Stenosis by DI';
            }
            if (0.25 < dimensionlessIndexOutput.value < 0.50){
                ASSseverity = 'Moderate Aortic Stenosis by DI';
            }
            if (dimensionlessIndexOutput.value < 0.25){
                ASSseverity = 'Severe Aortic Stenosis by DI';
            }
            else {ASSseverity = 'No significant aortic Stenosis by DI'}

        )
    };


    lvotVtiInput.addEventListener('input', calculateResults);
    lvotDiamInput.addEventListener('input', calculateResults);
    avVtiInput.addEventListener('input', calculateResults);
});
