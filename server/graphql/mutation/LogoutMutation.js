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
  mutateAndGetPayload: (obj, { resetSessionUser }) => {
    resetSessionUser()
    return { success: true }
  },
})
