// Cognito Sync Manager
import 'amazon-cognito-js'
import AWS from 'aws-sdk'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const {
  AWS_COGNITO_REGION,
  AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_USER_POOL_CLIENT_ID,
  AWS_COGNITO_IDENTITY_POOL_ID,
} = process.env

AWS.config.update({
  region: AWS_COGNITO_REGION,
})

const userData = {
  UserPoolId: AWS_COGNITO_USER_POOL_ID,
  ClientId: AWS_COGNITO_USER_POOL_CLIENT_ID,
}

export const userPool = new CognitoUserPool(userData)

export const USER_POOL_ID = `cognito-idp.${AWS_COGNITO_REGION}.amazonaws.com/${AWS_COGNITO_USER_POOL_ID}`

export const IDENTITY_POOL_ID = AWS_COGNITO_IDENTITY_POOL_ID

// we create an array of all attributes, without the `custom:` prefix.
// This will be used for building the React-Redux object in plain JS, hence no AWS Cognito related name requirements
const landlordAttrs = ["email", "agentName", "id"]

// we create an array of all our desired attributes for changing, and we loop through this array to access the key name.
// This will be used for AWS Cognito related name requirements
const attrs = ["custom:agentName"]
