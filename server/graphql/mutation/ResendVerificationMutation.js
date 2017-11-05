import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import resendVerification from '../auth/resendVerification'

export default mutationWithClientMutationId({
  name: 'ResendVerification',
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
  mutateAndGetPayload: ({ email }) => resendVerification({ email }),
})
