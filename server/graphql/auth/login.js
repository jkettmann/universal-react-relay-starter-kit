import AWS from 'aws-sdk'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'
import debug from 'debug'

import { userPool, USER_POOL_ID, IDENTITY_POOL_ID } from './config'

const log = debug('graphql:login')

function getLogins({ cognitoToken, facebookToken }) {
  if (cognitoToken) {
    return { [USER_POOL_ID]: cognitoToken }
  }
  if (facebookToken) {
    return { 'graph.facebook.com': facebookToken }
  }

  throw Error('Login: No supported token provided.')
}

function updateCredentials(token) {
  return new Promise((resolve, reject) => {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IDENTITY_POOL_ID,
      Logins: getLogins(token),
    })

    AWS.config.credentials.refresh((error) => {
      if (error) {
        reject(error)
      }
      resolve()
    })
  })
}

function loginWithCredentials({ email, password }) {
  return new Promise((res, rej) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        updateCredentials({ cognitoToken: result.getIdToken().getJwtToken() })
          .then(() => res({
            userId: AWS.config.credentials.data.IdentityId,
            accessToken: result.getAccessToken().getJwtToken(),
            idToken: result.getIdToken().getJwtToken(),
            // refreshToken: result.getRefreshToken().getJwtToken(),
          }),
        )
      },
      onFailure: (err) => {
        log('login failed', err)
        rej(err)
      },
    })
  })
}

export default function login({ email, password, ...token }) {
  if (password) {
    return loginWithCredentials({ email, password })
  }

  return updateCredentials(token)
}
