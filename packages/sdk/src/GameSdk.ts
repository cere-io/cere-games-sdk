import { EmbedWallet } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import leaderboardMockData from './leaderboardMock.json';

export type SdkOptions = {
  onReady?: (sdk: GamesSDK) => void;
};

export type InitParams = {};

export class GamesSDK {
  private ui = UI.createContext();

  readonly wallet = new EmbedWallet();

  constructor(private options: SdkOptions = {}) {
    this.wallet.subscribe('status-update', async () => {
      this.ui.wallet.isReady = this.wallet.status !== 'not-ready';
      this.ui.wallet.connecting = this.wallet.status === 'connecting';

      if (this.wallet.status === 'connected') {
        const [ethAccount] = await this.wallet.getAccounts();

        this.ui.wallet.address = ethAccount.address;
      }
    });
  }

  async init(params: InitParams = {}) {
    await UI.register(this.ui);

    this.initWallet();

    this.options.onReady?.(this);
  }

  private async initWallet() {
    await this.wallet.init({ env: 'dev' });
  }

  showPreloader(onStart?: () => void) {
    const preloader = document.createElement('cere-preloader');
    const { open, ...modal } = UI.createModal(preloader);

    preloader.update({
      ready: false,
      onStartClick: () => {
        modal.close();
        onStart?.();
      },
    });

    open();

    return {
      ...modal,
      setReady: (ready = true) => preloader.update({ ready }),
    };
  }

  showLeaderboard(onPlayAgain?: () => void) {
    const leaderboard = document.createElement('cere-leaderboard');
    const { open, ...modal } = UI.createModal(leaderboard, { hasClose: true });

    leaderboard.update({
      onPlayAgain,
      data: leaderboardMockData,
    });

    open();

    return modal;
  }

  showConnectWallet(onConnect?: () => void) {
    const connectWallet = document.createElement('cere-connect-wallet');
    const { open, ...modal } = UI.createModal(connectWallet, { hasClose: true });

    connectWallet.update({
      onConnect: async () => {
        try {
          await this.wallet.connect();

          modal.close();
          onConnect?.();
        } catch {}
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
