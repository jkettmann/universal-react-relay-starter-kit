import { graphql } from 'react-relay'

const query = graphql`
  query UserProfileRoute_Query {
    viewer {
      ...UserProfile_viewer
    }
  }
`

export default {
  render: 'UserProfilePage',
  query,
}
