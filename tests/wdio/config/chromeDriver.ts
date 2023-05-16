import { config as baseConfig } from './base';
import { options } from './options';

const chromeArgs = ['--window-size=1920,1080', '--disable-dev-shm-usage', '--no-sandbox', '--mute-audio'];

if (options.headless) {
  chromeArgs.push('--headless', '--disable-gpu');
}

export const chromeCapability = {
  browserName: 'chrome',
  acceptInsecureCerts: true,

  'goog:chromeOptions': {
    args: chromeArgs,
  },
};

export const config: WebdriverIO.Config = {
  ...baseConfig,

  services: ['chromedriver', ...baseConfig.services],

  capabilities: [chromeCapability],
};
