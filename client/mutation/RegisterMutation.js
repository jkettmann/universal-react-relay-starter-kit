import { graphql } from 'react-relay'
import { createMutation } from 'relay-compose'

const mutation = graphql`
  mutation RegisterMutation ($input: RegisterInput!) {
    register(input: $input) {
      user {
        role
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
