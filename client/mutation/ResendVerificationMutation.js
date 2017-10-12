import { commitMutation, graphql } from 'react-relay'

const mutation = graphql`
  mutation ResendVerificationMutation($input: ResendVerificationInput!) {
    resendVerification(input: $input) {
      success
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
