import passport from 'passport'
import bodyParser from 'body-parser'

import sessionMiddleware from './sessionMiddleware'
import * as localStrategy from './localStrategy'

export default (app, database) => {
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
}
