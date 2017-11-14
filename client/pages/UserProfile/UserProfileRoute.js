import { graphql } from 'react-relay'

const query = graphql`
  query UserProfileRoute_Query {
    ...UserProfile
    permission {
      isLoggedIn
    }
  }
`

export default {
  render: 'UserProfilePage',
  permission: 'isLoggedIn',
  query,
}
