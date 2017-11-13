import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Cookie from 'js-cookie'

import { createClientRouter, createClientResolver } from './router'
import withIntl from './intl/ismorphicIntlProvider'

injectTapEventPlugin()

async function render(createRouter) {
  const resolver = createClientResolver()
  const Router = await createRouter(resolver)
  ReactDOM.render(
    <AppContainer>
      {withIntl(<Router resolver={resolver} />, Cookie.get('locale'))}
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
