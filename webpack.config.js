const merge = require('webpack-merge');
const baseConfig = require('./webpack.conf.base');
const devConfig = require('./webpack.conf.dev');
const prodConfig = require('./webpack.conf.prod');
const specificConfig = process.env.NODE_ENV == 'production' ? prodConfig : devConfig;

module.exports = merge(baseConfig, specificConfig);
