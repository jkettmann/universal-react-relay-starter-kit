import { CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from './config'

export default function resendVerification({ email }) {
  return new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.resendConfirmationCode((error) => {
      if (error) {
        rej(error)
        return
      }
      res()
    })
  })
}
