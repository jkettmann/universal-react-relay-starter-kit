import { commitMutation, graphql } from 'react-relay'

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

function commit({ environment, input, onCompleted, onError }) {
  const variables = { input }

  commitMutation(environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  })
}
export default {
  commit,
}
