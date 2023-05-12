import { CereWallet } from './CereWallet';

export class CereWalletApprove extends CereWallet {
  get confirmButton() {
    return browser.findByRole$('button', { name: 'Confirm' });
  }

  get cancelButton() {
    return browser.findByRole$('button', { name: 'Cancel' });
  }
}
