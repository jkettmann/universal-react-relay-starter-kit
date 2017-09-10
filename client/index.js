// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createFarceRouter from 'found/lib/createFarceRouter'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'
import injectTapEventPlugin from 'react-tap-event-plugin'

import fetchQuery from './fetchQuery'
import routes from './components/Routes'

injectTapEventPlugin()

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Roboto, sans-serif;;
    font-weight: 300;
    color: #555;
  }
`

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

const Router = createFarceRouter({
  historyProtocol: new BrowserProtocol(),
  historyMiddlewares: [queryMiddleware],
  routeConfig: routes,
  render: createRender({}),
})

ReactDOM.render(
  <Router resolver={new Resolver(environment)} />,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
)
