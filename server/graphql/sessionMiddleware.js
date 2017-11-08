import cookieSession from 'cookie-session'
import dotenv from 'dotenv'
import debug from 'debug'

import {
  verifyAccessToken,
} from './auth/verifyToken'

dotenv.config()
const log = debug('graphql:sessionMiddleware')
const ONE_WEEK = 100 * 60 * 60 * 24 * 7

export const getUserFromSession = session => ({
  id: session.userId,
  role: session.role,
  email: session.email,
  emailVerified: session.emailVerified,
})

export const setUserToSession = (session, payload) => {
  /* eslint-disable no-param-reassign */
  session.userId = payload.userId
  session.role = payload.role
  session.email = payload.email
  session.emailVerified = payload.emailVerified
  session.accessToken = payload.accessToken
  session.refreshToken = payload.refreshToken
  /* eslint-enable no-param-reassign */
}

function verifyToken(req, res, next) {
  if (req.session && req.session.accessToken) {
    verifyAccessToken(req.session.accessToken)
      .then(() => next())
      .catch((err) => {
        // eslint-disable-next-line no-undef
        log(err)
        res.sendStatus(400)
      })
  } else {
    next()
  }
}

const cookieMiddleware = cookieSession({
  name: 'session',
  keys: ['token'],
  maxAge: ONE_WEEK,
  domain: process.env.COOKIE_DOMAIN,
})

export default (req, res, next) => {
  cookieMiddleware(req, res, () => verifyToken(req, res, next))
}
