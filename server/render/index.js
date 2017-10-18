import express from 'express'
import webpack from 'webpack' // aliased to webpack-universal
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import cookieParser from 'cookie-parser'
import request from 'request'
import Aws from 'aws-sdk'
import S3Router from 'react-s3-uploader/s3router'
import debug from 'debug'
import dotenv from 'dotenv'

import clientConfig from '../../webpack/client.dev'
import serverConfig from '../../webpack/server.dev'
import clientConfigProd from '../../webpack/client.prod'
import serverConfigProd from '../../webpack/server.prod'

dotenv.config()
const log = debug('server')

const PORT = process.env.PORT_APP

const publicPath = clientConfig.output.publicPath
const outputPath = clientConfig.output.path
const DEV = process.env.NODE_ENV === 'development'

let isBuilt = false

Aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const app = express()

app.use(cookieParser())

app.use('/image', S3Router({
  bucket: process.env.S3_IMAGE_BUCKET,
  region: 'eu-central-1',
  signatureVersion: 'v4',
  headers: { 'Access-Control-Allow-Origin': '*' },
  ACL: 'public-read',
  uniquePrefix: true,
}))

const done = () => !isBuilt && app.listen(PORT, () => {
  isBuilt = true
  log(`BUILD COMPLETE -- Listening @ http://localhost:${PORT}`)
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
  app.listen(PORT, () =>
    // eslint-disable-next-line no-undef
    log('Essential React listening at http://%s:%s', host, PORT),
  )
}
