import { CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from './config'

export default function verify({ email, pin }) {
  return new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(pin, true, (error, result) => {
      if (error) {
        console.log(error)
        rej(error)
        return
      }
      if (result === 'SUCCESS') {
        console.log('Successfully verified account!')
        cognitoUser.signOut()
        res()
      } else {
        rej(new Error('Could not verify account'))
      }
    })
  })
}
