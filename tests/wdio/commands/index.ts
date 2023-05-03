import { setupBrowser, WebdriverIOQueriesChainable, WebdriverIOQueries } from '@testing-library/webdriverio';

declare global {
  namespace WebdriverIO {
    interface Browser extends WebdriverIOQueries, WebdriverIOQueriesChainable<Browser> {}
    interface Element extends WebdriverIOQueries, WebdriverIOQueriesChainable<Element> {
      widget$: (selector?: string) => ChainablePromiseElement;
    }
  }
}

/**
 * Add Testing Library commands
 */
setupBrowser(browser);

/**
 * Custom command to access widgets shadow elements
 */
browser.addCommand(
  'widget$',
  async function (this: WebdriverIO.Element, selector?: string) {
    const widgetRoot = this.shadow$('[data-widget-root]');

    return selector ? widgetRoot.$(selector) : widgetRoot;
  },
  true,
);
