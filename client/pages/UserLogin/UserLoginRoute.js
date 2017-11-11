import { graphql } from 'react-relay'

const query = graphql`
  query UserLoginRoute_Query {
    ...UserLogin
  }
`

export default {
  render: 'UserLoginPage',
  query,
}
