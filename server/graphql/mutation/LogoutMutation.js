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
  mutateAndGetPayload: (obj, { db }, { rootValue }) => {
    /* eslint-disable no-param-reassign */
    rootValue.session.accessToken = null
    rootValue.session.idToken = null
    /* eslint-enable no-param-reassign */
    return { success: true }
  },
})
