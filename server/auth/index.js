import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import cors from 'cors'
import debug from 'debug'
import dotenv from 'dotenv'

import sessionMiddleware from './sessionMiddleware'
import * as localStrategy from './localStrategy'
import Database from '../data/Database'

dotenv.config()
const port = process.env.PORT_AUTH
const log = debug('server:authentication')
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['POST'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}

passport.serializeUser((user, done) => {
  console.log('serialize', user)
  done(user)
})
passport.deserializeUser((user, done) => {
  console.log('deserialize', user)
  done(user)
})

const database = new Database()

const app = express()

app.use(cors(corsOptions))
app.use(sessionMiddleware())
app.use(bodyParser())
app.use(passport.initialize())

app.post('/login/credentials', localStrategy.login(passport, database))
app.post('/register/credentials', localStrategy.register(passport, database))

app.listen(port, () => {
  log(`Authentication server running on localhost:${port}`)
})
