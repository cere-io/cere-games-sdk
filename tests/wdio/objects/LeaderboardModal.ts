import { Widget } from './Widget';

export class LeaderboardModal extends Widget {
  get element() {
    return $('cere-fullscreen-modal cere-leaderboard');
  }

  get walletAddress() {
    return this.shadowRoot.findByLabelText$('Wallet address');
  }

  get table() {
    return this.shadowRoot.findByRole$('table');
  }

  get activeRow() {
    return this.table.findByRole$('row', { selected: true });
  }

  get playAgainButton() {
    return this.shadowRoot.findByRole$('button', { name: 'Play again' });
  }
}
