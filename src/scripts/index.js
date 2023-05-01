import Calculator from './Calculator.mjs';

const screen = document.querySelector('.calculator__screen');
const currentState = screen.querySelector('.calculator__state');
const pendingState = screen.querySelector('.calculator__state-pending');

function updateScreen(newScreenState) {
  currentState.textContent = newScreenState.current;
  pendingState.textContent = newScreenState.pending;
}
const calculator = new Calculator();
calculator.subscribe(updateScreen);

const numpad = document.querySelector('.calculator__numpad');
numpad.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__item')) {
    calculator.inputNumber(target.textContent);
  }
});

const mutators = document.querySelector('.calculator__mutators');
mutators.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__item')) {
    calculator.mutate(target.dataset.mutation);
  }
});

const operators = document.querySelector('.calculator__operators');
operators.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__item')) {
    calculator.operate(target.dataset.operation);
  }
});
