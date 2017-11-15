import { combineReducers, createStore, compose } from 'redux'
import found from 'found/lib/foundReducer'
import FarceActions from 'farce/lib/Actions'
import BrowserProtocol from 'farce/lib/BrowserProtocol'
import ServerProtocol from 'farce/lib/ServerProtocol'
import createHistoryEnhancer from 'farce/lib/createHistoryEnhancer'
import queryMiddleware from 'farce/lib/queryMiddleware'
import createMatchEnhancer from 'found/lib/createMatchEnhancer'
import Matcher from 'found/lib/Matcher'
import { reducer as form } from 'redux-form'

import dialog from '../components/Dialog/reducer'

import { routeConfig } from '../router'

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

  const reducers = combineReducers({
    found,
    form,
    dialog,
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
