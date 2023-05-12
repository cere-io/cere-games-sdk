export abstract class Widget {
  abstract get element(): ChainablePromiseElement;

  get shadowRoot() {
    return this.element.widget$();
  }
}
