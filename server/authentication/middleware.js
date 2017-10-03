import passport from 'passport'
import bodyParser from 'body-parser'

import sessionMiddleware from './sessionMiddleware'
import * as localStrategy from './localStrategy'

passport.serializeUser((user, done) => {
  console.log('serialize', user)
  done(user)
})
passport.deserializeUser((user, done) => {
  console.log('deserialize', user)
  done(user)
})

export default (app, database) => {
  app.use(sessionMiddleware())
  app.use(bodyParser())
  app.use(passport.initialize())

  app.post('/login/credentials', localStrategy.login(passport, database))
  app.post('/register/credentials', localStrategy.register(passport, database))
}
