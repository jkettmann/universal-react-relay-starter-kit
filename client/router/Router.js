import createConnectedRouter from 'found/lib/createConnectedRouter'
import createRender from 'found/lib/createRender'
import { Resolver } from 'found-relay'
import { Environment, Network, RecordSource, Store } from 'relay-runtime'

import { ClientFetcher } from '../fetcher'

export function createResolver(fetcher) {
  const environment = new Environment({
    network: Network.create((...args) => fetcher.fetch(...args)),
    store: new Store(new RecordSource()),
  })

  return new Resolver(environment)
}

export const render = createRender({})

export function createClientResolver() {
  // eslint-disable-next-line no-underscore-dangle, no-undef
  const fetcher = new ClientFetcher(process.env.GRAPHQL_ENDPOINT, window.__RELAY_PAYLOADS__)
  return createResolver(fetcher)
}

export function createClientRouter() {
  return createConnectedRouter({ render })
}
