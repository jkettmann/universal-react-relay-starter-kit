import { GraphQLObjectType, GraphQLString } from 'graphql'

import {
  connectionArgs,
  connectionFromPromisedArray,
  fromGlobalId,
} from 'graphql-relay'

import ViewerType from './ViewerType'
import PostType, { PostConnection } from './PostType'

export default new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    viewer: {
      type: ViewerType,
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
  }),
})
