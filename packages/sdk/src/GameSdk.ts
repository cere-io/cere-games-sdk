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
    const modal = UI.createModal(preloader);

    preloader.update({
      ready: false,
      onStartClick: modal.close,
    });

    modal.open();

    return {
      close: modal.close,
      setReady: (ready = true) => preloader.update({ ready }),

      get ready() {
        return preloader.props.ready ?? false;
      },
    };
  }
}
