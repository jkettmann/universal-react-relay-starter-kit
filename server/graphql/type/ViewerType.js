import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql'
import {
  connectionArgs,
  connectionFromPromisedArray,
  fromGlobalId,
} from 'graphql-relay'

import UserType from './UserType'
import PostType, { PostConnection } from './PostType'

import { ROLES } from '../../config'

export default new GraphQLObjectType({
  name: 'Viewer',
  fields: () => ({
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
    user: {
      type: UserType,
      // tokenData origins from a cookie containing session data
      // and is set in server/authentication.js
      resolve: (obj, args, { db, user }) =>
        db.getUserById(user.id),
    },
    posts: {
      type: PostConnection.connectionType,
      args: connectionArgs,
      resolve: (obj, args, { db }) => connectionFromPromisedArray(db.getPosts(), args),
    },
    post: {
      type: PostType,
      args: {
        postId: { type: GraphQLString },
      },
      resolve: (obj, { postId }, { db }) => db.getPost(fromGlobalId(postId).id),
    },
  }),
})
