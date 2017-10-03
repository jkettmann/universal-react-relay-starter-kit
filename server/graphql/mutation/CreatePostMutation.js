import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql'
import { mutationWithClientMutationId } from 'graphql-relay'

import ImageInputType from './ImageInputType'
import PostType from '../type/PostType'

export default mutationWithClientMutationId({
  name: 'CreatePost',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The posts title',
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The posts description',
    },
    image: {
      type: new GraphQLNonNull(ImageInputType),
      description: 'The posts image file key',
    },
  },
  outputFields: {
    post: {
      type: PostType,
      resolve: newPost => newPost,
      description: 'The created post',
    },
  },
  mutateAndGetPayload: (data, { db }, { rootValue: { tokenData } }) =>
    db.createPost(data, tokenData),
})
