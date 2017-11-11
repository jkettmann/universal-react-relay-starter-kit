import { graphql } from 'react-relay'

const query = graphql`
  query PostDetailsRoute_Query($postId: String!) {
    viewer {
      ...PostDetails_viewer
    }
  }
`

export default {
  render: 'PostDetailsPage',
  query,
}
