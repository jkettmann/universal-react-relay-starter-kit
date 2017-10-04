import { Strategy } from 'passport-local'
import { createToken } from '../token'

const strategyOptions = {
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  seesion: false,
  passReqToCallback: true,
}

export default function init(router, passport, db) {
  const registerVerifyCallback = async (req, email, password, done) => {
    try {
      const user = await db.createUser({ email, password })
      const sessionToken = createToken(user)
      done(null, sessionToken, user)
    } catch (error) {
      done(error)
    }
  }

  const localStrategyRegister = new Strategy(strategyOptions, registerVerifyCallback)

  passport.use('register-with-credentials', localStrategyRegister)

  router.use('/register/credentials', (req, res, next) => passport.authenticate('register-with-credentials', (error, sessionToken, user) => {
    if (error) {
      return res.status(409).json({ error })
    }

    req.session.token = sessionToken
    return res.status(200).json({ userId: user.id, role: user.role })
  })(req, res, next))

  const loginVerifyCallback = async (req, email, password, done) => {
    try {
      const user = await db.getUserWithCredentials({ email, password })
      const sessionToken = createToken(user)
      done(null, sessionToken, user)
    } catch (error) {
      done(error)
    }
  }

  const localStrategyLogin = new Strategy(strategyOptions, loginVerifyCallback)

  passport.use('login-with-credentials', localStrategyLogin)

  router.post('/login/credentials', (req, res, next) => passport.authenticate('login-with-credentials', (error, sessionToken, user) => {
    if (error) {
      return res.status(400).json({ error })
    }

    req.session.token = sessionToken
    return res.status(200).json({ userId: user.id, role: user.role })
  })(req, res, next))
}

