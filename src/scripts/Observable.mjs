/**
 * Abstract Class Observable
 * Provide an interface for subscribing observers and notifying them.
 *
 * Concrete Subclasses MUST implement _getState() and all state logic.
 */
export default class Observable {
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

  constructor(...observerFunctions) {
    if (this.constructor === Observable) {
      throw new Error(
        `${this.constructor.name} is an Abstract Class and should not be instantiated.`
      );
    }
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

  _getState() {
    throw new Error(
      'This method must be overwritten by the Subclass to define a state to be returned.'
    );
  }

  _dispatchStateChange() {
    this.#observers.forEach((observer) => {
      observer(this._getState());
    });
  }
}
