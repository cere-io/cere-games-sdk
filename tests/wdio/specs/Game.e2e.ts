// import { step } from 'mocha-steps';

import { PreloaderModal, ConnectWalletModal } from '../objects';

describe('Game', () => {
  const preloader = new PreloaderModal();
  const connectWallet = new ConnectWalletModal();

  before(async () => {
    await browser.url('/metaverse-dash-run/');
  });

  step('should show preloader modal', async () => {
    await expect(preloader.element).toBeDisplayed();
  });

  step('should close preloader modal after clicking Start button', async () => {
    preloader.startButton.click();

    await expect(preloader.element).not.toBeDisplayed();
  });

  step('should show connect wallet modal', async () => {
    await connectWallet.element.waitForDisplayed({ timeout: 10000 });
  });
});
