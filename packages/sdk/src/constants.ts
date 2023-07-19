import pkg from '../package.json';

type EnvType = 'dev' | 'stage' | 'prod';

type StaticBaseUrlType = {
  [key in EnvType]: {
    crown: string;
    animation: string;
    star: string;
    place: string;
    chest: string;
    mysteryBox: string;
    twitterBgUrl: string;
  };
};

export const SDK_VERSION = pkg.version;

/**
 * Game session price in $CERE tokens
 */
export const GAME_SESSION_PRICE = 2;
export const NEW_WALLET_REWARD = 5;

export const GMT_ID = 'GTM-MSJX7Q6';
export const ANALYTICS_EVENTS = {
  walletCompleted: 'TORUS_WALLET_COMPLETED',
  highScoreTweet: 'HIGHSCORE_TWEET',
  clickPlayAgain: 'CLICK_PLAY_AGAIN_GAME',
  accountCreated: 'ACCOUNT_CREATED',
  startGame: 'CLICK_START_GAME',
  claimTokens: 'CLAIM_TOKENS_BTN',
  confirmTransaction: 'CONFIRM_TRANSACTION_BTN',
};

/**
 * The address where $CERE tokens are sent before playing a game again
 */
export const GAME_SESSION_DEPOSIT_ADDRESS = {
  dev: '0x7034f8346685a31C43508580cfa4A5e0a61bA7D9',
  stage: '0x7034f8346685a31C43508580cfa4A5e0a61bA7D9',
  prod: '0x64cA6DA624E56afA3C1Fa432371eCD9FCf4a83eb',
};

// export const GAME_SESSION_DEPOSIT_ADDRESS = {
//   dev: '5Fk5XD3mJRTGhNPEbBhtEGkK4v2r9uWV81KastzXfbuvrknF',
//   stage: '5Fk5XD3mJRTGhNPEbBhtEGkK4v2r9uWV81KastzXfbuvrknF',
//   prod: '5HEiqUDMDguZV1KwLzh3zhoogLY9wC15PyEeQbzCCG1y8RvY',
// };

export const GAME_PORTAL_URL = {
  dev: 'https://game.portal.dev.cere.network',
  stage: 'https://game.portal.stg.cere.network',
  prod: 'https://game.portal.cere.network',
};

export const GAME_SERVICE_URL = {
  dev: 'https://dev-freeport-gaming.network-dev.aws.cere.io',
  stage: 'https://stage-freeport-gaming.network-stage.aws.cere.io',
  prod: 'https://prod-freeport-gaming.network.aws.cere.io',
};

export const STATIC_BASE_URL = {
  dev: 'https://assets.cms.freeport.dev.cere.network',
  stage: 'https://assets.cms.freeport.stg.cere.network',
  prod: 'https://assets.cms.freeport.cere.network',
};

export const SDK_CDN_URL = {
  dev: `https://games-sdk.dev.cere.io/sdk/${SDK_VERSION}`,
  stage: `https://games-sdk.stage.cere.io/sdk/${SDK_VERSION}`,
  prod: `https://games-sdk.cere.io/sdk/${SDK_VERSION}`,
};

export const STATIC_ASSETS: StaticBaseUrlType = {
  dev: {
    crown: `${STATIC_BASE_URL.dev}/crown_image_ceeef25fb4.png`,
    animation: `${STATIC_BASE_URL.dev}/animation_640_lf88b7kr_aa5d097cd4.gif`,
    star: `${STATIC_BASE_URL.dev}/star_cdb3ce1c3c.png`,
    place: `${STATIC_BASE_URL.dev}/place_a538d5c597.png`,
    chest: `${STATIC_BASE_URL.dev}/chest_860d09ca5a.png`,
    mysteryBox: `${STATIC_BASE_URL.dev}/Mystery_Box_1_b57b8c650d.png`,
    twitterBgUrl: `${STATIC_BASE_URL.dev}/Share_twitter_6_bg_6f4253090d.png`,
  },

  stage: {
    crown: `${STATIC_BASE_URL.stage}/crown_image_7732ef35a7.png`,
    animation: `${STATIC_BASE_URL.stage}/animation_640_lf88b7kr_bcdbdea5eb.gif`,
    star: `${STATIC_BASE_URL.stage}/star_f5e42058e7.png`,
    place: `${STATIC_BASE_URL.stage}/place_113b2a4bc2.png`,
    chest: `${STATIC_BASE_URL.stage}/chest_55bda02818.png`,
    mysteryBox: `${STATIC_BASE_URL.stage}/Mystery_Box_1_219b034096.png`,
    twitterBgUrl: `${STATIC_BASE_URL.stage}/Share_twitter_6_bg_64f3f8d358.png`,
  },

  prod: {
    crown: `${STATIC_BASE_URL.prod}/crown_image_da8ff13498.png`,
    animation: `${STATIC_BASE_URL.prod}/animation_640_lf88b7kr_17efc8d01b.gif`,
    star: `${STATIC_BASE_URL.prod}/star_1465e776c3.png`,
    place: `${STATIC_BASE_URL.prod}/place_4df64adbdb.png`,
    chest: `${STATIC_BASE_URL.prod}/chest_187ff5db3c.png`,
    mysteryBox: `${STATIC_BASE_URL.prod}/Mystery_Box_1_8e30ff12f8.png`,
    twitterBgUrl: `${STATIC_BASE_URL.prod}/Share_twitter_6_bg_21223da12d.png`,
  },
};
