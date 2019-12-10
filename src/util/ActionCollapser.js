export default class ActionCollapser {

  #func;
  #delay;
  #lastTimeout;
  #args;
  #fire;

  constructor(func, timeout) {
    this.#func = func;
    this.#delay = timeout;
    this.#lastTimeout = -1;
    this.#args = null;
    this.#fire = this.fire.bind(this);
  }

  push(...args) {
    if (this.#lastTimeout !== -1) {
      window.clearTimeout(this.#lastTimeout);
    }
    this.#args = args;
    this.#lastTimeout = window.setTimeout(this.#fire, this.#delay);
  }

  fire() {
    this.#func(...this.#args);
  }
}