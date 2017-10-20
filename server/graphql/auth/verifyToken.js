import jwt from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'
import dotenv from 'dotenv'
import debug from 'debug'

dotenv.config()

const log = debug('graphql:verifyToken')
const userPoolId = 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_kYvMedesC'
const jwtSet = JSON.parse(process.env.AWS_COGNITO_JWT_SET)

const pems = jwtSet.keys.reduce((tmpPems, key) => {
  const pem = jwkToPem({
    kty: key.kty,
    n: key.n,
    e: key.e,
  })
  return { ...tmpPems, [key.kid]: pem }
}, {})

function verifyToken(jwtToken, shouldBeAccessToken) {
  return new Promise((resolve, reject) => {
    const decodedJWT = jwt.decode(jwtToken, { complete: true })

    if (!decodedJWT) {
      log('Not a valid JWT token')
      reject('Not a valid JWT token')
    }

    if (decodedJWT.payload.iss !== userPoolId) {
      log('invalid issuer')
      reject({
        message: 'invalid issuer',
        iss: decodedJWT.payload,
      })
    }

    if (shouldBeAccessToken && decodedJWT.payload.token_use !== 'access') {
      log('Not an access token')
      reject('Not an access token')
    }

    const kid = decodedJWT.header.kid
    const pem = pems[kid]

    if (!pem) {
      log('Invalid access token')
      reject('Invalid access token')
    }

    jwt.verify(jwtToken, pem, { issuer: userPoolId }, (error, payload) => {
      if (error) {
        log('Unauthorized signature for this JWT Token')
        reject('Unauthorized signature for this JWT Token')
      } else {
        resolve(payload)
      }
    })
  })
}

export function verifyAccessToken(token) {
  return verifyToken(token, true)
}

export function verifyIdToken(token) {
  return verifyToken(token, false)
}
