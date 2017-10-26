import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
import debug from 'debug'

import {
  verifyAccessToken,
  verifyIdToken,
} from './auth/verifyToken'

dotenv.config()
const log = debug('graphql:sessionMiddleware')
const ONE_WEEK = 100 * 60 * 60 * 24 * 7

function loadSessionData(req) {
  if (req.session && req.session.accessToken && req.session.idToken) {
    return verifyAccessToken(req.session.accessToken)
      .then(() => verifyIdToken(req.session.idToken))
      .then(payload => ({
        userId: req.session.userId,
        emailVerified: payload.email_verified,
        email: payload.email,
        role: payload['custom:role'],
      }))
      .catch((err) => {
        // eslint-disable-next-line no-undef
        log(err)
      })
  }

  log('no session token')

  return new Promise((resolve) => {
    resolve(null)
  })
}

function getSessionData(req, res, next) {
  loadSessionData(req)
    .then((tokenData) => {
      req.tokenData = tokenData || {}
      next()
    })
    .catch(() => {
      res.sendStatus(400)
    })
}

const cookieMiddleware = cookieSession({
  name: 'session',
  keys: ['token'],
  maxAge: ONE_WEEK,
  domain: process.env.COOKIE_DOMAIN,
})

export default (req, res, next) => {
  cookieMiddleware(req, res, () => getSessionData(req, res, next))
}
