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
