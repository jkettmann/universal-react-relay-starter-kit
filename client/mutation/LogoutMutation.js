import { graphql } from 'react-relay'
import { createMutation } from 'relay-compose'

const mutation = graphql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`

function commit() {
  const variables = { input: {} }
  createMutation(mutation, variables)
}

export default {
  commit,
}
