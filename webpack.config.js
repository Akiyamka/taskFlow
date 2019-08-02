/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    bundle: './src/index.js',
    'service-worker': './src/service-worker.js',
  },
  output: {
    path: path.join(__dirname, './build'),
    filename: '[name][hash].js',
    globalObject: 'self',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          'stylus-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      Controls: path.resolve(__dirname, 'src/components/controls/'),
      Views: path.resolve(__dirname, 'src/components/views/'),
    },
  },
  devServer: {
    historyApiFallback: true,
    // https: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin([
      { from: 'src/manifest.json', to: 'src' },
      { from: 'src/icon.png', to: 'src' },
      { from: 'src/fonts', to: 'src' },
    ]),
  ],
};
