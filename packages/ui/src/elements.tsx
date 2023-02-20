import { ComponentType } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { ThemeProvider } from './theme';
import { WidgetMap, WidgetType } from './types';

interface WidgetConstructor<P> {
  new (): WidgetType<P>;
}

export const createElement = <P extends {} = {}>(Component: ComponentType<P>): WidgetConstructor<P> => {
  class CustomElement extends HTMLElement implements WidgetType<P> {
    private componentProps: any = {};
    private mountPoint = document.createElement('div');
    private root = createRoot(this.mountPoint);
    private stylesCache = createCache({ key: Component.name.toLowerCase(), container: this.mountPoint });

    get props() {
      return this.componentProps;
    }

    withProps(props: P) {
      return this.update(props);
    }

    update(props: Partial<P>) {
      this.componentProps = { ...this.props, ...props };

      return this.render();
    }

    connectedCallback() {
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);

      this.render();
    }

    private render() {
      if (!this.isConnected) {
        return this;
      }

      this.root.render(
        <CacheProvider value={this.stylesCache}>
          <ThemeProvider>
            <Component {...this.props}>
              <slot />
            </Component>
          </ThemeProvider>
        </CacheProvider>,
      );

      return this;
    }
  }

  return CustomElement;
};

export const registerElement = (tagName: keyof WidgetMap, element: CustomElementConstructor) => {
  const existing = customElements.get(tagName);

  if (existing && existing !== element) {
    throw new Error(`An element with tag name ${tagName} is already registered`);
  }

  customElements.define(tagName, element);
};
