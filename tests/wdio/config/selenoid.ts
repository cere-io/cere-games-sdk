import { config as baseConfig } from './base';
import { chromeCapability } from './chromeDriver';
import { options } from './options';

export const config: WebdriverIO.Config = {
  ...baseConfig,

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
