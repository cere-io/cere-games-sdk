import { PreloaderModal, ConnectWalletModal, CereWalletAuth, LeaderboardModal, CereWalletApprove } from '../objects';

describe('Game', () => {
  const preloader = new PreloaderModal();
  const connectWallet = new ConnectWalletModal();
  const walletAuth = new CereWalletAuth();
  const walletApprove = new CereWalletApprove();
  const leaderboardModal = new LeaderboardModal();

  before(async () => {
    await browser.url('/examples/metaverse-dash-run/');
  });

  describe('Preloader modal', () => {
    before(async () => {
      await preloader.element.waitForDisplayed();
    });

    step('close and start the game', async () => {
      preloader.startButton.click();

      await expect(preloader.element).not.toBeDisplayed();
    });
  });

  describe('Connect Wallet Modal', () => {
    before(async () => {
      await connectWallet.element.waitForDisplayed();
    });

    step('click claim tokens button', async () => {
      await connectWallet.connectButton.click();
    });

    it('should disbale clame button', async () => {
      await expect(connectWallet.connectButton).not.toBeClickable();
    });
  });

  describe('Cere Wallet Authentication', () => {
    before(async () => {
      await walletAuth.waitUntilOpened();
      await walletAuth.switchToFrame();
    });

    step('start new wallet creation', async () => {
      await walletAuth.newWalletButton.click();
    });

    step('enter new email and proceed', async () => {
      const minutes = Math.round(new Date().getTime() / (1000 * 60));

      await walletAuth.emailInput.setValue(`automated-tests+${minutes}@cere.io`);
      await walletAuth.signUpButton.click();
    });

    step('enter OTP and proceed', async () => {
      await walletAuth.enterOTP('555555');
      await walletAuth.verifyButton.click();
    });

    it('should be closed', async () => {
      await walletAuth.switchFromFrame();
      await walletAuth.waitUntilClosed();
    });
  });

  describe('Leaderboard Modal', () => {
    before(async () => {
      await leaderboardModal.element.waitForDisplayed();
    });

    it('should have wallet address', () => {
      expect(leaderboardModal.walletAddress).toHaveTextContaining('0x');
    });

    it('should have active list item', () => {
      expect(leaderboardModal.activeRow).toBeExisting();
    });

    step('start new game session', async () => {
      await leaderboardModal.playAgainButton.waitForClickable({ timeout: 30000 });
      await leaderboardModal.playAgainButton.click();
    });
  });

  describe('Cere Wallet Approve', () => {
    before(async () => {
      await walletApprove.waitUntilOpened();
      await walletApprove.switchToFrame();
    });

    step('confirm transaction', async () => {
      await walletApprove.confirmButton.click();
    });

    it('should be closed', async () => {
      await walletApprove.switchFromFrame();
      await walletApprove.waitUntilClosed();
    });

    it('should reload the page and show Preloader', async () => {
      await preloader.element.waitForDisplayed();
    });
  });
});
