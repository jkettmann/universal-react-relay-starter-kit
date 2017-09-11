// eslint-disable-next-line import/no-extraneous-dependencies
import 'babel-polyfill'
import 'whatwg-fetch'

import React from 'react'
import ReactDOM from 'react-dom'
// import AppContainer from 'react-hot-loader/lib/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'

import { createClientRouter, createClientResolver } from './Router'

injectTapEventPlugin()

async function render() {
  const resolver = createClientResolver()
  const Router = await createClientRouter(resolver)
  ReactDOM.render(
    <Router resolver={resolver} />,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
  )
}

render()

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./components/Router.js', () => {
//     render(require('./components/Router').default)
//   })
// }

// render(Router)
