import { GraphQLNonNull, GraphQLString } from 'graphql'
import {
  mutationWithClientMutationId,
  cursorForObjectInConnection,
} from 'graphql-relay'

import UserType from '../type/UserType'
import { PostConnection } from '../type/PostType'

export default mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    postEdge: {
      type: PostConnection.edgeType,
      resolve: (newPost, args, { db }) => ({
        cursor: db.getPosts().then(posts => cursorForObjectInConnection(posts, newPost)),
        node: newPost,
      }),
    },
    user: {
      type: UserType,
      resolve: (newPost, args, { db, sessionUser }) =>
        db.getUserById(sessionUser.id),
    },
  },
  mutateAndGetPayload: (data, { db, sessionUser }) => db.createPost(data, sessionUser),
})
