import { CognitoUser } from 'amazon-cognito-identity-js'
import { UserError } from 'graphql-errors'
import debug from 'debug'

import { userPool } from './config'
import { ERRORS } from '../../config'

const log = debug('graphql:verify')

export default function verify({ email, pin }) {
  return new Promise((res, rej) => {
    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)
    cognitoUser.confirmRegistration(pin, true, (error, result) => {
      if (error) {
        log(error)
        // TODO this code shouldn't know about graphql errors. refactor to use separate layers
        if (error.code === 'CodeMismatchException') {
          rej(new UserError(ERRORS.WrongEmailOrVerificationPIN))
        } else {
          rej(error)
        }
        return
      }
      if (result === 'SUCCESS') {
        log('Successfully verified account!')
        cognitoUser.signOut()
        res()
      } else {
        rej(new Error('Could not verify account'))
      }
    })
  })
}
