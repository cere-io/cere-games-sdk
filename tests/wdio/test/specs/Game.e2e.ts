describe('Game', () => {
  beforeEach(async () => {
    await browser.url('/metaverse-dash-run/');
  });

  describe('Preloader', () => {
    let preloader: ChainablePromiseElement;

    beforeEach(async () => {
      preloader = $('cere-preloader');
    });

    it('should be shown', async () => {
      await expect(preloader).toBeDisplayed();
    });

    it('should be closed after clicking start button', async () => {
      const startButton = await preloader.widget$().findByRole('button', {
        name: 'Start',
      });

      startButton.click();

      await expect(preloader).not.toBeDisplayed();
    });
  });

  describe('Connect Wallet', () => {
    let connectWallet: ChainablePromiseElement;

    beforeEach(async () => {
      await $('cere-preloader').widget$('button=Start').click();
      await $('cere-connect-wallet').waitForDisplayed({ timeout: 10000 });

      connectWallet = $('cere-connect-wallet');
    });

    it('should eventually appear', async () => {
      await expect(connectWallet).toBeDisplayed();
    });

    it('should have claim tokens button', async () => {
      const connectButton = connectWallet.widget$().findByRole('button', {
        name: 'Claim 5 free tokens',
      });

      await expect(connectButton).toBeDisplayed();
    });
  });
});
