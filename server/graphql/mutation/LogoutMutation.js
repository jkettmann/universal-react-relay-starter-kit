import { GraphQLBoolean } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

export default mutationWithClientMutationId({
  name: 'Logout',
  outputFields: {
    success: {
      type: GraphQLBoolean,
      resolve: ({ success }) => success,
    },
  },
  mutateAndGetPayload: (obj, { session }) => {
    /* eslint-disable no-param-reassign */
    session.userId = null
    session.role = null
    session.accessToken = null
    session.refreshToken = null
    /* eslint-enable no-param-reassign */
    return { success: true }
  },
})
