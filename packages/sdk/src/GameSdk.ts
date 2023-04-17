import { BN, EmbedWallet, WalletAccount, WalletBalance, WalletStatus } from '@cere/embed-wallet';
import * as UI from '@cere/games-sdk-ui';

import {
  ANALYTICS_EVENTS,
  STATIC_BASE_URL,
  GAME_PORTAL_URL,
  GAME_SERVICE_URL,
  GAME_SESSION_DEPOSIT_ADDRESS,
  GAME_SESSION_PRICE,
  GMT_ID,
  NEW_WALLET_REWARD,
  SDK_VERSION,
} from './constants';
import { GamesApi, Session, SessionEvent } from './api';
import { Analytics } from './Analytics';
import { Reporting, ReportingOptions } from './Reporting';

type AsyncResult<T = void> = Promise<T> | T;

type ShowLeaderboardOptions = {
  onPlayAgain?: () => AsyncResult;
  onBeforeLoad?: () => AsyncResult;
  onTweet?: () => AsyncResult;
};

type ShowPreloaderOptions = {
  onStart?: () => AsyncResult;
};

type ShowConnectWalletOptions = {
  onConnect?: (accounts: WalletAccount[], isNew: boolean) => AsyncResult;
  onComplete?: () => AsyncResult;
  score?: number;
};

export type GameInfo = {
  name?: string;
  url?: string;
  logoUrl?: string;
  tags?: string;
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
  private session?: Session;
  private sessionEvents: Required<SessionEvent>[] = [];

  private readonly reporting = new Reporting({ env: this.env, ...this.options.reporting });
  private readonly analytics = new Analytics();

  private readonly ui = UI.createContext({
    reporting: this.reporting,

    config: {
      newWalletReward: NEW_WALLET_REWARD,
      sessionPrice: GAME_SESSION_PRICE,
      gamePortalUrl: GAME_PORTAL_URL[this.env],
      staticBaseUrl: STATIC_BASE_URL['stage'],
    },
  });

  private walletPromise?: Promise<EmbedWallet>; // TODO: Move `isReady` promise to the wallet itself
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

    this.wallet.subscribe('accounts-update', ([ethAccount]: WalletAccount[]) => {
      this.ui.wallet.address = ethAccount?.address;
    });

    this.wallet.subscribe('balance-update', ({ balance, decimals, type, token }: WalletBalance) => {
      if (type === 'erc20' && token === 'CERE') {
        this.ui.wallet.balance = balanceToFloat(balance, decimals, 2);
      }
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
    this.ui.gameInfo = { name: gameInfo.name, tags: gameInfo.tags };

    this.analytics.init({ gtmId: GMT_ID });
    this.walletPromise = this.initWallet(gameInfo);

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

    if (this.wallet.status !== 'connected') {
      return this.wallet;
    }

    const [ethAccount] = await this.wallet.getAccounts();

    /**
     * Save eth account address to UI context
     *
     * TODO: Fix `accounts-update` event speed on the Wallet side so we don't have to manually set addres here
     */
    this.ui.wallet.address = ethAccount?.address;

    return this.wallet;
  }

  private async payForSession() {
    const [ethAccount, cereAccount] = await this.wallet.getAccounts();

    const txHash = await this.wallet.transfer({
      token: 'CERE',
      type: 'erc20',
      to: GAME_SESSION_DEPOSIT_ADDRESS[this.env],
      amount: GAME_SESSION_PRICE,
    });

    if (txHash) {
      this.analytics.trackEvent(ANALYTICS_EVENTS.confirmTransaction, { userEmail: ethAccount.name });
    }

    await this.api.saveSessionTX(txHash, [ethAccount.address, cereAccount.address]);
  }

  private async startSession() {
    this.session = await this.api.startSession();
    this.sessionEvents = [];

    return this.session;
  }

  private async saveSession() {
    const [ethAccount] = await this.wallet.getAccounts();

    try {
      await this.api.saveSessionEvents(ethAccount.address, this.sessionEvents);
    } catch (error) {
      this.reporting.error(error);
    }
  }

  private addSessionEvent(event: SessionEvent) {
    this.sessionEvents.push({ timestamp: Date.now(), ...event });
  }

  showPreloader({ onStart }: ShowPreloaderOptions = {}) {
    const preloader = document.createElement('cere-preloader');
    const { open, ...modal } = UI.createModal(preloader);

    preloader.update({
      ready: false,
      onStartClick: async () => {
        this.startSession(); // Create and store game session in background

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
          gameInfo: this.ui.gameInfo,
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
          serviceUrl: GAME_SERVICE_URL[this.env],
        });

        return leaderboard;
      },
      { isLeaderBoard: true },
    );

    open();

    return modal;
  }

  async showConnectWallet({ onConnect, onComplete, score }: ShowConnectWalletOptions = {}) {
    const connectWallet = document.createElement('cere-connect-wallet');
    const { open, ...modal } = UI.createFullscreenModal(connectWallet, { hasClose: true });

    connectWallet.update({
      score,
      onConnect: async () => {
        try {
          await this.wallet.connect();

          const [{ email, isNewUser }, accounts] = await Promise.all([
            this.wallet.getUserInfo(),
            this.wallet.getAccounts(),
          ]);

          this.ui.wallet.isNewUser = isNewUser;

          /**
           * Save eth account address to UI context
           *
           * TODO: Fix `accounts-update` event speed on the Wallet side so we don't have to manually set addres here
           */
          this.ui.wallet.address = accounts[0].address;

          await onConnect?.(accounts, isNewUser);

          this.analytics.trackEvent(ANALYTICS_EVENTS.claimTokens, { userEmail: email });
          this.analytics.trackEvent(ANALYTICS_EVENTS.walletCompleted, { userEmail: email });

          if (isNewUser) {
            this.analytics.trackEvent(ANALYTICS_EVENTS.accountCreated, { userEmail: email });
          }

          modal.close();

          await onComplete?.();
        } catch (error) {
          this.reporting.error(error);
        }
      },
    });

    open();

    return modal;
  }

  async saveScore(score: number) {
    this.addSessionEvent({
      eventType: 'SCORE_EARNED',
      payload: {
        value: score,
      },
    });

    const save = async () => {
      if (!this.session) {
        this.reporting.message(`Attempt to save score without sessionId`);

        return;
      }

      const [ethAddress] = await this.wallet.getAccounts();

      await this.saveSession();
      await this.api.saveScore(ethAddress.address, score, this.session);
    };

    /**
     * Wait for wallet to be fully intialized
     */
    await this.walletPromise;

    if (this.wallet.status === 'connected') {
      return save();
    }

    await new Promise<void>((resolve) =>
      this.showConnectWallet({
        score,
        onConnect: save,
        onComplete: resolve,
      }),
    );
  }
}
