import { graphql } from 'react-relay'
import { createMutation } from 'relay-compose'

const mutation = graphql`
  mutation ResetPasswordMutation($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
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
