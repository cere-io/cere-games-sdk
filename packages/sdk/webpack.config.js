const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ WEBPACK_BUILD: isBuild }) => {
  const tsConfigFile = isBuild ? 'tsconfig.build.json' : 'tsconfig.json';

  return {
    mode: 'production',
    entry: './src/index.ts',

    output: {
      clean: true,
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.umd.js',
      library: { name: 'CereGamesSDK', type: 'umd' },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: tsConfigFile,
              },
            },
          ],
        },
        {
          test: /\.png/,
          type: 'asset/inline',
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: tsConfigFile,
        }),
      ],
    },

    devServer: {
      hot: false,
      liveReload: false,
      static: false,
      client: false,
    },
  };
};
