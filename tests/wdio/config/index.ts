import { options } from './options';

const variants: Record<typeof options.variant, WebdriverIO.Config> = {
  chrome: require('./chromeDriver').config,
  selenium: require('./selenium').config,
};

export const config = variants[options.variant || 'chrome'];
