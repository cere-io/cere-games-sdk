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
  dev: '5Fk5XD3mJRTGhNPEbBhtEGkK4v2r9uWV81KastzXfbuvrknF',
  stage: '5Fk5XD3mJRTGhNPEbBhtEGkK4v2r9uWV81KastzXfbuvrknF',
  prod: '5HEiqUDMDguZV1KwLzh3zhoogLY9wC15PyEeQbzCCG1y8RvY',
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
