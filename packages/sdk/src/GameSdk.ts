import { EmbedWallet } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import leaderboardMockData from './leaderboardMock.json';

export type SdkOptions = {
  onReady?: (sdk: GamesSDK) => void;
};

export type InitParams = {};

export class GamesSDK {
  private ui = UI.createContext({
    wallet: {
      loading: true,
    },
  });

  readonly wallet = new EmbedWallet();

  constructor(private options: SdkOptions = {}) {
    this.wallet.subscribe('status-update', async () => {
      this.ui.wallet.loading = this.wallet.status === 'connecting' || this.wallet.status === 'not-ready';

      if (this.wallet.status === 'connected') {
        const [ethAccount] = await this.wallet.getAccounts();

        this.ui.wallet.address = ethAccount.address;
      }
    });
  }

  async init(params: InitParams = {}) {
    await UI.register(this.ui);

    this.wallet.init({ env: 'dev' });
    this.options.onReady?.(this);
  }

  showPreloader() {
    const preloader = document.createElement('cere-preloader');
    const { open, ...modal } = UI.createModal(preloader);

    preloader.update({
      ready: false,
      onStartClick: modal.close,
    });

    open();

    return {
      ...modal,
      setReady: (ready = true) => preloader.update({ ready }),
    };
  }

  showLeaderboard() {
    const leaderboard = document.createElement('cere-leaderboard');
    const { open, ...modal } = UI.createModal(leaderboard, { hasClose: true });

    leaderboard.update({
      data: leaderboardMockData,
    });

    open();

    return modal;
  }

  showConnectWallet(onConnect?: () => void) {
    const connectWallet = document.createElement('cere-connect-wallet');
    const { open, ...modal } = UI.createModal(connectWallet, { hasClose: true });

    connectWallet.update({
      onConnect: () => {
        this.wallet.connect();
      },

      onNext: () => {
        onConnect?.();
        modal.close();
      },
    });

    open();

    return modal;
  }

  /**
   * Fake implementation
   * TODO: implement properly
   */
  async saveScore(score: number) {
    if (this.wallet.status === 'connected') {
      return;
    }

    return new Promise<void>((resolve) => this.showConnectWallet(resolve));
  }
}
