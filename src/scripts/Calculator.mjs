import Observable from './Observable.mjs';

export default class Calculator extends Observable {
  constructor(initialState, ...observerFunctions) {
    super(initialState, ...observerFunctions);
  }

  _mutate(newState) {
    this._state = newState;
  }
}
