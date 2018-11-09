const ExtractTextPlugin = require('extract-text-webpack-plugin'),
  project = require('./project.json');

module.exports = {
  entry: `${__dirname}/${project.scripts.source.entry}`,
  output: {
    library: 'GDemo',
    libraryTarget: 'umd',
    path: `${__dirname}/${project.scripts.dist.root}`
  },
  module: {
    rules: [{
      test: /\.(styl|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {loader: 'css-loader', options: {minimize: true}},
          'stylus-loader'
        ]
      })
    }, {
      test: /\.html$/,
      include: [`${__dirname}/${project.scripts.source.root}`],
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
