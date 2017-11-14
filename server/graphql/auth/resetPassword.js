import { CognitoUser } from 'amazon-cognito-identity-js'
import debug from 'debug'

import { userPool } from './config'

const log = debug('graphql:resetPassword')

export default function resetPassword({ email }) {
  return new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.forgotPassword({
      onSuccess: () => {
        res({ succes: true })
      },
      onFailure: (err) => {
        log('Error on password reset', err)
        rej(err)
      },
    })
  })
}
