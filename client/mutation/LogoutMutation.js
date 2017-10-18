import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation LogoutMutation($input: LogoutInput!) {
    logout(input: $input) {
      success
    }
  }
`

function commit({ environment, onCompleted, onError }) {
  const variables = { input: {} }

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
