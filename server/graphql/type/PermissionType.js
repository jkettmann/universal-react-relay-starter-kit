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
    isLoggedIn: {
      type: GraphQLBoolean,
      resolve: (obj, args, { user }) =>
        user.role === ROLES.reader ||
        user.role === ROLES.publisher ||
        user.role === ROLES.admin,
    },
    canPublish: {
      type: GraphQLBoolean,
      resolve: (obj, args, { user }) =>
        user.role === ROLES.admin || user.role === ROLES.publisher,
    },

  }),
})
