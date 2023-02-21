const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: { name: 'CereGamesSdkUI', type: 'umd' },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.png/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
