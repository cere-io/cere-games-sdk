import { config as baseConfig } from './base';
import { chromeCapability } from './chromeDriver';
import { options } from './options';

export const config: WebdriverIO.Config = {
  ...baseConfig,

  baseUrl: 'http://172.17.0.1:4567/examples/',
  hostname: 'localhost',
  port: 4444,
  path: '/wd/hub/',

  capabilities: [
    {
      ...chromeCapability,
      maxInstances: options.maxInstances,
    },
  ],
};
