import { GamesSDK as BaseGameSDK, SdkOptions, SDK_VERSION } from '@cere/games-sdk';

declare global {
  const __webpack_public_path__: string;
}

/**
 * Environment scoped version of GamesSDK
 */
export class GamesSDK extends BaseGameSDK {
  constructor(options: SdkOptions) {
    super({
      env: process.env.SDK_ENV as any,

      ...options,
    });

    if (__webpack_public_path__) {
      this.ui.config.sdkUrl = new URL(__webpack_public_path__).href + `sdk/${SDK_VERSION}`;
    }
  }
}

export * from '@cere/games-sdk';
