import { graphql } from 'react-relay'

const query = graphql`
  query PostDetailsRoute_Query($postId: String!) {
    ...PostDetails
  }
`

export default {
  render: 'PostDetailsPage',
  query,
}
