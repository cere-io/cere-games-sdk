export class CereWallet {
  get element() {
    return $('#torusIframe');
  }

  get isFullScreen() {
    return browser.execute(() => {
      const iframe = document.getElementById('torusIframe');

      return iframe.clientHeight === window.innerHeight && iframe.clientWidth === window.innerWidth;
    });
  }

  async switchToFrame() {
    await browser.switchToFrame(await this.element);
  }

  async switchFromFrame() {
    await browser.switchToParentFrame();
  }

  async waitUntilOpened() {
    await browser.waitUntil(() => this.isFullScreen);
  }

  async waitUntilClosed() {
    await browser.waitUntil(() => this.isFullScreen.then((isFull) => !isFull), {
      timeout: 30000,
    });
  }
}
