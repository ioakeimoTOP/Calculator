import Observable from './Observable.mjs';
import { operate } from './mathOperations.mjs';

export default class Calculator extends Observable {
  #state = {
    current: '0',
    history: [],
  };

  constructor(...observerFunctions) {
    super(...observerFunctions);
  }

  _getState() {
    return this.#state.current;
  }

  inputNumber(number) {
    if (number === '.') {
      if (this.#state.current.includes('.')) {
        return; // If there is already a . in the number an other should not be added
      }
      this.#state.current += number;
      console.log('. added');
    } else if (this.#state.current === '0') {
      this.#state.current = number;
    } else {
      this.#state.current += number;
    }
    this._dispatchStateChange();
  }

  mutate(mutator) {
    switch (mutator) {
      case 'clear':
        this.#state.history.push(Number(this.#state.current));
        this.#state.current = '0';
        break;
      case 'del':
        this.#state.current = this.#state.current.slice(0, -1);
        break;
      case 'undo':
        this.#state.current = this.#state.history.pop()?.toString() || '0';
        break;
    }
    this._dispatchStateChange();
  }
}
