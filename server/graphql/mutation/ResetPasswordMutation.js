import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import resetPassword from '../auth/resetPassword'

export default mutationWithClientMutationId({
  name: 'ResetPassword',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
  },
  mutateAndGetPayload: ({ email }) => resetPassword({ email }),
})
