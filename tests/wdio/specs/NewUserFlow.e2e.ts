import report from '@wdio/allure-reporter';

import { PreloaderModal, ConnectWalletModal, CereWalletAuth, LeaderboardModal, CereWalletApprove } from '../objects';

describe('New user flow', () => {
  const preloader = new PreloaderModal();
  const connectWallet = new ConnectWalletModal();
  const walletAuth = new CereWalletAuth();
  const walletApprove = new CereWalletApprove();
  const leaderboardModal = new LeaderboardModal();

  let rewardAmount = 0;
  let alertTitle = 'CONGRATULATIONS';
  let walletAddress = '';
  let score = 0;
  let gamePlayPrice = 0;
  let walletBalance = 0;

  step('Open the game via direct link', async () => {
    await browser.url('metaverse-dash-run');
  });

  step('Start game by pressing `Play Now` button in preloader', async () => {
    await preloader.element.waitForDisplayed();
    await preloader.playNowButton.click();

    await expect(preloader.element).not.toBeDisplayed();
  });

  step('Wait for Leaderboard modal to appear', async () => {
    await leaderboardModal.element.waitForDisplayed();

    expect(leaderboardModal.score).toBeGreaterThan(0);
    await leaderboardModal.signUpButton.click();
  });

  step('Connect Cere Wallet', async () => {
    await walletAuth.waitUntilOpened();
    await walletAuth.switchToFrame();

    const email = await walletAuth.enterRandomEmail();
    await walletAuth.continueButton.click();
    await walletAuth.enterOTP('555555');
    await walletAuth.verifyButton.click();

    await walletAuth.switchFromFrame();
    await walletAuth.waitUntilClosed();

    report.addArgument('Email', email);
  });

  step('Wait for Leaderboard modal to appear', async () => {
    await leaderboardModal.element.waitForDisplayed();
    expect(leaderboardModal.walletAddress).toHaveTextContaining('0x');
    //
    // walletAddress = await leaderboardModal.getWalletAddress();
    // await leaderboardModal.playAgainButton.click();
  });

  it('Reward notification should eventually appear', async () => {
    const title = await leaderboardModal.getRewardNotificationTitle();

    await expect(title).toEqual(alertTitle);
  });

  // it('Current user ballanсe should be 0', async () => {
  // walletBalance = await leaderboardModal.getBalance();

  // expect(walletBalance).toEqual(5);
  // });

  // it('Current user should be highlighted in the leaderboard', async () => {
  // const rowData = await leaderboardModal.getActiveRowData();
  // await expect(rowData.address).toHaveTextContaining('0x');

  // await expect(rowData).toBeDisplayed()

  // await expect(rowData).toMatchObject({
  //   score,
  //   address: walletAddress,
  // });
  // });

  // it('Current user ballanse should equal to reward amount', async () => {
  //   walletBalance = await leaderboardModal.getBalance();
  //
  //   await expect(walletBalance).toEqual(rewardAmount);
  // });

  // it('Game place price should be displayed and positive', async () => {
  //   gamePlayPrice = await leaderboardModal.getGamePlayPrice();
  //
  //   await expect(gamePlayPrice).toBeGreaterThan(0);
  // });

  step('Press `Play again` button', async () => {
    await expect(leaderboardModal.playAgainButton).toBeClickable();

    await leaderboardModal.playAgainButton.click();
  });

  // step('Approve tokens transfer transaction', async () => {
  //   await walletApprove.waitUntilOpened();
  //   await walletApprove.switchToFrame();
  //   await walletApprove.confirmButton.click();
  //   await walletApprove.switchFromFrame();
  //   await walletApprove.waitUntilClosed();
  // });

  // it('The page should reload and preloader appear', async () => {
  //   await preloader.element.waitForDisplayed();
  // });

  // step('Start second game session', async () => {
  //   await preloader.playNowButton.click();
  // });
  //
  // step('Play the game until the Leaderboard modal appears', async () => {
  //   await leaderboardModal.element.waitForDisplayed();
  // });

  // it('The game play price should be deducted from the balance', async () => {
  //   const newBalance = await browser.waitUntil(
  //     () => leaderboardModal.getBalance().then((balance) => balance !== walletBalance && balance),
  //     {
  //       timeout: 30000,
  //       timeoutMsg: 'The balance has not been changed after 30 sec',
  //     },
  //   );
  //
  //   await expect(newBalance).toEqual(walletBalance - gamePlayPrice);
  // });
});
