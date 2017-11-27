import express from 'express'
import webpack from 'webpack'
import noFavicon from 'express-no-favicons'
import helmet from 'helmet'
import compression from 'compression'
import Aws from 'aws-sdk'
import S3Router from 'react-s3-uploader/s3router'
import dotenv from 'dotenv'
import debug from 'debug'

dotenv.config()
const log = debug('server:setup')
const DEV = process.env.NODE_ENV === 'development'

export default function setup(app, done) {
  log('start setup')
  Aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  })

  app.use(noFavicon())
  app.use(helmet())
  app.use(compression())

  app.use('/image', S3Router({
    bucket: process.env.S3_IMAGE_BUCKET,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
    headers: { 'Access-Control-Allow-Origin': '*' },
    ACL: 'public-read',
    uniquePrefix: true,
  }))

  if (DEV) {
    log('development config')
    const clientConfig = require('../../webpack/client.dev')
    const serverConfig = require('../../webpack/server.dev')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackHotServerMiddleware = require('webpack-hot-server-middleware')

    const publicPath = clientConfig.output.publicPath
    const compiler = webpack([clientConfig, serverConfig])
    const clientCompiler = compiler.compilers[0]
    const options = { publicPath, stats: { colors: true } }

    app.use(webpackDevMiddleware(compiler, options))
    app.use(webpackHotMiddleware(clientCompiler))
    app.use(webpackHotServerMiddleware(compiler))

    compiler.plugin('done', done)
  } else {
    log('production config')
    const clientConfig = require('../../webpack/client.prod')
    const publicPath = clientConfig.output.publicPath
    const outputPath = clientConfig.output.path

    const clientStats = require('./clientStats.json')
    const serverRender = require('../../buildClientSSR/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  }
}
