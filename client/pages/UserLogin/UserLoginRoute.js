import { graphql } from 'react-relay'

const query = graphql`
  query UserLoginRoute_Query {
    viewer {
      ...UserLogin_viewer
    }
  }
`

export default {
  render: 'UserLoginPage',
  query,
}
