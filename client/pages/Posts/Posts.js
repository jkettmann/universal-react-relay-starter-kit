import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { Helmet } from 'react-helmet'
import { createPaginationContainer, graphql } from 'react-relay'

import PostList from '../../components/PostList'

export const POST_COUNT = 6

const Posts = ({ viewer, router, relay }) => (
  <div>
    <Helmet>
      <title>Universal Relay Starter Kit - A list of posts</title>
      <meta name="description" content="The description to be displayed in google search results" />
    </Helmet>

    <PostList
      posts={viewer.posts.edges}
      hasMore={relay.hasMore()}
      onItemClick={id => router.push(`/post/${id}`)}
      onMore={() => relay.isLoading() || relay.loadMore(POST_COUNT)}
    />
  </div>
)

Posts.propTypes = {
  relay: PropTypes.shape({
    hasMore: PropTypes.func.isRequired,
    isLoading: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
  }).isRequired,
  router: routerShape.isRequired,
  viewer: PropTypes.shape({
    posts: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }).isRequired,
}

export default createPaginationContainer(
  Posts,
  graphql`
    fragment Posts_viewer on Viewer {
      posts (after: $afterCursor first: $count) @connection(key: "Posts_posts") {
        pageInfo {
          hasNextPage
          endCursor
        },
        edges {
          node {
            id
            ...PostListItem_post
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.posts
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      }
    },
    getVariables(props, { count, cursor }) {
      return {
        afterCursor: cursor,
        count,
      }
    },
    query: graphql`
      query PostsPaginationQuery($afterCursor: String, $count: Int!) {
        viewer {
          ...Posts_viewer
        }
      }
    `,
  },
)
