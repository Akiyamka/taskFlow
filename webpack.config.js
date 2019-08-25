/* eslint-disable */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: __dirname + '/src/index.js',
    'service-worker': __dirname + '/src/service-worker.js',
  },
  output: {
    filename: '[name].js',
    globalObject: 'this',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: process.env.NODE_ENV === 'production'
    ? '/taskFlow/'
    : '/'
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
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'stylus-loader',
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          }
        ]
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CopyPlugin([
      { from: 'src/icon.png', to: '/' },
      { from: 'src/fonts', to: '/' },
      { from: 'src/manifest.json', to: '/' },
    ]),
  ],
};
