import { GraphQLObjectType, GraphQLString } from 'graphql'
import {
  connectionArgs,
  connectionFromPromisedArray,
  globalIdField,
} from 'graphql-relay'

import { PostConnection } from './PostType'

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    email: {
      description: 'the users email address',
      type: GraphQLString,
    },
    firstName: {
      description: 'the users first name',
      type: GraphQLString,
    },
    lastName: {
      description: 'the users last name',
      type: GraphQLString,
    },
    role: {
      description: 'the users role',
      type: GraphQLString,
    },
    posts: {
      type: PostConnection.connectionType,
      args: connectionArgs,
      resolve: (obj, args, { db, user }) =>
        connectionFromPromisedArray(db.getPostsForCreator(user), args),
    },
  },
})
