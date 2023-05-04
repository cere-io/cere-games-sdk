import { Widget } from './Widget';

export class ConnectWalletModal extends Widget {
  get element() {
    return $('cere-fullscreen-modal cere-connect-wallet');
  }

  get connectButton() {
    return this.shadowRoot.findByRole$('button', { name: 'Claim 5 free tokens' });
  }
}
