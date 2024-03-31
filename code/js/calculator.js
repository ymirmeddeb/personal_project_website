let operation = null;
let firstNumber = null;

function appendNumber(number) {
  const display = document.getElementById('display');
  if (operation !== null && firstNumber === null) {
    firstNumber = display.value;
    display.value = "";
  }
  display.value += number;
}

function setOperation(op) {
  const display = document.getElementById('display');
  if (display.value !== '') {
    if (firstNumber !== null) {
      calculate();
    }
    operation = op;
  }
}

function calculate() {
  const display = document.getElementById('display');
  let secondNumber = display.value;
  let result = 0;

  if (firstNumber !== null && operation !== null && secondNumber !== '') {
    switch (operation) {
      case '+':
        result = parseFloat(firstNumber) + parseFloat(secondNumber);
        break;
      case '-':
        result = parseFloat(firstNumber) - parseFloat(secondNumber);
        break;
      case '*':
        result = parseFloat(firstNumber) * parseFloat(secondNumber);
        break;
      case '/':
        if (secondNumber === '0') {
          display.value = 'Error';
          return;
        } else {
          result = parseFloat(firstNumber) / parseFloat(secondNumber);
        }
        break;
    }

    display.value = result.toString();
    // Reset for the next operation
    resetCalculation();
  }
}

function clearDisplay() {
  document.getElementById('display').value = '';
  resetCalculation();
}

function resetCalculation() {
  operation = null;
  firstNumber = null;
}


document.addEventListener('DOMContentLoaded', (event) => {
  const display = document.getElementById('display');

  display.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(e) {
  console.log(e.key);
  const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', '/', 'Enter', 'Backspace', 'Delete', 'Del', 'Escape'];
  if (!allowedKeys.includes(e.key)) {
    e.preventDefault(); // Stop other keys from being processed
    return;
  }

  switch (e.key) {
    case 'Enter':
      calculate();
      break;
    case 'Backspace':
    case 'Delete':
    case 'Del':
    case 'Escape':
      clearDisplay();
      break;
    case '+':
    case '-':
    case '*':
    case '/':
      setOperation(e.key);
      break;
    default:
      appendNumber(e.key);
  }
}
