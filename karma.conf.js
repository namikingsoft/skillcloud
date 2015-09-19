module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'bower_components/power-assert/build/power-assert.js',
      'spec/**/*Spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'spec/**/*Spec.js': ['webpack', 'sourcemap']
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    webpack: {
      module: {
        loaders: [
          {
            test: /Spec\.js$/,
            loaders: ['babel'],
            exclude: /(node_modules|bower_components)/,
          },
        ],
      },
    },
  });
};
