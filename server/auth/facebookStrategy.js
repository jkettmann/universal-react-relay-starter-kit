import { Strategy } from 'passport-facebook'
import dotenv from 'dotenv'

import { createToken } from '../token'

dotenv.config()

const strategyOptions = {
  // by default, local strategy uses username and password, we will override with email
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: `${process.env.HOST_AUTH}/login/facebook/callback`,
  seesion: false,
  profileFields: ['id', 'emails', 'name'],
}

export default function init(router, passport, db) {
  const verifyCallback = async (accessToken, refreshToken, profile, done) => {
    const id = profile.id
    const email = profile.emails && profile.emails[0]
    const firstName = profile.name.givenName
    const lastName = profile.name.familyName
    const user = await db.createUser({ id, email, firstName, lastName })
    const sessionToken = createToken(user)

    done(null, sessionToken, user)
  }

  const facebookStrategy = new Strategy(strategyOptions, verifyCallback)
  passport.use('login-with-facebook', facebookStrategy)

  router.get('/login/facebook', passport.authenticate('login-with-facebook', { scope: ['email'] }))

  router.get('/login/facebook/callback', (req, res, next) => passport.authenticate(
    'login-with-facebook',
    (error, sessionToken) => {
      if (error) {
        return res.redirect(302, `${process.env.HOST_APP}/facebook/error`)
      }

      req.session.token = sessionToken
      return res.redirect(302, `${process.env.HOST_APP}/facebook/success`)
    },
  )(req, res, next))
}
