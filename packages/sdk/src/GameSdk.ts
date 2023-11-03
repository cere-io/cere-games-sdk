import { BN, EmbedWallet, WalletAccount, WalletBalance, WalletStatus, WALLET_CLIENT_VERSION } from '@cere/embed-wallet';
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
  STATIC_ASSETS,
  SDK_CDN_URL,
} from './constants';
import { GamesApi, LeaderBoard, Session, SessionEvent } from './api';
import { Analytics } from './Analytics';
import { Reporting, ReportingOptions } from './Reporting';

type AsyncResult<T = void> = Promise<T> | T;

type ShowLeaderboardOptions = {
  onPlayAgain?: (close: () => void) => AsyncResult;
  onBeforeLoad?: () => AsyncResult;
  withTopWidget?: boolean;
  onShowSignUp?: () => void;
  currentScore?: number;
} & ConnectWalletOptions;

type ShowPreloaderOptions = {
  onStart?: () => AsyncResult;
  onPlayAgain?: () => AsyncResult;
};

type ConnectWalletOptions = Pick<EarnScreenOptions, 'onConnect' | 'onComplete'>;

type EarnScreenOptions = {
  onConnect?: (accounts: WalletAccount[], isNew: boolean) => AsyncResult;
  onComplete?: () => AsyncResult;
  score?: number;
  onShowLeaderboard?: () => void;
  onShowWallet?: () => void;
};

