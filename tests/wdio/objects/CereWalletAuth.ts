import { CereWallet } from './CereWallet';

export class CereWalletAuth extends CereWallet {
  get newWalletButton() {
    return browser.findByRole$('button', { name: 'Create a new wallet' });
  }

  get emailInput() {
    return browser.findByRole$('textbox', { name: 'Email' });
  }

  get signUpButton() {
    return browser.findByRole$('button', { name: 'Sign Up' });
  }

  get verifyButton() {
    return browser.findByRole$('button', { name: 'Verify' });
  }

  async enterOTP(otp: string) {
    await $('.react-code-input').waitForDisplayed();

    const inputs = await browser.$$('.react-code-input input');

    return Promise.all(inputs.map((input, index) => input.setValue(otp[index])));
  }

  async switchToFrame() {
    await super.switchToFrame();

    await browser.switchToFrame(await browser.findByTitle('Embedded browser'));
  }

  async switchFromFrame() {
    await browser.switchToParentFrame();

    await super.switchFromFrame();
  }
}
