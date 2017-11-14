import Cookies from 'cookies'
import dotenv from 'dotenv'
import debug from 'debug'

import {
  verifyAccessToken,
} from './auth/verifyToken'

dotenv.config()
const log = debug('graphql:sessionMiddleware')
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7
const cookieOptions = {
  httpOnly: true,
  domain: process.env.APP_DOMAIN,
  maxAge: ONE_WEEK,
  signed: false,
}

function encode(data) {
  const json = JSON.stringify(data)
  return Buffer.from(json).toString('base64')
}

function decode(encoded) {
  if (!encoded) {
    return null
  }
  const json = Buffer.from(encoded, 'base64').toString('utf8')
  return JSON.parse(json)
}

function createUserSession(cookies) {
  let user = decode(cookies.get('user', { signed: true })) || {}

  const getUser = () => user

  const setUser = (payload) => {
    user = {
      id: payload.userId,
      role: payload.role,
      email: payload.email,
      emailVerified: payload.emailVerified,
    }

    cookies.set('accessToken', payload.accessToken, cookieOptions)
    cookies.set('refreshToken', payload.refreshToken, cookieOptions)
    cookies.set('user', encode(user), { ...cookieOptions, signed: true })
  }

  const resetUser = () => {
    const options = { ...cookieOptions, expired: Date.now() }
    cookies.set('accessToken', undefined, options)
    cookies.set('refreshToken', undefined, options)
    cookies.set('user', undefined, options)
  }

  return { getUser, setUser, resetUser }
}

function verifyToken(req, res, next) {
  const cookies = new Cookies(req, res, { keys: [process.env.COOKIE_SECRET] })
  const session = createUserSession(cookies)
  Object.assign(req, { session })

  if (!cookies.accessToken) {
    next()
    return
  }

  verifyAccessToken(cookies.accessToken)
    .then(() => next())
    .catch((err) => {
      // eslint-disable-next-line no-undef
      log(err)
      session.resetUser()
      next()
    })
}

export default verifyToken
