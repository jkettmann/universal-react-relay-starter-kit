import { CognitoUser } from 'amazon-cognito-identity-js'
import debug from 'debug'

import { userPool } from './config'

const log = debug('graphql:confirmPassword')

export default function confirmPassword({ email, pin, password }) {
  return new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.confirmPassword(pin, password, {
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
