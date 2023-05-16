const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const buildDir = path.resolve(__dirname, '../build');
const publicDir = path.resolve(__dirname, 'public');

module.exports = {
  mode: 'production',
  entry: {
    sdk: {
      import: '@cere/games-sdk',
      filename: 'sdk/bundle.js',
      library: { name: 'CereGamesSDK', type: 'umd' },
    },
  },

  output: {
    clean: true,
    path: path.resolve(buildDir, 'examples'),
  },

  plugins: [
    new CopyPlugin({
      patterns: [{ from: publicDir }],
    }),
  ],

  devServer: {
    client: {
      overlay: false,
    },
  },
};
