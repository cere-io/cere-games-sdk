import pkg from '../package.json';

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
  dev: {
    crown: 'https://assets.cms.freeport.dev.cere.network/crown_image_ceeef25fb4.png',
    animation: 'https://assets.cms.freeport.dev.cere.network/animation_640_lf88b7kr_aa5d097cd4.gif',
    star: 'https://assets.cms.freeport.dev.cere.network/star_cdb3ce1c3c.png',
    place: 'https://assets.cms.freeport.dev.cere.network/place_a538d5c597.png',
    chest: 'https://assets.cms.freeport.dev.cere.network/chest_860d09ca5a.png',
    mysteryBox: 'https://assets.cms.freeport.dev.cere.network/Mystery_Box_1_b57b8c650d.png',
    twitterBgUrl: 'https://assets.cms.freeport.dev.cere.network/Share_twitter_6_bg_6f4253090d.png',
  },
  stage: {
    crown: 'https://assets.cms.freeport.stg.cere.network/crown_image_7732ef35a7.png',
    animation: 'https://assets.cms.freeport.stg.cere.network/animation_640_lf88b7kr_bcdbdea5eb.gif',
    star: 'https://assets.cms.freeport.stg.cere.network/star_f5e42058e7.png',
    place: 'https://assets.cms.freeport.stg.cere.network/place_113b2a4bc2.png',
    chest: 'https://assets.cms.freeport.stg.cere.network/chest_55bda02818.png',
    mysteryBox: 'https://assets.cms.freeport.stg.cere.network/Mystery_Box_1_219b034096.png',
    twitterBgUrl: 'https://assets.cms.freeport.stg.cere.network/Share_twitter_6_bg_64f3f8d358.png',
  },
  prod: {
    crown: 'https://assets.cms.freeport.cere.network/crown_image_da8ff13498.png',
    animation: 'https://assets.cms.freeport.cere.network/animation_640_lf88b7kr_17efc8d01b.gif',
    star: 'https://assets.cms.freeport.cere.network/star_1465e776c3.png',
    place: 'https://assets.cms.freeport.cere.network/place_4df64adbdb.png',
    chest: 'https://assets.cms.freeport.cere.network/chest_187ff5db3c.png',
    mysteryBox: 'https://assets.cms.freeport.cere.network/Mystery_Box_1_8e30ff12f8.png',
    twitterBgUrl: 'https://assets.cms.freeport.cere.network/Share_twitter_6_bg_21223da12d.png',
  },
};
