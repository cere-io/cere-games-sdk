export type SdkOptions = {
  onReady?: (sdk: GamesSDK) => void;
};

export type InitParams = {};

export class GamesSDK {
  constructor(private options: SdkOptions = {}) {}

  async init(params: InitParams = {}) {
    const { register } = await import('@cere/games-sdk-ui');

    register();

    this.options.onReady?.(this);
  }

  async showPreloader() {
    const modal = document.createElement('cere-modal');
    const preloader = document.createElement('cere-preloader').withProps({
      ready: false,
      onStartClick: () => modal.remove(),
    });

    modal.appendChild(preloader);
    document.body.appendChild(modal);

    return {
      get ready() {
        return preloader.props.ready ?? false;
      },

      setReady: (ready = true) => preloader.update({ ready }),
      close: () => modal.remove(),
    };
  }
}
