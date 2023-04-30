import Calculator from './Calculator.mjs';

const screen = document.querySelector('.calculator__screen');
function updateScreen(newScreenState) {
  screen.textContent = newScreenState;
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
