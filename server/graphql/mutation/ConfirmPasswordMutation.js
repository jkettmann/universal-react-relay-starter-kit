import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import confirmPassword from '../auth/confirmPassword'

export default mutationWithClientMutationId({
  name: 'ConfirmPassword',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    pin: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
  },
  mutateAndGetPayload: ({ email, pin, password }) => confirmPassword({ email, pin, password }),
})
