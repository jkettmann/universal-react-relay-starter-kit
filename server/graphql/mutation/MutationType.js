import { GraphQLObjectType } from 'graphql'

import RegisterMutation from '../mutation/RegisterMutation'
import CreatePostMutation from '../mutation/CreatePostMutation'

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    register: RegisterMutation,
    createPost: CreatePostMutation,
  }),
})
