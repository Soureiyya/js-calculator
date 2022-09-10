const buttons = document.querySelectorAll('button');

//Functions for all basic math operators 
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//Function that takes 1 operator, 2 numbers and calls one of the above functions
function operate(num1, num2, operatorSign) {
    if(operatorSign === '+') {
        return add(num1, num2);
    }
    else if(operatorSign === '-') {
        return subtract(num1, num2);
    }
    else if(operatorSign === '*') {
        return multiply(num1, num2);
    }
    else if(operatorSign === '/') {
        if(num2 === 0) {
            return 'Error';
        } else {
            return divide(num1, num2);
        }
    }
}

//console.log(operate(6,2,'+'));
  
//Event when a key is pressed and held
window.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[data-key='${e.code}']`); //Search for the data-key in buttons
    key.click();
});

//Update display
let displayValue = '0';

function updateDisplayScreen() {
    const display = document.getElementById('display');
    display.innerText = displayValue; //Add values in the html div
}

updateDisplayScreen();

//Add event when each key is pressed
function clickButton() {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() { 
            if(buttons[i].classList.contains('calcnumbers')) { //Classnames with its' values
                enterNumber(buttons[i].value); 
                updateDisplayScreen();
            } else if(buttons[i].classList.contains('calcoperators')) {
                enterOperator(buttons[i].value); 
            } else if(buttons[i].classList.contains('equals')) {
                checkEquals(); 
                updateDisplayScreen();
            } else if(buttons[i].classList.contains('decimal')) {
                addDecimal(buttons[i].value); 
                updateDisplayScreen();
            } else if(buttons[i].classList.contains('backspace')) {
                clearLastNum();
                updateDisplayScreen();
            } else if(buttons[i].classList.contains('clear'))
                clearDisplay();
                updateDisplayScreen();
        }
    )}
}

clickButton();

//Input validation for numbers and operators
let firstNum = null;
let secondNum = null;
let firstOperator = null;
let secondOperator = null;
let total = null;

function enterNumber(calcnumbers) {
    if(firstOperator === null) {
        if(displayValue === '0' || displayValue === 0) {
            displayValue = calcnumbers;
        }
        else if(displayValue === firstNum) {
            displayValue = calcnumbers;
        }
        else {
            displayValue += calcnumbers;
        }
    }
    else {
        if(displayValue === firstNum) {
            displayValue = calcnumbers;
        } else {
            displayValue += calcnumbers;
        }
    }
}

function enterOperator(calcoperators) {
    if(firstOperator != null && secondOperator === null) { 
        secondOperator = calcoperators;
        secondNum = displayValue;
        total = operate(Number(firstNum), Number(secondNum), firstOperator);
        displayValue = roundNum(total, 2).toString();
        firstNum = displayValue;
        total = null;
    }
    else if(firstOperator != null && secondOperator != null) {
        secondNum = displayValue;
        total = operate(Number(firstNum), Number(secondNum), secondOperator);
        secondOperator = calcoperators;
        displayValue = roundNum(total, 2).toString();
        firstNum = displayValue;
        total = null;
    }
    else { 
        firstOperator = calcoperators;
        firstNum = displayValue;
    }
}


//Input validation for equals
function checkEquals() {
    if(firstOperator === null) {
        displayValue = displayValue; 
    }
    else if(secondOperator != null) {
        secondNum = displayValue;
        total = operate(Number(firstNum), Number(secondNum), secondOperator);
        if(total === 'Error') {
            displayValue = 'Error';
        } else {
            displayValue = roundNum(total, 2).toString();
            firstNum = displayValue;
            secondNum = null;
            firstOperator = null;
            secondOperator = null;
            total = null;
        }
    }
    else {
        secondNum = displayValue;
        total = operate(Number(firstNum), Number(secondNum), firstOperator);
        if(total === 'Error') {
            displayValue = 'Error';
        } else {
            displayValue = roundNum(total, 2).toString();
            firstNum = displayValue;
            secondNum = null;
            firstOperator = null;
            secondOperator = null;
            total = null;
        }
    }
}

//Function to round numbers to 2 decimal places
function roundNum(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

//Function to clear all in the display
function clearDisplay() {
    displayValue = '0';
    firstNum = null;
    secondNum = null;
    firstOperator = null;
    secondOperator = null;
    total = null;
}

//Function to add decimal
function addDecimal(dot) {
    if(displayValue === firstNum || displayValue === secondNum) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) { 
        displayValue += dot;
    } 
}

//Function to clear last number
function clearLastNum(firstNum) {
    displayValue = displayValue.toString().slice(0, -1);
}




