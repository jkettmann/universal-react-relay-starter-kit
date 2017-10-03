import graphQLHTTP from 'express-graphql'

import Schema from './schema'

export default database => graphQLHTTP(({ session, tokenData }) => ({
  graphiql: true,
  pretty: true,
  schema: Schema,
  context: { db: database },
  rootValue: { session, tokenData },
}))
