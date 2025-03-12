const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  const themeLabel = document.querySelector('.theme-label');
  themeLabel.textContent = body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';
});

let display = document.querySelector(".display");
let btn = document.querySelectorAll(".btn");

let firstNo = null;
let secondNo = "";
let operator = null;
let expression = "";
let isNewCalculation = false;

function calcResult(firstNo, secondNo, operator) {
  switch (operator) {
    case '±':
      return firstNo + secondNo;
    case '%':
      return firstNo % secondNo;
    case '÷':
      return secondNo === 0 ? "Error" : firstNo / secondNo;
    case '×':
      return firstNo * secondNo;
    case '−':
      return firstNo - secondNo;
    case '+':
      return firstNo + secondNo;
    default:
      return NaN;
  }
}

btn.forEach(btn => {
  btn.addEventListener("click", function () {
    const btnValue = btn.innerHTML;

    if (btnValue === "AC") {
      display.innerHTML = "0";
      firstNo = null;
      secondNo = "";
      operator = null;
      expression = "";
      isNewCalculation = false;
    } 
    
    else if (btnValue === "=") {
      if (firstNo !== null && secondNo !== "" && operator) {
        let result = calcResult(Number(firstNo), Number(secondNo), operator);
        display.innerHTML = result;
        firstNo = result;
        secondNo = "";
        operator = null;
        expression = result.toString();
        isNewCalculation = true;
      }
    } 

    else if (btnValue === "%") {
      if (operator && firstNo !== null && secondNo !== "") {
        // If % is pressed after an operator, calculate percentage of firstNo
        secondNo = (Number(firstNo) * Number(secondNo)) / 100;
        display.innerHTML = secondNo;
      } 
      else if (firstNo !== null && operator === null) {
        // If % is pressed for a single number, convert to its percentage value
        firstNo = Number(firstNo) / 100;
        display.innerHTML = firstNo;
      }
    }
    
    else if (btn.classList.contains('operator')) {
      if (isNewCalculation) {
        isNewCalculation = false;
      }
      
      if (firstNo === null) {
        firstNo = Number(display.innerHTML);
      } 
      
      if (secondNo !== "") {
        firstNo = calcResult(Number(firstNo), Number(secondNo), operator);
        display.innerHTML = firstNo;
        secondNo = "";
      }
      
      operator = btnValue;
      expression += btnValue;
      display.innerHTML = expression;
    } 
    
    else { // Handling number input
      if (isNewCalculation) {
        expression = btnValue;
        isNewCalculation = false;
      } else {
        expression += btnValue;
      }

      if (operator === null) {
        firstNo = Number(expression);
      } else {
        secondNo += btnValue;
      }
      
      display.innerHTML = expression;
    }
  });
});
