import { CereWallet } from './CereWallet';

export class CereWalletAuth extends CereWallet {
  get continueButton() {
    return browser.findByRole$('button', { name: 'Continue' });
  }

  get emailInput() {
    return browser.findByRole$('textbox', { name: '' }); //TODO should be "Email",
  }

  get verifyButton() {
    return browser.findByRole$('button', { name: 'Verify' });
  }

  async enterRandomEmail() {
    const emailSuffix = Math.random().toString(32).slice(2);
    const email = `auto+${emailSuffix}@test.io`;

    await this.emailInput.setValue(email);

    return email;
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
