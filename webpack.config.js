const _ = require('lodash'),
  argv = require('yargs').argv,
  webpackBaseConfig = require('./webpack.conf.base'),
  webpackDevConfig = require('./webpack.conf.dev'),
  webpackProdConfig = require('./webpack.conf.prod'),
  webpackEnvConfig = argv.env == 'production' ? webpackProdConfig : webpackDevConfig;

module.exports = _.mergeWith(
  webpackBaseConfig,
  webpackEnvConfig,
  (baseValue, envValue) => {
    if (_.isArray(baseValue)) return baseValue.concat(envValue);
  }
);
