import express from 'express'
import webpack from 'webpack' // aliased to webpack-universal
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import Aws from 'aws-sdk'
import S3Router from 'react-s3-uploader/s3router'
import debug from 'debug'
import dotenv from 'dotenv'

dotenv.config()
const log = debug('server')

const PORT = process.env.PORT_APP
const DEV = process.env.NODE_ENV === 'development'

let isBuilt = false

Aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const app = express()

app.use(helmet())
app.use(compression())
app.use(cookieParser())

app.get('/health', (req, res) => {
  res.sendStatus(isBuilt ? 200 : 400)
})

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

if (DEV) {
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
  const clientConfig = require('../../webpack/client.prod')
  const serverConfig = require('../../webpack/server.prod')
  const publicPath = clientConfig.output.publicPath
  const outputPath = clientConfig.output.path

  webpack([clientConfig, serverConfig]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../../buildClientSSR/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })
}
