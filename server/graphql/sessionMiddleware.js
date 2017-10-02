import cookieSession from 'cookie-session'
import debug from 'debug'

import { decodeToken } from '../authentication'

const log = debug('server:sessionMiddleware')
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7

function loadSessionData(req) {
  console.log('loadSessionData', req.session)
  if (req.session && req.session.token) {
    return new Promise((resolve) => {
      let tokenData = null
      try {
        console.log('loadSessionData', req.session.token)
        tokenData = decodeToken(req.session.token)
      } catch (err) {
        console.log('loadSessionData', err)
        // eslint-disable-next-line no-undef
        log(err)
      }
      console.log('loadSessionData', tokenData)
      log(tokenData)
      resolve(tokenData)
    })
  }

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
  keys: ['id', 'token'],
  maxAge: ONE_WEEK,
})

export default (req, res, next) => {
  cookieMiddleware(req, res, () => getSessionData(req, res, next))
}
