const radioMetric = document.querySelector('#metric');
const radioImperail = document.querySelector('#imperial');
const setMetric = document.querySelector('#set-metric');
const setImperail = document.querySelector('#set-imperial');
const inputHeight = document.querySelector('#height');
const inputWeight = document.querySelector('#weight');
const inputHeightFt = document.querySelector('#height-ft');
const inputHeightIn = document.querySelector('#height-in');
const inputWeightSt = document.querySelector('#weight-st');
const inputWeightLbs = document.querySelector('#weight-lbs');

const allMetricInputs = document.querySelectorAll('.metric-input');
const allImperialInputs = document.querySelectorAll('.imperial-input');

const result = document.querySelector('#result-holder');
const resultSentence = document.querySelector('#text');
const resultGrid = document.querySelector('.result');


// Prevent typing letters in number inputs
const onInputNumbers = event => {
    event.target.value = event.target.value.replace(/[^0-9+]/g, '')
  }

// Validation
const validate = (inputs)=>{
    inputsArray = Array.from(inputs);
    let isValid = inputsArray.every(input => input.value !== "" && !isNaN(input.value));
    return isValid;
}

// Change system on radio click
radioMetric.addEventListener('click', ()=>{
    setMetric.classList.remove('hide');
    setImperail.classList.add('hide');  
})

radioImperail.addEventListener('click', ()=>{
    setImperail.classList.remove('hide');
    setMetric.classList.add('hide');
})


// Calculations
const calcMetric = ()=>{
    const bmi = Math.round((inputWeight.value / (inputHeight.value * inputHeight.value) * 10000) * 10) / 10 ;
    resultGrid.style = "grid-template-columns: 1fr 1fr;";
    result.innerHTML = `<h2>Your BMI is...
        <span>${bmi}</span>
        </h2>`;
    resultSentence.innerHTML = `<p>Your BMI suggests you're a healthy weight. Your ideal weight is between <strong>63.3kgs - 85.2kgs.</strong></p>`;
}
const calcImperial = ()=>{
    const weight = (parseFloat(inputWeightSt.value) * 14) + parseFloat(inputWeightLbs.value);
    const height = (parseFloat(inputHeightFt.value) * 12) + parseFloat(inputHeightIn.value);
    const bmi = Math.round((weight / (height * height) * 703) * 10) / 10 ;
    resultGrid.style = "grid-template-columns: 1fr 1fr;";
    result.innerHTML = `<h2>Your BMI is...
        <span>${bmi}</span>
        </h2>`;
    resultSentence.innerHTML = `<p>Your BMI suggests you're a healthy weight. Your ideal weight is between <strong>63.3kgs - 85.2kgs.</strong></p>`;
}

// Run all functions on typing into inputs (prevent typing letters, call validation according to selected system)
allMetricInputs.forEach((item) =>{
    item.addEventListener('input', (event)=>{
        onInputNumbers(event);
    })
    //Getting values on typing
    item.addEventListener('keyup', ()=>{
        if(radioMetric.checked && validate(allMetricInputs)){
            calcMetric();
        } else {
            result.innerHTML = `<h2>Your BMI is...</h2>`;
            resultSentence.innerHTML = "";
        }
    });
});


allImperialInputs.forEach((item) =>{
    item.addEventListener('input', (event)=>{
        onInputNumbers(event);
    })
    //Getting values on typing
    item.addEventListener('keyup', ()=>{
        if(radioImperail.checked && validate(allImperialInputs)){
            calcImperial();
        } else {
            result.innerHTML = `<h2>Your BMI is...</h2>`;
            resultSentence.innerHTML = "";
        }
    });
});



