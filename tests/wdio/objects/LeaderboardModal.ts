import { Widget } from './Widget';

export class LeaderboardModal extends Widget {
  get element() {
    return $('cere-fullscreen-modal cere-leaderboard');
  }

  get walletAddress() {
    return this.shadowRoot.findByLabelText$(/wallet address/i);
  }

  get table() {
    return this.shadowRoot.findByRole$('table');
  }

  get activeRow() {
    return this.table.findByRole$('row', { selected: true });
  }

  get tokensBalance() {
    return this.shadowRoot.findByText$(/tokens balance: (\d+\.\d{2})/i);
  }

  get tokensToPlay() {
    return this.shadowRoot.findByText$(/(\d+) tokens to play/i);
  }

  get playAgainButton() {
    return this.shadowRoot.findByRole$('button', { name: /play again/i });
  }

  async getRewardNotificationAmount() {
    const notification = await browser.waitUntil(() => this.shadowRoot.queryByRole('alert'), {
      timeout: 30000,
      timeoutMsg: 'The reward notification did not appear in time',
    });

    const text = await notification.getText();
    const [match, amount] = text.match(/(\d+) \$CERE tokens/i) || [];

    return match ? +amount : undefined;
  }

  async getWalletAddress() {
    const element = await this.walletAddress;

    return element.getAttribute('title');
  }

  async getBalance() {
    const text = await this.tokensBalance.getText();
    const [match, amount] = text.match(/tokens balance: (\d+\.\d{2})/i) || [];

    return match ? +amount : undefined;
  }

  async getGamePlayPrice() {
    const text = await this.tokensToPlay.getText();
    const [match, amount] = text.match(/(\d+) tokens to play/i) || [];

    return match ? +amount : undefined;
  }

  async getActiveRowData() {
    const [rank, player, , score] = await this.activeRow.getAllByRole$('cell');

    return {
      score: await score.getText().then(Number),
      rank: await rank.getText().then(Number),
      address: await player.getByLabelText$(/address/i).getAttribute('data-full'),
    };
  }
}
