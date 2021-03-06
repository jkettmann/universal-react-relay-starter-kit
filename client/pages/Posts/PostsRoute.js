import { graphql } from 'react-relay'

const POST_COUNT = 6

const query = graphql`
  query PostsRoute_Query ($afterCursor: String, $count: Int!) {
    ...Posts
  }
`

export default {
  render: 'PostsPage',
  query,
  prepareVariables: params => ({
    ...params,
    count: POST_COUNT,
    afterCursor: null,
  }),
}
