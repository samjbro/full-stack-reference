const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

const resolve = file => path.resolve(__dirname, '..', file)

module.exports = {
  resolve: {
    extensions: ['.mjs', '.js', '.vue'],
    alias: {
      'img': resolve('./images'),
      '#': resolve('./styles'),
      '@': resolve('./src')
    }
  },
  entry: [
    '@babel/polyfill',
    resolve('./src/index.js')
  ],
  output: {},
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['vue-style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({
      filename: 'index.html',
      template: './build/index.template.html',
      inject: true
    })
  ]
}