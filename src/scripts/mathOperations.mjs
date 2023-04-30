const operatorMap = {
  '+': _add,
  '-': _subtract,
  '*': _multiply,
  '/': _divide,
};

function _add(num1, num2) {
  return num1 + num2;
}

function _subtract(num1, num2) {
  return num1 - num2;
}

function _multiply(num1, num2) {
  return num1 * num2;
}

function _divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, operand1, operand2) {
  return operatorMap[operator](operand1, operand2);
}

export { operate };
