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

  get playAgainButton() {
    return this.shadowRoot.findByRole$('button', { name: /Play Again/ });
  }

  get signUpButton() {
    return this.shadowRoot.findByRole$('button', { name: /Sign up & reveal your rank/ });
  }

  get score() {
    return this.shadowRoot.findByRole$('score');
  }

  get rank() {
    return this.shadowRoot.findByRole$('rank');
  }

  async getRewardNotificationTitle() {
    const notification = await browser.waitUntil(() => this.shadowRoot.queryByRole('alertNotification'), {
      timeout: 30000,
      timeoutMsg: 'The reward notification did not appear in time',
    });

    return notification.getText();
  }

  async getWalletAddress() {
    const element = await this.walletAddress;

    return element.getAttribute('title');
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
