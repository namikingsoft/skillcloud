var webpack = require('webpack');
var BowerWebpackPlugin = require("bower-webpack-plugin");
var glob = require("glob");

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    app: "./src/app.js",
    style: "./src/style.js",
    spec: glob.sync("./spec/**/*Spec.js"),
  },
  output: {
    filename: '[name].js',
    path: "./dest",
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
      { test: /\.styl$/, loader: 'style!css!stylus' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.ya?ml/, loader: 'json!yaml' },
      { test: /\.jpg$/, loader: 'url?minetype=image/jpeg' },
      { test: /\.svg/, loader: 'url?minetype=image/svg+xml' },
      { test: /\.ttf/, loader: 'url?minetype=application/octet-stream' },
      { test: /\.woff/, loader: 'url?minetype=application/font-woff' },
      { test: /\.eot/, loader: 'url?minetype=application/vnd.ms-fontobject' },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['src', 'node_modules', 'bower_components'],
  },
  devServer: {
    contentBase: "./dest",
    port: 1234,
    hot: true,
    inline: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new BowerWebpackPlugin(),
  ],
};
