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
let isNewCalculation = false;

btn.forEach(btn => {
  btn.addEventListener("click", function () {
    const btnValue = btn.innerHTML;

    if (btnValue === "AC") {
      display.innerHTML = "0";
      firstNo = null;
      secondNo = "";
      operator = null;
      isNewCalculation = false;
    } 
    
    else if (btnValue === "=") {
      if (firstNo !== null && secondNo !== "" && operator) {
        let result = calculate(Number(firstNo), Number(secondNo), operator);
        display.innerHTML = result;
        firstNo = result;
        secondNo = "";
        operator = null;
        isNewCalculation = true;
      }
    } 

    else if (btnValue === "%") {
      if (operator && firstNo !== null && secondNo !== "") {
        // Convert secondNo to a percentage of firstNo
        secondNo = (Number(secondNo) / 100) * Number(firstNo);
      } 
      else if (firstNo !== null && operator === null) {
        // Convert a single number to a percentage
        firstNo = Number(firstNo) / 100;
        display.innerHTML = firstNo;
        return; // Avoid further processing
      }
      display.innerHTML = firstNo + " " + operator + " " + secondNo;
    }

    else if (btn.classList.contains('operator')) {
      if (isNewCalculation) {
        isNewCalculation = false;
      }

      if (firstNo === null) {
        firstNo = Number(display.innerHTML);
      } 
      
      if (secondNo !== "") {
        firstNo = calculate(Number(firstNo), Number(secondNo), operator);
        display.innerHTML = firstNo;
        secondNo = "";
      }
      
      operator = btnValue;
      display.innerHTML = firstNo + " " + operator;
    } 
    
    else { // Handling number input
      if (isNewCalculation) {
        firstNo = btnValue;
        isNewCalculation = false;
      } 
      else if (operator === null) {
        firstNo = (firstNo || "") + btnValue;
      } 
      else {
        secondNo += btnValue;
      }
      
      display.innerHTML = firstNo + (operator ? " " + operator + " " + secondNo : "");
    }
  });
});

function calculate(a, b, op) {
  switch (op) {
    case '÷': return b === 0 ? "Error" : a / b;
    case '×': return a * b;
    case '−': return a - b;
    case '+': return a + b;
    default: return NaN;
  }
}
