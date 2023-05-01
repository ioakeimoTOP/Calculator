const operatorMap = {
  '+': _add,
  '-': _subtract,
  '*': _multiply,
  '/': _divide,
};

function _add(num1, num2) {
  return Number(num1) + Number(num2);
}

function _subtract(num1, num2) {
  return Number(num1) - Number(num2);
}

function _multiply(num1, num2) {
  return Number(num1) * Number(num2);
}

function _divide(num1, num2) {
  return Number(num1) / Number(num2);
}

function operate(operator, operand1, operand2, decimalPrecision) {
  let result = operatorMap[operator](operand1, operand2);
  if (decimalPrecision) {
    const precisionFactor = 10 ** decimalPrecision;
    result = Math.round(result * precisionFactor) / precisionFactor;
  }
  return result.toString();
}

export { operate };
