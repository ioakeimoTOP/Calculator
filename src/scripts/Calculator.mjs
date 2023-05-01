import Observable from './Observable.mjs';
import * as mathOperations from './stringMathOperations.mjs';

('use strict');

export default class Calculator extends Observable {
  #PRECISION;

  #state = {
    current: '0',
    initiateInputOverwrite: true,
    pendingOperation: null,
    history: [],
  };

  constructor(precision = 5, ...observerFunctions) {
    super(...observerFunctions);
    this.#PRECISION = precision;
  }

  _getState() {
    return {
      current: this.#state.current,
      previous: this.#state.history.at(-1),
      pending: this.#state.pendingOperation,
    };
  }

  _pushState(newState = '0') {
    this.#state.history.push(this.#state.current);
    this.#state.current = newState;
  }

  _clearState() {
    this.#state.current = 0;
    this.#state.pendingOperation = null;
    this.#state.history = [];
    this.#state.initiateInputOverwrite = true;
  }

  inputNumber(number) {
    if (number === '.' && this.#state.current.includes('.')) {
      return; // If there is already a . in the number an other should not be added
    }

    if (this.#state.initiateInputOverwrite) {
      this.#state.initiateInputOverwrite = false;
      this.#state.current = number === '.' ? '0.' : number;
    } else {
      this.#state.current += number;
    }

    this._dispatchStateChange();
  }

  mutate(mutator) {
    switch (mutator) {
      case 'clear':
        this._clearState();
        break;
      case 'del':
        this.#state.current = this.#state.current.slice(0, -1);
        break;
      case 'undo':
        this.#state.current = this.#state.history.pop() || '0';
        break;
    }
    this._dispatchStateChange();
  }

  operate(operator) {
    if (this.#state.pendingOperation) {
      this.#state.current = mathOperations.operate(
        this.#state.pendingOperation,
        this.#state.history.at(-1),
        this.#state.current,
        this.#PRECISION
      );
    }

    if (operator !== '=') {
      this.#state.pendingOperation = operator;
      this._pushState();
    } else {
      this.#state.pendingOperation = null;
      this._pushState(this.#state.current);
    }

    this._dispatchStateChange();
    this.#state.initiateInputOverwrite = true;
  }
}
