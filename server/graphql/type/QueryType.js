import { GraphQLObjectType, GraphQLString } from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray,
  fromGlobalId,
} from 'graphql-relay'

import PermissionType from './PermissionType'
import PostType, { PostConnection } from './PostType'
import UserType from './UserType'

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    permission: {
      type: PermissionType,
      resolve: () => ({}),
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
    user: {
      type: UserType,
      // tokenData origins from a cookie containing session data
      // and is set in server/authentication.js
      resolve: (obj, args, { db, sessionUser }) =>
        db.getUserById(sessionUser.id),
    },
  }),
})
