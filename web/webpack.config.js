const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const SymlinkWebpackPlugin = require('symlink-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { version: sdkVersion } = require('@cere/games-sdk/package.json');

const buildDir = path.resolve(__dirname, '../build');
const examplesSourceDir = path.resolve(__dirname, 'examples');
const examplesDistDir = path.resolve(buildDir, 'examples');

const injectVars = (vars) => (content) =>
  Object.entries(vars).reduce((content, [name, value]) => {
    return content.replaceAll(`%${name}%`, value);
  }, content.toString());

const createSdkEntry = (version) => ({
  import: path.resolve(__dirname, 'sdk/index.ts'),
  filename: `sdk/${version}/bundle.umd.js`,
  library: { name: 'CereGamesSDK', type: 'umd' },
});

module.exports = ({ WEBPACK_BUILD }) => {
  return {
    mode: 'production',
    entry: {
      sdk: createSdkEntry(sdkVersion),
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
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/inline',
        },
        {
          test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
          type: 'asset/resource',
        },
      ],
    },

    plugins: [
      new Dotenv({
        path: path.resolve(__dirname, '../.env'),
      }),

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

      /**
       * Create `latest` SDK version symlink in `build` directory
       */

      new SymlinkWebpackPlugin({
        origin: `sdk/${sdkVersion}`,
        symlink: 'sdk/latest',
        force: true,
      }),
    ],

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },

    devServer: {
      port: 3000,
      client: false,
      hot: false,
      liveReload: false,

      /**
       * Configure `latest` SDK version for dev server
       */
      proxy: {
        '/sdk/latest': {
          target: 'http://localhost:3000/',
          pathRewrite: {
            '/sdk/latest': `/sdk/${sdkVersion}`,
          },
        },
      },

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
};
