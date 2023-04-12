import { ComponentType, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { ThemeProvider } from './theme';
import { WidgetType } from './types';
import { Context } from './createContext';

interface WidgetConstructor<P> {
  new (): WidgetType<P>;
}

export const WidgetContext = createContext<Context | null>(null);

export const createWidget = <P extends {} = {}>(
  Component: ComponentType<P>,
  context: Context | null = null,
): WidgetConstructor<P> => {
  class CustomElement extends HTMLElement implements WidgetType<P> {
    private componentProps: any = {};
    private mountPoint = document.createElement('div');
    private root = createRoot(this.mountPoint);
    private stylesCache = createCache({ key: Component.name.toLowerCase(), container: this.mountPoint });

    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
    }

    get props() {
      return this.componentProps;
    }

    update(props: Partial<P>) {
      this.componentProps = { ...this.props, ...props };

      return this.render();
    }

    connectedCallback() {
      this.render();
    }

    private render() {
      if (!this.isConnected) {
        return this;
      }

      this.root.render(
        <CacheProvider value={this.stylesCache}>
          <ThemeProvider>
            <WidgetContext.Provider value={context}>
              <Component {...this.props}>
                <slot />
              </Component>
            </WidgetContext.Provider>
          </ThemeProvider>
        </CacheProvider>,
      );

      return this;
    }
  }

  return CustomElement;
};
