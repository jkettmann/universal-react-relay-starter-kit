import { graphql } from 'react-relay'
import { createMutation } from 'relay-compose'

const mutation = graphql`
  mutation LoginMutation($input: LoginInput!) {
    login(input: $input) {
      user {
        id
      }
      permission {
        isLoggedIn
        canPublish
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
