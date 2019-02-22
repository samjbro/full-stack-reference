import express from 'express'
import webpack from 'webpack'
import devMiddleware from 'webpack-dev-middleware'
import hotMiddleware from 'webpack-hot-middleware'

import webpackConfig from './build/webpack.dev.config.js'

const app = express()
const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath
}))
app.use(hotMiddleware(compiler))

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Client dev server listening on port ${PORT}`)
})