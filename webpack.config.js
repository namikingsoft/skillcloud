var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var glob = require("glob");

module.exports = {
  devtool: 'source-map',
  entry: {
    app: "./src/main.js",
    spec: glob.sync("./spec/**/*Spec.js"),
  },
  output: {
    filename: '[name].js',
    path: "./build",
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /Spec\.js$/,
        loaders: ['mocha', 'babel'],
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.styl$/,
        loaders: ['style', 'css', 'stylus'],
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src', 'web_modules', 'node_modules'],
  },
  devServer: {
    contentBase: "./build",
    port: 8080,
    hot: true,
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BowerWebpackPlugin(),
  ],
};
