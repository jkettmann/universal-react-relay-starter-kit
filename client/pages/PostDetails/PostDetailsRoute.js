import { graphql } from 'react-relay'

const query = graphql`
  query PostDetailsRoute_Query($postId: String!) {
    viewer {
      ...PostDetails_viewer
    }
  }
`

export default {
  path: '/post/:postId',
  render: 'PostDetailsPage',
  query,
}
