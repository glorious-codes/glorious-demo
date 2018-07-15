const webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  project = require('./project.json');

module.exports = {
  devtool: 'eval',
  output: {
    filename: project.scripts.dist.filename.dev
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin(project.styles.dist.filename.dev)
  ]
}
