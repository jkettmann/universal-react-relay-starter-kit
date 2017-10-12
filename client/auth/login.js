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
        localStorage.setItem('user_token', result.accessToken.jwtToken)
        const loginsObj = {
          [USER_POOL_ID]: result.getIdToken().getJwtToken(),
        }
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: IDENTITY_POOL_ID,
          Logins: loginsObj,
        })
        AWS.config.credentials.refresh(() => {
          console.log(AWS.config.credentials)
        })
        res(result)
      },
      onFailure: (err) => {
        rej(err)
      },
    })
  })
}
