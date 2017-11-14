import { graphql } from 'react-relay'
import { createMutation } from 'relay-compose'

const mutation = graphql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createPost(input: $input) {
      postEdge {
        node {
          id
          title
          description
          image
        }
      }
    }
  }
`

function commit(input) {
  const variables = { input }
  return createMutation(mutation, variables)
}
export default {
  commit,
}
