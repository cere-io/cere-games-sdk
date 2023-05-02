describe('Game', () => {
  beforeEach(async () => {
    await browser.url('/metaverse-dash-run/');
  });

  describe('Preloader', () => {
    let preloader: ChainablePromiseElement;

    beforeEach(async () => {
      preloader = $('cere-modal cere-preloader');
    });

    it('should be shown', async () => {
      await expect(preloader).toBeExisting();
    });

    it('should be closed after clicking start button', async () => {
      await preloader.shadow$('[data-testid="preloaderStart"]').click();

      await expect(preloader).not.toBeExisting();
    });
  });
});
