import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

export const createElement = (Component: ComponentType<any>) => {
  class CustomElement extends HTMLElement {
    private mountPoint = document.createElement('div');
    private stylesCache = createCache({ key: 'element', container: this.mountPoint });

    connectedCallback() {
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
      const children = this.innerHTML && <div dangerouslySetInnerHTML={{ __html: this.innerHTML }} />;

      createRoot(this.mountPoint).render(
        <CacheProvider value={this.stylesCache}>
          <Component>{children}</Component>
        </CacheProvider>,
      );

      console.log(this.innerHTML);
    }
  }

  return CustomElement;
};

export const registerElement = (tagName: string, element: CustomElementConstructor) => {
  const existing = customElements.get(tagName);

  if (existing && existing !== element) {
    throw new Error(`An element with tag name ${tagName} is already registered`);
  }

  customElements.define(tagName, element);
};
