import { EmbedWallet, WalletAccount, WalletBalance } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import {
  ANALYTICS_EVENTS,
  GAME_SERVICE_URL,
  GAME_SESSION_DEPOSIT_ADDRESS,
  GAME_SESSION_PRICE,
  GMT_ID,
  NEW_WALLET_REWARD,
} from './constants';
import { GamesApi } from './api';
import { Analytics } from './Analytics';

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
  readonly wallet = new EmbedWallet();

  private readonly ui = UI.createContext({
    config: {
      newWalletReward: NEW_WALLET_REWARD,
      sessionPrice: GAME_SESSION_PRICE,
    },
  });

  private readonly analytics = new Analytics();
  private readonly api = new GamesApi({
    gameId: this.options.gameId,
    baseUrl: GAME_SERVICE_URL,
  });

  constructor(private options: SdkOptions) {
    this.wallet.subscribe('accounts-update', ([ethAccount]: WalletAccount[]) => {
      this.ui.wallet.address = ethAccount?.address;
    });

    this.wallet.subscribe('balance-update', ({ amount }: WalletBalance) => {
      this.ui.wallet.balance = amount.toNumber();
    });

    this.wallet.subscribe('status-update', () => {
      this.ui.wallet.isReady = this.wallet.status !== 'not-ready';
      this.ui.wallet.connecting = this.wallet.status === 'connecting';
    });
  }

  async init(params: InitParams = {}) {
    await UI.register(this.ui);

    this.initWallet();
    this.analytics.init({ gtmId: GMT_ID });

    this.options.onReady?.(this);
  }

  private async initWallet() {
    await this.wallet.init({
      appId: this.options.gameId,
      env: this.options.env || 'prod',

      connectOptions: {
        mode: 'modal',
      },
    });
  }

  private async payForSession() {
    const [ethAccount, cereAccount] = await this.wallet.getAccounts();

    const txHash = await this.wallet.transfer({
      token: 'CERE',
      to: GAME_SESSION_DEPOSIT_ADDRESS,
      amount: GAME_SESSION_PRICE,
    });

    await this.api.saveSessionTX(txHash, [ethAccount.address, cereAccount.address]);
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
    const { open, ...modal } = UI.createFullscreenModal(async () => {
      const leaderboard = document.createElement('cere-leaderboard');

      await onBeforeLoad?.();
      const data = await this.api.getLeaderboard();

      leaderboard.update({
        data,
        onPlayAgain: async () => {
          await this.payForSession();
          await onPlayAgain?.();
        },
      });

      return leaderboard;
    });

    open();

    return modal;
  }

  async showConnectWallet({ onConnect, score }: ShowConnectWalletOptions = {}) {
    const connectWallet = document.createElement('cere-connect-wallet');
    const { open, ...modal } = UI.createFullscreenModal(connectWallet, { hasClose: true });

    connectWallet.update({
      score,
      onConnect: async () => {
        try {
          await this.wallet.connect();
          await onConnect?.();

          /**
           * Send wallet connected events to analytics
           *
           * TODO: Send only for new wallets
           */
          const { email, isNewUser } = await this.wallet.getUserInfo();
          this.analytics.trackEvent(ANALYTICS_EVENTS.walletCompleted, { userEmail: email });
          this.ui.wallet.isNewUser = isNewUser;

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
      await this.api.saveScore(ethAddress.address, score);
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
