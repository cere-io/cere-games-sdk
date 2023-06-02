const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { version: sdkVersion } = require('@cere/games-sdk/package.json');

const buildDir = path.resolve(__dirname, '../build');
const examplesSourceDir = path.resolve(__dirname, 'examples');
const examplesDistDir = path.resolve(buildDir, 'examples');

const injectVars = (vars) => (content) =>
  Object.entries(vars).reduce((content, [name, value]) => {
    return content.replaceAll(`%${name}%`, value);
  }, content.toString());

module.exports = {
  mode: 'production',
  entry: {
    sdk: {
      import: path.resolve(__dirname, 'sdk/index.ts'),
      filename: `sdk/${sdkVersion}/bundle.umd.js`,
      library: { name: 'CereGamesSDK', type: 'umd' },
    },
  },

  output: {
    clean: true,
    path: buildDir,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.png/,
        type: 'asset/inline',
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: examplesSourceDir,
          from: '**/*',
          to: examplesDistDir,
        },
        {
          context: examplesSourceDir,
          from: '**/*.html',
          to: examplesDistDir,
          transform: injectVars({
            BUILD_TIME: new Date().getTime(),
          }),
        },
      ],
    }),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },

  devServer: {
    client: false,
    hot: false,
    liveReload: false,
    devMiddleware: {
      index: false,
      writeToDisk: true,
    },

    static: {
      directory: examplesDistDir,
      publicPath: '/examples',
    },
  },
};
