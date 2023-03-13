import { EmbedWallet } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import { GAME_SERVICE_URL } from './constants';
import { LeaderBoardApi } from './api';

type AsyncCallback = () => Promise<void> | void;

type ShowLeaderboardOptions = {
  onPlayAgain?: AsyncCallback;
  onBeforeLoad?: AsyncCallback;
};

type ShowPreloaderOptions = {
  onStart?: AsyncCallback;
};

type ShowConnectWalletOptions = {
  onConnect?: AsyncCallback;
  score?: number;
};

export type SdkOptions = {
  gameId: string;
  env?: 'dev' | 'stage' | 'prod';
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
    await this.wallet.init({
      env: this.options.env || 'prod',
      connectOptions: {
        mode: 'modal',
      },
    });
  }

  showPreloader({ onStart }: ShowPreloaderOptions = {}) {
    const preloader = document.createElement('cere-preloader');
    const { open, ...modal } = UI.createModal(preloader);

    preloader.update({
      ready: false,
      onStartClick: async () => {
        await onStart?.();
        modal.close();
      },
    });

    open();

    return {
      ...modal,
      setReady: (ready = true) => preloader.update({ ready }),
    };
  }

  showLeaderboard({ onPlayAgain, onBeforeLoad }: ShowLeaderboardOptions = {}) {
    const { open, ...modal } = UI.createModal(async () => {
      const leaderboard = document.createElement('cere-leaderboard');

      await Promise.resolve(onBeforeLoad?.());
      const data = await this.leaderBoard.getData();

      leaderboard.update({ data, onPlayAgain });

      return leaderboard;
    });

    open();

    return modal;
  }

  async showConnectWallet({ onConnect, score }: ShowConnectWalletOptions = {}) {
    const connectWallet = document.createElement('cere-connect-wallet');
    const { open, ...modal } = UI.createFullscreenModal(connectWallet, { hasClose: true });

    const isWalletConnected = this.wallet.status === 'connected';
    connectWallet.update({
      isWalletConnected,
      score,
      onConnect: async () => {
        try {
          await this.wallet.connect();
          await onConnect?.();

          modal.close();
        } catch {}
      },
    });

    open();

    return modal;
  }

  async saveScore(score: number) {
    const save = async () => {
      const [ethAddress] = await this.wallet.getAccounts();
      await this.leaderBoard.saveScore(ethAddress.address, score);
    };

    if (this.wallet.status === 'connected') {
      return save();
    }

    await new Promise<void>((resolve) =>
      this.showConnectWallet({
        score,
        onConnect: () => save().then(resolve),
      }),
    );
  }
}
