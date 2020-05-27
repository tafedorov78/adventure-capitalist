const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  context: path.resolve(__dirname, 'src'),
  devServer: {
    port: 3000,
    host: '0.0.0.0'
  },
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.ts'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [
      '.js', '.ts', '.json', '.png', '.jpg', '.svg','.css'
    ],
    alias:{
      '@': path.resolve(__dirname, './'),
      '@signals': path.resolve(__dirname, 'src/signals/'),
      '@config': path.resolve(__dirname, 'src/config/'),
      '@base': path.resolve(__dirname, 'src/components/base/'),
      '@utils': path.resolve(__dirname, 'src/utils/')
    }
  },
  optimization: {
    splitChunks:{
      chunks: 'all'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin ({
      title: 'Adventure Capitalist',
      template: './index.html'
    }),
    new CopyWebpackPlugin([
        {
        from: './assets/final/',
        to: 'assets'
      },
      {
        from: './buttons.module.css',
        to: './'
      }
      ])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|fnt|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      { test: /\.(js|ts)$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }

      }
    ]
  }
}