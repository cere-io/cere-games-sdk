const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
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
        use: [{ loader: 'ts-loader' }],
      },
      {
        test: /\.png/,
        type: 'asset/inline',
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
};
