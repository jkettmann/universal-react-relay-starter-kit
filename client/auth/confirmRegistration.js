import { CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from './config'

export default function confirmRegistration({ email, pin }) {
  return new Promise((resolve, reject) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(pin, true, (error, result) => {
      if (error) {
        console.log(error)
        reject(error)
        return
      }
      if (result === 'SUCCESS') {
        console.log('Successfully verified account!')
        cognitoUser.signOut()
        resolve()
      } else {
        reject('Could not verify account')
      }
    })
  })
}