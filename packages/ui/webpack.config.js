const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.umd.js',
    library: { name: 'CereGamesSdkUI', type: 'umd' },
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
      {
        test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        type: 'asset/source',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.png'],
  },
};
