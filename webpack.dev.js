const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: "bundle.js"
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src'
  }
});