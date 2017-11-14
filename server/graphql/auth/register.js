import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { UserError } from 'graphql-errors'
import debug from 'debug'

import { userPool } from './config'
import { ERRORS } from '../../config'

const log = debug('graphql:register')

export default function register({ email, password, firstName, lastName }) {
  return new Promise((resolve, reject) => {
    const dataEmail = { Name: 'email', Value: email }
    const dataFirstName = { Name: 'given_name', Value: firstName }
    const dataLastName = { Name: 'family_name', Value: lastName }

    const attributeList = [
      new CognitoUserAttribute(dataEmail),
      new CognitoUserAttribute(dataFirstName),
      new CognitoUserAttribute(dataLastName),
    ]

    userPool.signUp(email, password, attributeList, null, (error, result) => {
      log(error, result)
      if (error) {
        // TODO this code shouldn't know about graphql errors. refactor to use separate layers
        if (error.code === 'UsernameExistsException') {
          reject(new UserError(ERRORS.EmailAlreadyTaken))
        } else {
          reject(error)
        }
        return
      }
      resolve({ id: result.userSub, email })
    })
  })
}
