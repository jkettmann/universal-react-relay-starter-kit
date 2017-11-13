import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Cookie from 'js-cookie'

import { createClientStore } from './store'
import { createClientRouter, createClientResolver } from './router'
import withIntl from './intl/ismorphicIntlProvider'

injectTapEventPlugin()

async function render(createRouter) {
  const resolver = createClientResolver()
  const store = createClientStore()
  const Router = await createRouter(resolver)
  ReactDOM.render(
    <AppContainer>
      {
        withIntl(
          <Provider store={store}>
            <Router resolver={resolver} />
          </Provider>,
          Cookie.get('locale'),
        )
      }
    </AppContainer>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
  )
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./router/index.js', () => {
    render(require('./router').createClientRouter)
  })
}

render(createClientRouter)
