import { graphql } from 'react-relay'
import { createMutation } from 'relay-compose'


const mutation = graphql`
  mutation VerifyAccountMutation($input: VerifyAccountInput!) {
    verifyAccount(input: $input) {
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
