import express from 'express'
import webpack from 'webpack' // aliased to webpack-universal
import cookieParser from 'cookie-parser'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import path from 'path'
import request from 'request'
import Aws from 'aws-sdk'
import S3Router from 'react-s3-uploader/s3router'
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

Aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const app = express()

app.use('/upload/image', S3Router({
  bucket: process.env.S3_IMAGE_BUCKET,
  region: 'eu-central-1',
  signatureVersion: 'v4',
  headers: { 'Access-Control-Allow-Origin': '*' },
  ACL: 'public-read',
  uniquePrefix: true,
}))

app.use(cookieParser())
app.use(intlMiddleware)

app.use('/graphql', (req, res) => {
  req.pipe(request(`http://localhost:${PORT_GRAPHQL}/graphql`)).pipe(res)
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
