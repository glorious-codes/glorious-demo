const webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  project = require('./project.json');

module.exports = {
  output: {
    filename: project.scripts.dist.filename.prod
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin(project.styles.dist.filename.prod)
  ]
}
