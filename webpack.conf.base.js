const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const project = require('./project.json');

module.exports = {
  entry: `${__dirname}/${project.scripts.source.entry}`,
  output: {
    library: 'GDemo',
    libraryTarget: 'umd',
    libraryExport: 'default',
    path: `${__dirname}/${project.scripts.dist.root}`
  },
  module: {
    rules: [{
      test: /\.(styl|css)$/,
      use: [ MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader' ]
    }, {
      test: /\.html$/,
      include: [path.resolve(__dirname,project.scripts.source.root)],
      use: 'html-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  resolve: {
    alias: {
      '@styles': `${__dirname}/${project.styles.source.root}`
    }
  }
};
