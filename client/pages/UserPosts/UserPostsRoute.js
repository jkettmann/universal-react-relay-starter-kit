import { graphql } from 'react-relay'

const POST_COUNT = 6

const query = graphql`
  query UserPostsRoute_Query ($afterCursor: String, $count: Int!) {
    ...UserPosts
    permission {
      isLoggedIn
    }
  }
`

export default {
  render: 'UserPostsPage',
  query,
  prepareVariables: params => ({
    ...params,
    count: POST_COUNT,
    afterCursor: null,
  }),
}
