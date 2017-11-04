import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import dotenv from 'dotenv'
import debug from 'debug'

import login from '../auth/login'
import UserType from '../type/UserType'

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
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: ({ email, password, facebookToken }, { db }, { rootValue }) => {
    return login({ email, password, facebookToken })
      .then(({ userId, role, accessToken, refreshToken }) => {
        log('login successful', userId, accessToken)
        /* eslint-disable no-param-reassign */
        rootValue.session.userId = userId
        rootValue.session.role = role
        rootValue.session.accessToken = accessToken
        rootValue.session.refreshToken = refreshToken
        /* eslint-enable no-param-reassign */
        return { email }
      })
  },
})
