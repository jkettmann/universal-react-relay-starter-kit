import { GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'
import dotenv from 'dotenv'

import login from '../auth/login'
import UserType from '../type/UserType'

dotenv.config()

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
      .then(({ accessToken, idToken, refreshToken }) => {
        console.log('login successful', accessToken)
        /* eslint-disable no-param-reassign */
        rootValue.session.accessToken = accessToken
        rootValue.session.idToken = idToken
        // rootValue.res.cookie('accessToken', accessToken, { httpOnly: true, domain: process.env.APP_DOMAIN })
        /* eslint-enable no-param-reassign */
        return { email }
      })
  },
})
