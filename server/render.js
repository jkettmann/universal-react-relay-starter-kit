import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { getFarceResult } from 'found/lib/server'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'
import debug from 'debug'

import { ServerFetcher } from '../client/fetcher'
import { createResolver, historyMiddlewares, render } from '../client/Router'
import Routes from '../client/Routes'
import withIntl from '../client/intl/ismorphicIntlProvider'

const log = debug('server:render')

async function renderAsync(req) {
  // for material ui
  global.navigator = global.navigator || {}
  global.navigator.userAgent = req.headers['user-agent'] || 'all'

  const fetcher = new ServerFetcher('http://localhost:8080/graphql')
  const { redirect, status, element } = await getFarceResult({
    url: req.url,
    historyMiddlewares,
    routeConfig: Routes,
    resolver: createResolver(fetcher),
    render,
  })

  const locale = req.cookies && req.cookies.locale
  const elementwithIntl = withIntl(element, locale)
  const sheet = new ServerStyleSheet()
  const app = ReactDOM.renderToString(sheet.collectStyles(elementwithIntl))
  const relayPayload = serialize(fetcher, { isJSON: true })
  const styleTags = sheet.getStyleTags()
  const helmet = Helmet.renderStatic()

  return {
    app,
    helmet,
    relayPayload,
    styleTags,
    redirect,
  }
}

export default ({ clientStats }) => async (req, res) => {
  let title = ''
  let meta = ''
  let styleTags = ''
  let relayPayload = null
  let app = ''

  try {
    const renderResult = await renderAsync(req)
    const helmet = renderResult.helmet
    title = helmet && helmet.title && helmet.title.toString()
    meta = helmet && helmet.meta && helmet.meta.toString()
    styleTags = renderResult.styleTags
    relayPayload = renderResult.relayPayload
    app = renderResult.app
  } catch (err) {
    console.error('render', err)
  }

  const chunkNames = flushChunkNames()

  const {
    js,
    scripts,
  } = flushChunks(clientStats, { chunkNames })

  log('PATH', req.path)
  log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  log('SCRIPTS SERVED', scripts)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          ${title}
          ${meta}
          ${styleTags}
          <script>window.__RELAY_PAYLOADS__ = ${relayPayload};</script>

          <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'>
        </head>
        <body>
          <div id="root">${app}</div>
          ${js}
        </body>
      </html>`,
  )
}
