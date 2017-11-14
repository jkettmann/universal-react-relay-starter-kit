import { graphql } from 'react-relay'

const POST_COUNT = 6

const query = graphql`
  query UserPostsRoute_Query ($afterCursor: String, $count: Int!) {
    ...UserPosts
    permission {
      canPublish
    }
  }
`

export default {
  render: 'UserPostsPage',
  permission: 'canPublish',
  query,
  prepareVariables: params => ({
    ...params,
    count: POST_COUNT,
    afterCursor: null,
  }),
}
