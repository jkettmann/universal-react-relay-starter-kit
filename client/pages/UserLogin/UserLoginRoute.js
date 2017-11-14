import { graphql } from 'react-relay'

const query = graphql`
  query UserLoginRoute_Query {
    permission {
      isAnonymous
    }
  }
`

export default {
  render: 'UserLoginPage',
  query,
}
