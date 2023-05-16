const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const buildDir = path.resolve(__dirname, '../build');
const publicDir = path.resolve(__dirname, 'public');

const injectVars = (vars) => (content) =>
  Object.entries(vars).reduce((content, [name, value]) => {
    return content.replaceAll(`%${name}%`, value);
  }, content.toString());

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
      patterns: [
        { context: publicDir, from: '**/*' },
        {
          context: publicDir,
          from: '**/*.html',
          transform: injectVars({
            BUILD_TIME: new Date().getTime(),
          }),
        },
      ],
    }),
  ],

  devServer: {
    client: false,
    hot: false,
    liveReload: false,
  },
};
