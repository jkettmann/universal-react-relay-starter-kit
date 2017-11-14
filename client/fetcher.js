// taken from https://github.com/4Catalyzer/found-relay/blob/master/examples/todomvc-modern-universal
import 'isomorphic-fetch'

class FetcherBase {
  constructor(url, headers) {
    this.url = url
    this.headers = headers || null
  }

  async fetch(operation, variables) {
    // eslint-disable-next-line no-undef
    const response = await fetch(this.url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this.headers,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: operation.text, variables }),
    })

    return response.json()
      .then((json) => {
        // https://github.com/facebook/relay/issues/1816
        if (operation.query.operation === 'mutation' && json.errors) {
          return Promise.reject(json.errors)
        }

        return Promise.resolve(json)
      })
  }
}

export class ServerFetcher extends FetcherBase {
  constructor(url, headers) {
    super(url, headers)
    this.payloads = []
  }

  async fetch(...args) {
    const i = this.payloads.length
    this.payloads.push(null)
    const payload = await super.fetch(...args)
    this.payloads[i] = payload
    return payload
  }

  toJSON() {
    return this.payloads
  }
}

export class ClientFetcher extends FetcherBase {
  constructor(url, payloads) {
    super(url)
    this.payloads = payloads || []
  }

  async fetch(...args) {
    if (this.payloads.length) {
      return this.payloads.shift()
    }

    return super.fetch(...args)
  }
}
