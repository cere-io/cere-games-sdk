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
      await preloader.widget$('button=Start').click();

      await expect(preloader).not.toBeExisting();
    });

    it('should be closed after clicking start button (Testing Library)', async () => {
      // await preloader.widget$().findByTestId$('preloaderStart').click(); // By test Id
      await preloader.widget$().findByRole$('button', { name: 'Start' }).click(); // By aria role

      await expect(preloader).not.toBeExisting();
    });
  });
});
