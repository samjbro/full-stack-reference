const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')

module.exports = merge(base, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client'
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})