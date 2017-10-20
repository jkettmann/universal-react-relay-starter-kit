import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import debug from 'debug'

import { userPool } from './config'

const log = debug('graphql:register')

export default function register({ email, password, firstName, lastName }) {
  return new Promise((resolve, reject) => {
    const dataEmail = { Name: 'email', Value: email }
    const dataFirstName = { Name: 'given_name', Value: firstName }
    const dataLastName = { Name: 'family_name', Value: lastName }
    const dataRole = { Name: 'custom:role', Value: 'publisher' }

    const attributeList = [
      new CognitoUserAttribute(dataEmail),
      new CognitoUserAttribute(dataFirstName),
      new CognitoUserAttribute(dataLastName),
      new CognitoUserAttribute(dataRole),
    ]

    userPool.signUp(email, password, attributeList, null, (error, result) => {
      log(error, result)
      if (error) {
        reject(error)
        return
      }
      resolve({ email })
    })
  })
}
