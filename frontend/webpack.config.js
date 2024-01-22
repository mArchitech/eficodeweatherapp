const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const GLOBALS = {
  'process.env.ENDPOINT': JSON.stringify(process.env.ENDPOINT || 'http://0.0.0.0:9000/api'),
};

module.exports = {
  mode: 'development',
  cache: true,
  devtool: 'eval-source-map',
  entry: {
    main: ['@babel/polyfill', path.join(__dirname, './src/index.jsx')],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules',
    ],
  },
  devServer: {
   static: {
    directory: path.resolve(__dirname, './src/public'),
	},
    historyApiFallback: true,
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 9000,
  },
  output: {
    filename: '[name].[hash:8].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, './src'),
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] }, modules: false }],
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
          ],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin({
	patterns: [
		{from: 'src/public', to: '.' },
	],
    }),
    new webpack.DefinePlugin(GLOBALS),
  ],
};
