/**
 * Abstract Class Observable
 *
 * Provide a state that can be subscribed to by callback observer functions.
 * On state change, notifies observers with the new state.
 */
export default class Observable {
  _state;
  #observers;

  #validateIsFunction(arg) {
    const argTpe = typeof arg;
    if (argTpe !== 'function') {
      throw new TypeError(
        `Expected argument of type function, received ${argTpe} instead`,
        'Observable.mjs'
      );
    }
  }

  constructor(initialState, ...observerFunctions) {
    if (this.constructor === Observable) {
      throw new Error(
        `${this.constructor.name} is an Abstract Class and should not be instantiated.`
      );
    }

    this._state = initialState;
    observerFunctions?.forEach(this.#validateIsFunction);
    this.#observers = new Set(observerFunctions);
  }

  subscribe(observerFunction) {
    this.#validateIsFunction(observerFunction);
    this.#observers.add(observerFunction);
  }

  unsubscribe(observerFunction) {
    this.#observers.delete(observerFunction);
  }

  /**
   * Overwrite this accessor if only part of a state is needed.
   * For example, if the state is a history stack, you may want to define the accessor as _state.at(-1)
   */
  _getState() {
    return this._state;
  }

  #dispatchStateChange() {
    this.#observers.forEach((observer) => {
      observer(this._getState());
    });
  }

  _mutate(argsArray) {
    throw new Error(
      'This method must be overwritten by the Subclass to define a state change behavior.'
    );
  }

  setState(...mutateArgs) {
    this._mutate(mutateArgs);
    this.#dispatchStateChange();
  }
}
