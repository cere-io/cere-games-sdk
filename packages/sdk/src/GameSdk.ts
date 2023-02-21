import * as UI from '@cere/games-sdk-ui';

export type SdkOptions = {
  onReady?: (sdk: GamesSDK) => void;
};

export type InitParams = {};

export class GamesSDK {
  constructor(private options: SdkOptions = {}) {}

  async init(params: InitParams = {}) {
    await UI.register();

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
    const { open, ...modal } = UI.createModal(leaderboard);

    open();

    return modal;
  }

  connectWallet() {
    const leaderboard = document.createElement('cere-connect-wallet');
    const { open, ...modal } = UI.createModal(leaderboard);

    open();

    return modal;
  }
}
