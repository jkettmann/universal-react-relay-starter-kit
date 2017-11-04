// Cognito Sync Manager
import 'amazon-cognito-js'
import AWS from 'aws-sdk'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import dotenv from 'dotenv'

dotenv.config()

global.navigator = global.navigator || {}

const {
  AWS_REGION,
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_USER_POOL_CLIENT_ID,
  AWS_COGNITO_IDENTITY_POOL_ID,
} = process.env

AWS.config.update({
  region: AWS_REGION,
})

const userData = {
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
}

export const userPool = new CognitoUserPool(userData)

export const USER_POOL_ID = `cognito-idp.${AWS_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}`

export const IDENTITY_POOL_ID = AWS_COGNITO_IDENTITY_POOL_ID
