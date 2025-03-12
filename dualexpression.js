const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('light-mode');
  const themeLabel = document.querySelector('.theme-label');
  themeLabel.textContent = body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';
});

let display = document.querySelector(".display");
let btn = document.querySelectorAll(".btn");


let result = 0;
let firstNo = 0;
let secondNo = 0;
let operator = 0;
let previousResult = 0;
let count = 0;

function calcResult(firstNo, secondNo, operator){
    switch(operator){
        case '±' :
            result = firstNo+secondNo;
            break;
        case '%' :
            result = firstNo%secondNo;
            break;
        case '÷' :
            result = firstNo/secondNo;
            break;
        case '×' :
            result =  firstNo*secondNo;
            break;
        case '−' :
            result = firstNo-secondNo;
            break;
        case '+' :
            result =  firstNo+secondNo;
            break;
        default :
            result = NaN;
    }

    return typeof result === "number" ? parseFloat(result.toFixed(1)) : result;
}

btn.forEach(btn => {
    btn.addEventListener("click", function(){
        const btnValue = btn.innerHTML;
        
        
        if(btnValue == "AC"){
            display.innerHTML = "0"
            firstNo = 0;
            secondNo = 0;
            operator = 0;
            count = 0;
        }

        else if(btnValue == "="){
            // console.log(firstNo);
            
            display.innerHTML = calcResult(Number(firstNo), Number(secondNo), operator);
            firstNo = display.innerHTML;
            secondNo = 0;
            operator = 0;
            count = 0;
        }

        else if(display.innerHTML == "0"){
            display.innerHTML = btnValue;
        }

        else {
                if(btn.classList.contains('operator')){
                    operator = btnValue;
                    firstNo = display.innerHTML;
                    
                }
    
                if(firstNo!=0 && !btn.classList.contains('operator')){
                    secondNo += btnValue;
                    console.log(secondNo);
                    count++;
                }

           

            display.innerHTML += btnValue;
            
            
        }
    })
})

