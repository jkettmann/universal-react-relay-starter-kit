import { graphql } from 'react-relay'

const query = graphql`
  query UserProfileRoute_Query {
    ...UserProfile
  }
`

export default {
  render: 'UserProfilePage',
  query,
}
