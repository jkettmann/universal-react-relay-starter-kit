import { CognitoUser } from 'amazon-cognito-identity-js'
import debug from 'debug'

import { userPool } from './config'

const log = debug('graphql:resendVerification')

export default function resendVerification({ email }) {
  return new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.resendConfirmationCode((error) => {
      log('resent verfication', error)
      if (error) {
        rej(error)
        return
      }
      res()
    })
  })
}
