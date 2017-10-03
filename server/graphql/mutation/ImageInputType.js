import { GraphQLInputObjectType, GraphQLString } from 'graphql'

const ImageInputType = new GraphQLInputObjectType({
  name: 'ImageInput',
  description: 'An image input',
  fields: () => ({
    fileKey: {
      type: GraphQLString,
      description: 'The images fileKey',
    },
  }),
})

export default ImageInputType
