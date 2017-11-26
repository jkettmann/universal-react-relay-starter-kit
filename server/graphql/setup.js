import graphQLHTTP from 'express-graphql'
import { maskErrors } from 'graphql-errors'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import debug from 'debug'

import sessionMiddleware from './sessionMiddleware'
import Schema from './schema'
import intlMiddleware from './intlMiddleware'
import Database from './data/Database'

dotenv.config()

const log = debug('graphql:setup')
const PATH = process.env.GRAPHQL_PATH

const corsOptions = {
  origin: process.env.APP_ENDPOINT,
  methods: ['POST'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

export default function setup(app) {
  log('start setup')

  app.use(helmet())
  app.use(cors(corsOptions))
  app.use(intlMiddleware)
  app.use(sessionMiddleware)

  maskErrors(Schema)
  const db = new Database()
  app.use(PATH, graphQLHTTP(({ session }) => ({
    graphiql: true,
    pretty: true,
    schema: Schema,
    context: {
      db,
      get sessionUser() { return session.getUser() },
      set sessionUser(payload) { session.setUser(payload) },
      resetSessionUser() { session.resetUser() },
    },
  })))
}
