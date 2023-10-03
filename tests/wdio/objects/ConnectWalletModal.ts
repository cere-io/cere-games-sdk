import { Widget } from './Widget';

export class ConnectWalletModal extends Widget {
  get element() {
    return $('cere-fullscreen-modal cere-connect-wallet');
  }

  get claimButton() {
    return this.shadowRoot.findByRole$('button', { name: /Claim \d+ free tokens/i });
  }

  get score() {
    return this.shadowRoot.queryByRole('score');
  }

  // async getScore() {
  //   const text = await this.score.getText();
  //   const [match, amount] = text.match(/(\d+)/i) || [];
  //
  //   return match ? +amount : undefined;
  // }

  async getRewardAmount() {
    const text = await this.claimButton.getText();
    const [match, amount] = text.match(/(\d+)/i) || [];

    return match ? +amount : undefined;
  }
}
