import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import dotenv from 'dotenv'
import debug from 'debug'

import login from '../auth/login'
import UserType from '../type/UserType'
import ViewerType from '../type/ViewerType'

dotenv.config()
const log = debug('graphql:LoginMutation')

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    facebookToken: {
      type: GraphQLString,
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: user => user,
    },
    viewer: {
      type: ViewerType,
      resolve: () => ({ isLoggedIn: true }),
    },
  },
  mutateAndGetPayload: ({ email, password, facebookToken }, { session }) =>
    login({ email, password, facebookToken })
      .then(({ userId, role, emailVerified, accessToken, refreshToken }) => {
        log('login successful', userId, accessToken)
        /* eslint-disable no-param-reassign */
        session.userId = userId
        session.role = role
        session.emailVerified = emailVerified
        session.accessToken = accessToken
        session.refreshToken = refreshToken
        /* eslint-enable no-param-reassign */
        return { email }
      }),
})
