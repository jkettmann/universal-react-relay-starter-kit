import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import verify from '../auth/verify'

export default mutationWithClientMutationId({
  name: 'VerifyAccount',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    pin: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
  },
  mutateAndGetPayload: ({ email, pin }, { sessionUser }) => verify({ email, pin })
    .then(() => {
      /* eslint-disable no-param-reassign */
      sessionUser.emailVerified = true
      /* eslint-enable no-param-reassign */
      return ({ success: true })
    }),
})
