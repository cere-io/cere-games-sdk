import { WidgetMap } from './types';

export const registerWidget = (tagName: keyof WidgetMap, element: CustomElementConstructor) => {
  const existing = customElements.get(tagName);

  if (existing && existing !== element) {
    throw new Error(`An element with tag name ${tagName} is already registered`);
  }

  customElements.define(tagName, element);
};
