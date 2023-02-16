const { addPlugins, getLoader, loaderByName } = require('@craco/craco');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  webpack: {
    configure: (config) => {
      addPlugins(config, [new NodePolyfillPlugin()]);

      /**
       * Replace `resolve.plugins` to allow compiling packages outside of `src`
       */
      config.resolve.plugins = [new TsconfigPathsPlugin()];

      /**
       * Let Babel compile outside of `src`
       */
      const { match } = getLoader(config, loaderByName('babel-loader'));

      Object.assign(match.loader, {
        include: undefined,
        exclude: /node_modules/,
      });

      return config;
    },
  },
};
