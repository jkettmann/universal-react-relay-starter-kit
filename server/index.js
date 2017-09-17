import express from 'express'
import webpack from 'webpack' // aliased to webpack-universal
import cookieParser from 'cookie-parser'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import path from 'path'
import request from 'request'
import debug from 'debug'
import dotenv from 'dotenv'

import clientConfig from '../webpack/client.dev'
import serverConfig from '../webpack/server.dev'
import clientConfigProd from '../webpack/client.prod'
import serverConfigProd from '../webpack/server.prod'

import intlMiddleware from './intlMiddleware'
import Database from './data/Database'
import createGraphQlServer from './graphql/server'

dotenv.config()
const log = debug('server')

const IMAGE_PORT = 9000
const PORT_GRAPHQL = process.env.PORT_GRAPHQL
const PORT_APP = process.env.PORT_APP

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const DEV = process.env.NODE_ENV === 'development'

let isBuilt = false

createGraphQlServer(PORT_GRAPHQL, new Database())

// __dirname is {projectRoot}/server, so we have to step one directory up
const pathBase = path.resolve(__dirname, '../')

const imageServer = express()
imageServer.use('/images', express.static(`${pathBase}/static/images`))

imageServer.listen(IMAGE_PORT)

const app = express()

app.use(cookieParser())
app.use(intlMiddleware)

app.use('/graphql', (req, res) => {
  req.pipe(request(`http://localhost:${PORT_GRAPHQL}/graphql`)).pipe(res)
})

app.get(/images\/.{1,}/i, (req, res) => {
  req
    .pipe(request(`http://localhost:${IMAGE_PORT}${req.originalUrl}`))
    .pipe(res)
})

const done = () => !isBuilt && app.listen(PORT_APP, () => {
  isBuilt = true
  log(`BUILD COMPLETE -- Listening @ http://localhost:${PORT_APP}`)
})

if (!process.env.PRODUCTION) {
  /** ***********************************************************
   *
   * Webpack Dev Middleware with hot reload
   *
   *************************************************************/

  const compiler = webpack([clientConfig, serverConfig])
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { colors: true } }

  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  compiler.plugin('done', done)
} else {
  /** ****************
   *
   * Express server for production
   *
   *****************/
  const port = process.env.PORT || 3000

  app.listen(port, () =>
    // eslint-disable-next-line no-undef
    log('Essential React listening at http://%s:%s', host, port),
  )
}
