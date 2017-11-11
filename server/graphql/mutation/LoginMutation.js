import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import dotenv from 'dotenv'
import debug from 'debug'

import login from '../auth/login'
import UserType from '../type/UserType'
import PermissionType from '../type/PermissionType'

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
    permission: {
      type: PermissionType,
      resolve: () => ({ isLoggedIn: true }),
    },
  },
  mutateAndGetPayload: ({ email, password, facebookToken }, context) =>
    login({ email, password, facebookToken })
      .then((payload) => {
        log('login successful', payload.userId)
        /* eslint-disable no-param-reassign */
        context.user = {
          ...payload,
          email,
        }
        /* eslint-enable no-param-reassign */
        return { id: payload.userId }
      }),
})
