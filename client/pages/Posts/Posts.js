import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { createPaginationContainer, graphql } from 'react-relay'
import { compose, withHandlers, withProps, flattenProp } from 'recompose'

import PostList from '../../components/PostList'

export const POST_COUNT = 6

const Posts = ({ posts, loadMore, hasMore }) => (
  <div>
    <Helmet>
      <title>Universal Relay Starter Kit - A list of posts</title>
      <meta name="description" content="The description to be displayed in google search results" />
    </Helmet>

    <PostList
      posts={posts.edges}
      hasMore={hasMore}
      onMore={loadMore}
    />
  </div>
)

Posts.propTypes = {
  posts: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
}

const props = withProps(({ relay }) => ({
  hasMore: relay.hasMore(),
}))

const handlers = withHandlers({
  loadMore: ({ relay }) => () => relay.isLoading() || relay.loadMore(POST_COUNT),
})

const enhance = compose(props, handlers, flattenProp('data'))

export default createPaginationContainer(
  enhance(Posts),
  graphql`
    fragment Posts on Query {
      posts (after: $afterCursor first: $count) @connection(key: "Posts_posts") {
        pageInfo {
          hasNextPage
          endCursor
        },
        edges {
          node {
            id
            ...PostTeaser_post
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(_props, { count, cursor }) {
      return {
        afterCursor: cursor,
        count,
      }
    },
    query: graphql`
      query PostsPaginationQuery($afterCursor: String, $count: Int!) {
        ...Posts
      }
    `,
  },
)
