import { combineReducers, createStore, compose } from 'redux'
import found from 'found/lib/foundReducer'
import FarceActions from 'farce/lib/Actions'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import ServerProtocol from 'farce/lib/ServerProtocol'
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createMatchEnhancer from 'found/lib/createMatchEnhancer'
import Matcher from 'found/lib/Matcher'

import { routeConfig } from '../router'

function generateStore(protocol) {
  const historyEnhancer = createHistoryEnhancer({
    protocol,
    middlewares: [queryMiddleware],
  })

  const matcherEnhancer = createMatchEnhancer(
    new Matcher(routeConfig),
  )

  const middleWare = compose(
    historyEnhancer,
    matcherEnhancer,
  )

  const reducers = combineReducers({
    found,
  })

  const store = createStore(reducers, middleWare)

  store.dispatch(FarceActions.init())

  return store
}

export function createClientStore() {
  return generateStore(new BrowserProtocol())
}

export function createServerStore(url) {
  return generateStore(new ServerProtocol(url))
}
