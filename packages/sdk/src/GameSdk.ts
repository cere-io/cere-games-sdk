import { BN, EmbedWallet, WalletAccount, WalletBalance, WalletStatus } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import {
  ANALYTICS_EVENTS,
  GAME_PORTAL_URL,
  GAME_SERVICE_URL,
  GAME_SESSION_DEPOSIT_ADDRESS,
  GAME_SESSION_PRICE,
  GMT_ID,
  NEW_WALLET_REWARD,
  SDK_VERSION,
} from './constants';
import { GamesApi } from './api';
import { Analytics } from './Analytics';
import { Reporting, ReportingOptions } from './Reporting';

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
  reporting?: Omit<ReportingOptions, 'env'>;
  onReady?: (sdk: GamesSDK) => void;
  onWalletDisconnect?: () => void;
};

export type InitParams = Pick<SdkOptions, 'gameInfo'>;

const balanceToFloat = (balance: BN, decimals: BN, precision: number) => {
  const bnPrecision = new BN(precision);
  const amount = balance.div(new BN(10).pow(decimals.sub(bnPrecision)));

  return amount.toNumber() / 10 ** bnPrecision.toNumber();
};

export class GamesSDK {
  private readonly reporting = new Reporting({ env: this.env, ...this.options.reporting });
  private readonly analytics = new Analytics();

  private readonly ui = UI.createContext({
    reporting: this.reporting,

    config: {
      newWalletReward: NEW_WALLET_REWARD,
      sessionPrice: GAME_SESSION_PRICE,
      gamePortalUrl: GAME_PORTAL_URL[this.env],
    },
  });

  readonly wallet = new EmbedWallet({
    env: this.env,
    appId: this.options.gameId,
  });

  private readonly api = new GamesApi({
    gameId: this.options.gameId,
    baseUrl: GAME_SERVICE_URL[this.env],
  });

  constructor(private options: SdkOptions) {
    console.log(`CERE Games SDK: version ${SDK_VERSION}`);

    this.reporting.message('Test async message');

    this.wallet.subscribe('accounts-update', ([ethAccount]: WalletAccount[]) => {
      this.ui.wallet.address = ethAccount?.address;
    });

    this.wallet.subscribe('balance-update', ({ balance, decimals }: WalletBalance) => {
      this.ui.wallet.balance = balanceToFloat(balance, decimals, 2);
    });

    this.wallet.subscribe('status-update', (status: WalletStatus, prevStatus: WalletStatus) => {
      this.ui.wallet.isReady = status !== 'not-ready';
      this.ui.wallet.connecting = status === 'connecting';

      /**
       * Handle wallet disconnect
       */
      if (prevStatus === 'connected' && status === 'ready') {
        this.options.onWalletDisconnect?.();
      }
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
    this.reporting.init();

    await UI.register(this.ui);
    const gameInfo = await this.getGameInfo(options.gameInfo);

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

    if (txHash) {
      this.analytics.trackEvent(ANALYTICS_EVENTS.confirmTransaction, { userEmail: ethAccount.name });
    }

    await this.api.saveSessionTX(txHash, [ethAccount.address, cereAccount.address]);
  }

  showPreloader({ onStart }: ShowPreloaderOptions = {}) {
    const preloader = document.createElement('cere-preloader');
    const { open, ...modal } = UI.createModal(preloader);

    preloader.update({
      ready: false,
      onStartClick: async () => {
        this.analytics.trackEvent(ANALYTICS_EVENTS.startGame);
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

        leaderboard.update({
          data,
          onPlayAgain: async () => {
            const { email } = await this.wallet.getUserInfo();
            this.analytics.trackEvent(ANALYTICS_EVENTS.clickPlayAgain, { userEmail: email });
            await this.payForSession();
            await onPlayAgain?.();
          },
          onTweet: async () => {
            const { email } = await this.wallet.getUserInfo();
            this.analytics.trackEvent(ANALYTICS_EVENTS.highScoreTweet, { userEmail: email });
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

          const { email, isNewUser } = await this.wallet.getUserInfo();
          this.ui.wallet.isNewUser = isNewUser;

          this.analytics.trackEvent(ANALYTICS_EVENTS.claimTokens, { userEmail: email });
          this.analytics.trackEvent(ANALYTICS_EVENTS.walletCompleted, { userEmail: email });

          if (isNewUser) {
            this.analytics.trackEvent(ANALYTICS_EVENTS.accountCreated, { userEmail: email });
          }

          modal.close();
        } catch (error) {
          this.reporting.error(error);
        }
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
