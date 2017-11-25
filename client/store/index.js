import { createStore, compose } from 'redux'
import FarceActions from 'farce/lib/Actions'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import ServerProtocol from 'farce/lib/ServerProtocol'
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createMatchEnhancer from 'found/lib/createMatchEnhancer'
import Matcher from 'found/lib/Matcher'

import { routeConfig } from '../router'
import reducers from './reducers'

// eslint-disable-next-line no-undef, no-underscore-dangle
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

function generateStore(protocol) {
  const historyEnhancer = createHistoryEnhancer({
    protocol,
    middlewares: [queryMiddleware],
  })

  const matcherEnhancer = createMatchEnhancer(
    new Matcher(routeConfig),
  )

  const middleWare = composeEnhancers(
    historyEnhancer,
    matcherEnhancer,
  )

  const store = createStore(reducers, middleWare)

  store.dispatch(FarceActions.init())

  return store
}

export const createClientStore = (() => {
  let store
  return () => {
    if (!store) {
      store = generateStore(new BrowserProtocol())

      if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers', () => {
          const nextRootReducer = require('./reducers')
          store.replaceReducer(nextRootReducer)
        })
      }
    }

    return store
  }
})()

export function createServerStore(url) {
  return generateStore(new ServerProtocol(url))
}
