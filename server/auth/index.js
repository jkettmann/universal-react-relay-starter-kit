import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'
import debug from 'debug'
import dotenv from 'dotenv'

import Database from '../data/Database'
import sessionMiddleware from '../sessionMiddleware'
import * as localStrategy from './localStrategy'

dotenv.config()

const PORT = process.env.PORT_AUTH
const HOST_APP = process.env.HOST_APP
const log = debug('auth-server')

const database = new Database()

const corsOptions = {
  origin: HOST_APP,
  methods: ['POST'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const app = express()

app.use(cors(corsOptions))
app.use(sessionMiddleware())
app.use(bodyParser())
app.use(passport.initialize())

app.post('/login/credentials', localStrategy.login(passport, database))
app.post('/register/credentials', localStrategy.register(passport, database))

// Logout only deletes the token from the cookie. An attacker owning a token could
// still access user data. See following question for approaches to this problem
// https://stackoverflow.com/questions/21978658/invalidating-json-web-tokens
app.post('/logout', (req, res) => {
  req.session.token = null
  res.status(200).json({ message: 'Logout successful' })
})

app.listen(PORT, () => {
  log(`Authentication server running on localhost:${PORT}`)
})
