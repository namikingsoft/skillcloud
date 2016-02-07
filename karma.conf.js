module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'spec/**/*Spec.*',
    ],
    exclude: [
    ],
    preprocessors: {
      'spec/**/*Spec.*': ['webpack', 'sourcemap']
    },
    //reporters: ['mocha'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    webpack: {
      devtool: 'inline-source-map',
      module: {
        loaders: [
          {
            test: /.jsx?$/,
            loaders: ['babel'],
            exclude: /(node_modules|bower_components)/,
          },
          {
            test: /\.tsx?$/,
            loaders: ['babel', 'ts'],
            exclude: /(node_modules|bower_components)/,
          },
          {
            test: /.coffee$/,
            loaders: ['babel', 'coffee'],
            exclude: /(node_modules|bower_components)/,
          },
          { test: /\.ya?ml/, loader: 'json!yaml' },
          { test: /\.png$/, loader: 'url?minetype=image/png' },
        ],
      },
      resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
        modulesDirectories: ['src', 'node_modules', 'bower_components'],
      },
      webpackMiddleware: {
        noInfo: true
      },
    },
  });
};
