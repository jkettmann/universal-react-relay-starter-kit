import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { getFarceResult } from 'found/lib/server'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'

import { ServerFetcher } from '../client/fetcher'
import { createResolver, historyMiddlewares, render } from '../client/Router'
import Routes from '../client/pages/Routes'

export default ({ clientStats }) => async (req, res) => {
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

  if (redirect) {
    res.redirect(302, redirect.url)
    return
  }

  const sheet = new ServerStyleSheet()
  const app = ReactDOM.renderToString(sheet.collectStyles(element))
  const chunkNames = flushChunkNames()
  const relayPayload = serialize(fetcher, { isJSON: true })
  const styleTags = sheet.getStyleTags()
  const helmet = Helmet.renderStatic()

  const {
    js,
    scripts,
  } = flushChunks(clientStats, { chunkNames })

  console.log('PATH', req.path)
  console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  console.log('SCRIPTS SERVED', scripts)

  res.send(
    `<!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          ${helmet.title ? helmet.title.toString() : ''}
          ${helmet.meta ? helmet.meta.toString() : ''}
          ${styleTags}
          <script>window.__RELAY_PAYLOADS__ = ${relayPayload};</script>
        </head>
        <body>
          <div id="root">${app}</div>
          ${js}
        </body>
      </html>`
  )
}
