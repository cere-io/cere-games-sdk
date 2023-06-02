import { GamesSDK as BaseGameSDK, SdkOptions } from '@cere/games-sdk';

/**
 * Environment scoped version of GamesSDK
 */
export class GamesSDK extends BaseGameSDK {
  constructor(options: SdkOptions) {
    super({
      env: process.env.SDK_ENV as any,

      ...options,
    });
  }
}

export * from '@cere/games-sdk';
