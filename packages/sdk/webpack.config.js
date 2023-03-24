const path = require('path');

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
        use: [
          {
            loader: 'ts-loader',
            options: { configFile: 'tsconfig.build.json' },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
