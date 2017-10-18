import express from 'express'
import graphQLHTTP from 'express-graphql'
import { maskErrors } from 'graphql-errors'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import debug from 'debug'

import sessionMiddleware from './sessionMiddleware'
import Schema from './schema'
import intlMiddleware from './intlMiddleware'
import Database from './data/Database'

dotenv.config()
const log = debug('graphql')
const PORT = process.env.PORT_GRAPHQL

const app = express()
console.log(process.env.APP_ENDPOINT)

const corsOptions = {
  origin: process.env.APP_ENDPOINT,
  methods: ['POST'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(intlMiddleware)
app.use(sessionMiddleware)

maskErrors(Schema)
app.use('/', graphQLHTTP(({ session, tokenData }, res) => ({
  graphiql: true,
  pretty: true,
  schema: Schema,
  context: { db: new Database() },
  rootValue: { session, tokenData, res },
})))

app.listen(PORT, () =>
  log(`GraphQL Server is now running on http://localhost:${PORT}`),
)
