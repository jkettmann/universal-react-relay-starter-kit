import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Cookie from 'js-cookie'

import createRootAsync from './createRootAsync'
import withIntl from './intl/ismorphicIntlProvider'

injectTapEventPlugin()

async function render(createRoot) {
  const Root = await createRoot()
  ReactDOM.hydrate(
    <AppContainer>
      {
        withIntl(<Root />, Cookie.get('locale'))
      }
    </AppContainer>,
    // eslint-disable-next-line no-undef
    document.getElementById('root'),
  )
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./createRootAsync.js', () => {
    render(require('./createRootAsync').default)
  })
}

render(createRootAsync)
