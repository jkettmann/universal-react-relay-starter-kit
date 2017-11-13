import React from 'react'
import ReactDOM from 'react-dom/server'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import { Provider } from 'react-redux'
import { RouterProvider } from 'found/lib/server'
import RedirectException from 'found/lib/RedirectException'
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs'
import serialize from 'serialize-javascript'
import { ServerStyleSheet } from 'styled-components'
import { Helmet } from 'react-helmet'
import Cookies from 'cookies'
import dotenv from 'dotenv'
import debug from 'debug'

import { ServerFetcher } from '../../client/fetcher'
import { createResolver, render, paths } from '../../client/router'
import withIntl from '../../client/intl/ismorphicIntlProvider'
import { createServerStore } from '../../client/store'

dotenv.config()
const log = debug('server:render')

const renderHtml = ({ title, meta, styleTags, relayPayload, app, js }) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${title}
    ${meta}
    ${styleTags}
    <script>window.__RELAY_PAYLOADS__ = ${relayPayload};</script>

    <!-- <link href='https://fonts.googleapis.com/css?family=Roboto:400,300,500' rel='stylesheet' type='text/css'> --!>
  </head>
  <body>
    <div id="root">${app}</div>
    ${js}
  </body>
</html>`

function getStatusCode(url) {
  switch (url) {
    case paths.unauthorized:
      return 401

    default:
      return 200
  }
}

async function renderAsync(req, res) {
  const fetcher = new ServerFetcher(process.env.GRAPHQL_ENDPOINT, { cookie: req.headers.cookie })

  const store = createServerStore((req.url))
  const renderArgs = await getStoreRenderArgs({
    store,
    matchContext: { store },
    resolver: createResolver(fetcher),
  })

  const elementWithProvider = (
    <Provider store={store}>
      <RouterProvider router={renderArgs.router}>
        {render(renderArgs)}
      </RouterProvider>
    </Provider>
  )
  const cookies = new Cookies(req, res)
  const locale = cookies.locale
  const elementwithIntl = withIntl(elementWithProvider, locale)
  const sheet = new ServerStyleSheet()
  const elementWithStyles = sheet.collectStyles(elementwithIntl)
  const app = ReactDOM.renderToString(elementWithStyles)
  const relayPayload = serialize(fetcher, { isJSON: true })
  const styleTags = sheet.getStyleTags()
  const helmet = Helmet.renderStatic()

  return {
    app,
    helmet,
    relayPayload,
    styleTags,
  }
}

export default ({ clientStats }) => async (req, res) => {
  let title = ''
  let meta = ''
  let styleTags = ''
  let relayPayload = null
  let app = ''

  try {
    const renderResult = await renderAsync(req, res)
    const helmet = renderResult.helmet
    title = helmet && helmet.title && helmet.title.toString()
    meta = helmet && helmet.meta && helmet.meta.toString()
    styleTags = renderResult.styleTags
    relayPayload = renderResult.relayPayload
    app = renderResult.app
  } catch (err) {
    const isRedirect = err instanceof RedirectException
    if (isRedirect) {
      res.redirect(302, err.location)
      return
    }

    log('ssr error', err)
  }

  const chunkNames = flushChunkNames()

  const {
    js,
    scripts,
  } = flushChunks(clientStats, { chunkNames })

  log('PATH', req.path)
  log('DYNAMIC CHUNK NAMES RENDERED', chunkNames)
  log('SCRIPTS SERVED', scripts)

  res
    .status(getStatusCode(req.url))
    .send(renderHtml({ title, meta, styleTags, relayPayload, app, js }))
}
