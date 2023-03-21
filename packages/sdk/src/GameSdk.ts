import { BN, EmbedWallet, WalletAccount, WalletBalance } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import {
  ANALYTICS_EVENTS,
  GAME_PORTAL_URL,
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
  onTweet?: AsyncCallback;
};

type ShowPreloaderOptions = {
  onStart?: AsyncCallback;
};

type ShowConnectWalletOptions = {
  onConnect?: AsyncCallback;
  score?: number;
};

export type GameInfo = {
  name?: string;
  url?: string;
  logoUrl?: string;
};

export type SdkOptions = {
  gameId: string;
  env?: 'dev' | 'stage' | 'prod';
  gameInfo?: GameInfo;
  onReady?: (sdk: GamesSDK) => void;
};

export type InitParams = Pick<SdkOptions, 'gameInfo'>;

const balanceToFloat = (balance: BN, decimals: BN, precision: number) => {
  const bnPrecision = new BN(precision);
  const amount = balance.div(new BN(10).pow(decimals.sub(bnPrecision)));

  return amount.toNumber() / 10 ** bnPrecision.toNumber();
};

export class GamesSDK {
  private readonly ui = UI.createContext({
    config: {
      newWalletReward: NEW_WALLET_REWARD,
      sessionPrice: GAME_SESSION_PRICE,
      gamePortalUrl: GAME_PORTAL_URL[this.env],
    },
  });

  private readonly analytics = new Analytics();

  readonly wallet = new EmbedWallet({
    env: this.env,
    appId: this.options.gameId,
  });

  private readonly api = new GamesApi({
    gameId: this.options.gameId,
    baseUrl: GAME_SERVICE_URL[this.env],
  });

  constructor(private options: SdkOptions) {
    this.wallet.subscribe('accounts-update', ([ethAccount]: WalletAccount[]) => {
      this.ui.wallet.address = ethAccount?.address;
    });

    this.wallet.subscribe('balance-update', ({ balance, decimals }: WalletBalance) => {
      this.ui.wallet.balance = balanceToFloat(balance, decimals, 2);
    });

    this.wallet.subscribe('status-update', () => {
      this.ui.wallet.isReady = this.wallet.status !== 'not-ready';
      this.ui.wallet.connecting = this.wallet.status === 'connecting';
    });
  }

  private get env() {
    return this.options.env || 'prod';
  }

  /**
   * TODO: Fetch game info from the Game Portal API
   */
  private async getGameInfo(info: GameInfo = {}) {
    return {
      name: document.title,
      url: window.location.href,

      ...this.options.gameInfo,
      ...info,
    };
  }

  async init(options: InitParams = {}) {
    const gameInfo = await this.getGameInfo(options.gameInfo);

    await UI.register(this.ui);

    this.initWallet(gameInfo);
    this.analytics.init({ gtmId: GMT_ID });

    this.options.onReady?.(this);
  }

  private async initWallet(gameInfo: GameInfo) {
    await this.wallet.init({
      context: {
        app: gameInfo,
      },
      connectOptions: {
        mode: 'modal',
      },
    });
  }

  private async payForSession() {
    const [ethAccount, cereAccount] = await this.wallet.getAccounts();

    const txHash = await this.wallet.transfer({
      token: 'CERE',
      to: GAME_SESSION_DEPOSIT_ADDRESS[this.env],
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
    const { open, ...modal } = UI.createFullscreenModal(
      async () => {
        const leaderboard = document.createElement('cere-leaderboard');

        await onBeforeLoad?.();
        const data = await this.api.getLeaderboard();
        const { email } = await this.wallet.getUserInfo();

        leaderboard.update({
          data,
          onPlayAgain: async () => {
            this.analytics.trackEvent(ANALYTICS_EVENTS.clickPlayAgain, { userEmail: email });
            await this.payForSession();
            await onPlayAgain?.();
          },
          onTweet: () => {
            this.onTweet();
          },
        });

        return leaderboard;
      },
      { isLeaderBoard: true },
    );

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
          if (isNewUser) {
            this.analytics.trackEvent(ANALYTICS_EVENTS.accountCreated, { userEmail: email });
          }
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

  async onTweet() {
    const { email } = await this.wallet.getUserInfo();

    this.analytics.trackEvent(ANALYTICS_EVENTS.highScoreTweet, { userEmail: email });
  }
}
