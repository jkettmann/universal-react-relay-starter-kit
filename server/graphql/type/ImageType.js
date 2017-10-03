import { GraphQLObjectType, GraphQLString } from 'graphql'
import dotenv from 'dotenv'

dotenv.config()

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL

const ImageType = new GraphQLObjectType({
  name: 'Image',
  description: 'An image',
  fields: () => ({
    src: {
      type: GraphQLString,
      description: 'The posts image',
      resolve: image => `${IMAGE_BASE_URL}/${image.fileKey}`,
    },
  }),
})

export default ImageType
