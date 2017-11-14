import { GraphQLObjectType, GraphQLID, GraphQLBoolean } from 'graphql'

import { ROLES } from '../../config'

export default new GraphQLObjectType({
  name: 'Permission',
  fields: () => ({
    id: {
      type: GraphQLID,
      // set a constant id to allow Relay to update its store after mutations
      resolve: () => 'permission',
    },
    isAnonymous: {
      type: GraphQLBoolean,
      resolve: (obj, args, { sessionUser }) => !sessionUser.id,
    },
    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: (obj, args, { sessionUser }) =>
        sessionUser.role === ROLES.reader ||
        sessionUser.role === ROLES.publisher ||
        sessionUser.role === ROLES.admin,
    },
    canPublish: {
      type: GraphQLBoolean,
      resolve: (obj, args, { sessionUser }) =>
        sessionUser.role === ROLES.admin || sessionUser.role === ROLES.publisher,
    },

  }),
})
