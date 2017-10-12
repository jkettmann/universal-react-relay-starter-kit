import { GraphQLNonNull, GraphQLString } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import login from '../../auth/login'

import UserType from '../type/UserType'

export default mutationWithClientMutationId({
  name: 'Login',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    user: {
      type: UserType,
      resolve: ({ user }) => user,
    },
  },
  mutateAndGetPayload: ({ email, password }, { db }, { rootValue }) => {
    return login({ email, password })
      .then((token) => {
        console.log('login successful', token)
        /* eslint-disable no-param-reassign */
        rootValue.session.token = token
        /* eslint-enable no-param-reassign */
        return { email }
      })
  },
})
