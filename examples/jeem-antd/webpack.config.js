const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const modeConfig = env => require(`./build/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: 'development', presets: [] }) => webpackMerge(
  {
    mode,
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    resolve: {
      alias: {
        '@': path.join(__dirname, '.', 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /\.(less)$/,
          exclude: /node_modules/,
          use: [{
            loader: mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
              importLoaders: 1,
            },
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          }],
        },
        {
          test: /\.(less)$/,
          exclude: /src/,
          use: [{
            loader: mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          }, {
            loader: 'css-loader', // translates CSS into CommonJS
          }, {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          }],
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name]-[hash:5].min.[ext]',
                useRelativePath: true,
                limit: 20000,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.ProgressPlugin(),
      new MiniCssExtractPlugin(),
    ],
  },
  modeConfig(mode),
);
