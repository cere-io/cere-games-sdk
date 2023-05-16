import { config as baseConfig } from './base';
import { chromeCapability } from './chromeDriver';
import { options } from './options';

const services: WebdriverIO.Config['services'] = [...baseConfig.services];

if (options.startSelenoid) {
  services.push([
    'selenoid-standalone',
    {
      skipAutoPullImages: false,
      pathToBrowsersConfig: './browsers.json',
      selenoidArgs: ['-limit', '10'],
    },
  ]);
}

export const config: WebdriverIO.Config = {
  ...baseConfig,

  baseUrl: 'http://host.docker.internal:4567/examples/',
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub/',

  services,
  capabilities: [
    {
      ...chromeCapability,
      maxInstances: options.maxInstances,
    },
  ],
};
