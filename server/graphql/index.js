import express from 'express'
import graphQLHTTP from 'express-graphql'
import { maskErrors } from 'graphql-errors'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import debug from 'debug'

import sessionMiddleware, { setUserToSession, getUserFromSession } from './sessionMiddleware'
import Schema from './schema'
import intlMiddleware from './intlMiddleware'
import Database from './data/Database'

dotenv.config()
const log = debug('graphql')
const PORT = process.env.PORT_GRAPHQL

const app = express()

const corsOptions = {
  origin: process.env.APP_ENDPOINT,
  methods: ['POST'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/health', (req, res) => {
  res.sendStatus(200)
})

app.use(helmet())
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(intlMiddleware)
app.use(sessionMiddleware)

maskErrors(Schema)
const db = new Database()
app.use('/', graphQLHTTP(({ session }) => ({
  graphiql: true,
  pretty: true,
  schema: Schema,
  context: {
    db,
    session,
    get user() { return getUserFromSession(session) },
    set user(payload) { setUserToSession(session, payload) },
  },
})))

app.listen(PORT, () =>
  log(`GraphQL Server is now running on http://localhost:${PORT}`),
)