export type GameInfo = {
  name?: string;
  url?: string;
  logoUrl?: string;
  tags?: string[];
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

type LocationData = {
  latitude: number;
  longitude: number;
};

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

  protected readonly ui = UI.createContext({
    reporting: this.reporting,

    config: {
      newWalletReward: NEW_WALLET_REWARD,
      sessionPrice: GAME_SESSION_PRICE,
      gamePortalUrl: GAME_PORTAL_URL[this.env],
      staticBaseUrl: STATIC_BASE_URL[this.env],
      staticAssets: STATIC_ASSETS[this.env],
      sdkUrl: SDK_CDN_URL[this.env],
    },
  });

  readonly wallet = new EmbedWallet({
    env: this.env,
    appId: this.options.gameId,
    clientVersion: `${WALLET_CLIENT_VERSION}+${SDK_VERSION}`, // Semver with metadata to burst wallet IFRAME cache
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

  private async initGameInfo({ gameInfo }: InitParams = {}) {
    const baseInfo: GameInfo = {
      name: document.title,
      url: window.location.href,

      ...this.options.gameInfo,
      ...gameInfo,
    };

    Object.assign(this.ui.gameInfo, {
      loading: true,
      ...baseInfo,
    });

    this.api.getGameInfoData().then((data) =>
      Object.assign(this.ui.gameInfo, baseInfo, {
        loading: false,
        preloader: {
          title: data.preloaderTitle,
          url: data.preloaderPath,
          description: data.preloaderDescription,
        },
      }),
    );

    return baseInfo;
  }

  async init(options: InitParams = {}) {
    this.reporting.init();

    await UI.register(this.ui);

    this.analytics.init({ gtmId: GMT_ID });

    this.initGameInfo(options).then((gameInfo) => {
      this.initWallet(gameInfo);
    });

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

  showPreloader({ onStart, onPlayAgain }: ShowPreloaderOptions = {}) {
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
      navigateLeaderBoardWidget: () => {
        modal.close();
        this.showLeaderboard({
          onPlayAgain: async (close?: () => void) => {
            this.startSession(); // Create and store game session in background
            await onPlayAgain?.();
            close?.();
          },
        });
      },
    });

    open();

    return {
      ...modal,
      setReady: (ready = true) => preloader.update({ ready }),
    };
  }

  async connectWallet({ onConnect, onComplete }: ConnectWalletOptions) {
    try {
      await this.wallet.connect();
      const [{ email, isNewUser }, accounts] = await Promise.all([
        this.wallet.getUserInfo(),
        this.wallet.getAccounts(),
      ]);

      this.ui.wallet.isNewUser = isNewUser;
      if (this.ui.wallet.address) {
        const gameInfo = {
          address: this.ui.wallet.address,
          name: this.ui.gameInfo.name,
        };
        localStorage.setItem(`game-info-${this.ui.gameInfo.name}`, JSON.stringify(gameInfo));
      }

      await onConnect?.(accounts, isNewUser);

      this.analytics.trackEvent(ANALYTICS_EVENTS.claimTokens, { userEmail: email });
      this.analytics.trackEvent(ANALYTICS_EVENTS.walletCompleted, { userEmail: email });

      if (isNewUser) {
        this.analytics.trackEvent(ANALYTICS_EVENTS.accountCreated, { userEmail: email });
      }
      await onComplete?.();
    } catch (error) {
      this.reporting.error(error);
    }
  }

  showSignUp({ onConnect, onComplete }: ConnectWalletOptions) {
    const signUp = document.createElement('cere-signup');
    const { open, ...modal } = UI.createModal(signUp, { hasClose: false });

    signUp.update({
      onConnect: async () => {
        try {
          modal.close();
          await this.connectWallet({ onConnect, onComplete });
        } catch (error) {
          this.reporting.error(error);
        }
      },
    });

    return {
      open,
    };
  }

  showInsertCoin() {
    const { open } = UI.createModal(
      async () => {
        const insertCoin = document.createElement('cere-insert-coin');
        let data;
        try {
          data = await this.api.getLeaderboard();
        } catch (e) {
          this.reporting.error(e);
        }

        insertCoin.update({
          data: data,
          topUpBalance: () => this.wallet.showWallet('topup'),
        });
        return insertCoin;
      },
      { hasClose: false },
    );

    return {
      open,
    };
  }

  showLeaderboard({
    onPlayAgain,
    onBeforeLoad,
    withTopWidget,
    onComplete,
    onConnect,
    currentScore,
  }: ShowLeaderboardOptions = {}) {
    const { open, ...modal } = UI.createFullscreenModal(
      async () => {
        const leaderboard = document.createElement('cere-leaderboard');

        const [ethAddress] = await this.wallet.getAccounts();

        await onBeforeLoad?.();

        let geolocation: LocationData | undefined;
        if (ethAddress) {
          geolocation = await this.getLocation();
        }

        if (geolocation?.latitude && geolocation.longitude) {
          this.ui.gameInfo.geolocationAllowed = true;
        }
        const data = await this.api.getLeaderboard();
        const activeTournament = await this.api.getActiveTournamentData();

        let ownResults: LeaderBoard = [];
        let geoResults:
          | {
              geoTitle: string;
              result: {
                rank: number;
                address: string;
                score: number;
              }[];
            }
          | undefined = undefined;

        if (ethAddress) {
          ownResults = await this.api.getLeaderboardByWallet(ethAddress.address);
          geoResults = geolocation
            ? await this.api.getLeaderboardByGeo(geolocation.longitude, geolocation.latitude)
            : undefined;
        }

        leaderboard.update({
          activeTournament,
          data,
          ownResults,
          geoResults,
          withTopWidget: true,
          onPlayAgain: async () => {
            const { balance, address } = this.ui.wallet;
            if (address) {
              if (balance && balance > this.ui.config.sessionPrice) {
                const { email } = await this.wallet.getUserInfo();
                this.analytics.trackEvent(ANALYTICS_EVENTS.clickPlayAgain, { userEmail: email });
                await this.payForSession();
                await onPlayAgain?.(modal.close);
                modal.close();
              } else {
                const { open } = this.showInsertCoin();
                open();
                modal.close();
              }
            } else {
              modal.close();
              this.analytics.trackEvent(ANALYTICS_EVENTS.signUp);
              await this.connectWallet({ onComplete, onConnect });
            }
          },
          onShowSignUp: () => {
            const { open } = this.showSignUp({ onComplete, onConnect });
            open();
            modal.close();
          },
          serviceUrl: GAME_SERVICE_URL[this.env],
          currentScore: currentScore,
        });

        return leaderboard;
      },
      { isLeaderBoard: true, withTopWidget },
    );

    open();

    return modal;
  }

  async earnScreen({ onConnect, onComplete, score }: EarnScreenOptions = {}) {
    const earnScreenModal = document.createElement('cere-earn-screen');
    const { open, ...modal } = UI.createModal(earnScreenModal, { hasClose: false });

    earnScreenModal.update({
      onShowWallet: async () => {
        try {
          modal.close();
          await this.connectWallet({ onConnect, onComplete });
        } catch (error) {
          this.reporting.error(error);
        }
      },
    });

    open();

    return { modal, onConnect };
  }

  async saveScore(score: number) {
    const location = await this.getLocation();
    this.addSessionEvent({
      eventType: 'SCORE_EARNED',
      payload: {
        value: {
          score,
          ...(location !== undefined && location),
        },
      },
    });

    const save = async () => {
      const [ethAddress] = await this.wallet.getAccounts();
      const { email } = await this.wallet.getUserInfo();

      if (!this.session) {
        this.reporting.message(`Attempt to save score without sessionId`);

        return;
      }

      await this.saveSession();
      await this.api.saveScore(ethAddress.address, score, email, this.session, location?.latitude, location?.longitude);
    };

    /**
     * Wait for wallet to be fully intialized
     */
    await this.wallet.isReady;

    if (this.wallet.status === 'connected') {
      return save();
    }

    await new Promise<void>((resolve) =>
      this.showLeaderboard({
        onConnect: save,
        onComplete: resolve,
        currentScore: score,
      }),
    );
  }

  async getLocation(): Promise<LocationData | undefined> {
    if (navigator.geolocation) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        return { latitude, longitude };
      } catch (error) {
        console.error('Error getting location:', error);
        return undefined;
      }
    } else {
      console.error('Geolocation is not supported by this browser.');
      return undefined;
    }
  }
}
