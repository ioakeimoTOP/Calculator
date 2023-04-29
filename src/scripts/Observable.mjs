export class Observable {
  #state;
  #observers;

  #validateObserverIsFunction(observer) {
    const observerType = typeof observer;
    if (observerType !== 'function') {
      throw new TypeError(
        `Expected argument of type function, received ${observerType} instead`,
        'Observable.mjs',
        7
      );
    }
  }

  constructor(initialState, ...observerFunctions) {
    this.#state = initialState;

    observerFunctions?.forEach(this.#validateObserverIsFunction);
    this.#observers = new Set(observerFunctions);
  }

  subscribe(observerFunction) {
    this.#validateObserverIsFunction(observerFunction);
    this.#observers.add(observerFunction);
  }

  unsubscribe(observerFunction) {
    this.#observers.delete(observerFunction);
  }

  setState(newState) {
    this.#state = newState;
    this.#observers.forEach((observer) => {
      observer(this.#state);
    });
  }
}
