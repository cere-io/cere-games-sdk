/**
 * Game session price in $CERE tokens
 */
export const GAME_SESSION_PRICE = 2;
export const NEW_WALLET_REWARD = 5;

export const GMT_ID = 'GTM-MSJX7Q6';
export const ANALYTICS_EVENTS = {
  walletCompleted: 'TORUS_WALLET_COMPLETED',
};

/**
 * The addres where $CERE tokens are sent before playing a game again
 *
 * Current addresses are a fake and can be accessed using Cere Wallet by this email: game-session-bank@cere.io
 * TODO: Use real addresses
 */
export const GAME_SESSION_DEPOSIT_ADDRESS = {
  dev: '5GXnxWDnXdoH7iW6hGsq5vCvDFsDk2f3uXfQHxZwmnYikjLK',
  stage: '5GXnxWDnXdoH7iW6hGsq5vCvDFsDk2f3uXfQHxZwmnYikjLK',
  prod: '5GXnxWDnXdoH7iW6hGsq5vCvDFsDk2f3uXfQHxZwmnYikjLK',
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
