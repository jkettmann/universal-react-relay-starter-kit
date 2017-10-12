import express from 'express'
import graphQLHTTP from 'express-graphql'
import debug from 'debug'

import sessionMiddleware from './sessionMiddleware'
import Schema from './schema'

const log = debug('graphql-server')

export default function createGraphQlServer(port, database) {
  const graphQLServer = express()

  graphQLServer.use(sessionMiddleware)

  graphQLServer.use(
    '/graphql',
    graphQLHTTP(({ session, tokenData }) => ({
      graphiql: true,
      pretty: true,
      schema: Schema,
      context: { db: database },
      rootValue: { session, tokenData },
    })),
  )

  return graphQLServer.listen(port, () =>
    // eslint-disable-next-line no-undef
    log(`GraphQL Server is now running on http://localhost:${port}`),
  )
}