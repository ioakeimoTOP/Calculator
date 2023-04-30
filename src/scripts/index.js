import Calculator from './Calculator.mjs';

const screen = document.querySelector('.calculator__screen');
function updateScreen(newScreenState) {
  screen.textContent = newScreenState;
}
const screenState = new Calculator(0, updateScreen);

const numpad = document.querySelector('.calculator__numpad');
numpad.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('calculator__item')) {
    screenState.setState(target.textContent);
  }
});
