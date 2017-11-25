import React from 'react'
import { Provider } from 'react-redux'
import getStoreRenderArgs from 'found/lib/getStoreRenderArgs'

import { createClientStore } from './store'
import { createClientRouter, createClientResolver } from './router'

const createRootAsync = async () => {
  const resolver = createClientResolver()
  const store = createClientStore()
  const Router = createClientRouter()
  const initialRenderArgs = await getStoreRenderArgs({
    store,
    matchContext: { store },
    resolver,
  })

  return () => (
    <Provider store={store}>
      <Router
        matchContext={{ store }}
        resolver={resolver}
        initialRenderArgs={initialRenderArgs}
      />
    </Provider>
  )
}

export default createRootAsync
