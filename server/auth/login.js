import AWS from 'aws-sdk'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool, USER_POOL_ID, IDENTITY_POOL_ID } from './config'

export default function login({ email, password }) {
  return new Promise((res, rej) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    const userData = {
      Username: email,
      Pool: userPool,
    }
    const cognitoUser = new CognitoUser(userData)

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const token = result.getIdToken().getJwtToken()
        const loginsObj = {
          [USER_POOL_ID]: token,
        }
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID,
          Logins: loginsObj,
        })
        AWS.config.credentials.refresh(() => {
          console.log(AWS.config.credentials)
        })
        res(token)
      },
      onFailure: (err) => {
        rej(err)
      },
    })
  })
}
