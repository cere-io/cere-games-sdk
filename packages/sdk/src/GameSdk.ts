import { EmbedWallet } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import { GAME_SERVICE_URL } from './constants';
import { LeaderBoardApi } from './api';

export type SdkOptions = {
  gameId: string;
  onReady?: (sdk: GamesSDK) => void;
};

export type InitParams = {};

export class GamesSDK {
  private ui = UI.createContext();

  readonly wallet = new EmbedWallet();
  readonly leaderBoard = new LeaderBoardApi({
    gameId: this.options.gameId,
    baseUrl: GAME_SERVICE_URL,
  });

  constructor(private options: SdkOptions) {
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
    const { open, ...modal } = UI.createModal(leaderboard);

    leaderboard.update({
      data: [],
      onPlayAgain,
    });

    this.leaderBoard.getData().then((data) => {
      leaderboard.update({ data });
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

  async saveScore(score: number) {
    if (this.wallet.status !== 'connected') {
      await new Promise<void>((resolve) => this.showConnectWallet(resolve));
    }

    const [ethAddress] = await this.wallet.getAccounts();
    await this.leaderBoard.saveScore(ethAddress.address, score);
  }
}
