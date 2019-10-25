const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const project = require('./project.json');

module.exports = {
  mode: 'production',
  output: {
    filename: project.scripts.dist.filename.prod
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true,
          compress: {
            warnings: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: project.styles.dist.filename.prod
    })
  ]
}
