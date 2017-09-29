import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createPaginationContainer, graphql } from 'react-relay'
import { compose, flattenProp, withHandlers, withProps } from 'recompose'

import PostList from '../../components/PostList'

export const POST_COUNT = 6

const UserPosts = ({ viewer, posts, hasMore, loadMore, router }) => {
  if (!viewer.isLoggedIn) {
    router.push('/login')
    return <div />
  }

  if (!viewer.canPublish) {
    router.push('/')
    return <div />
  }

  return (
    <div>
      <PostList
        posts={posts.edges}
        hasMore={hasMore}
        onMore={loadMore}
      />
    </div>
  )
}

UserPosts.propTypes = {
  router: routerShape.isRequired,
  viewer: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    canPublish: PropTypes.bool,
  }).isRequired,
  posts: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
  hasMore: PropTypes.bool.isRequired,
  loadMore: PropTypes.func.isRequired,
}

const props = withProps(({ relay }) => ({
  hasMore: relay.hasMore(),
}))

const handlers = withHandlers({
  loadMore: ({ relay }) => () => relay.isLoading() || relay.loadMore(POST_COUNT),
})

const enhance = compose(props, handlers, flattenProp('viewer'), flattenProp('user'))

export default createPaginationContainer(
  enhance(UserPosts),
  graphql`
    fragment UserPosts_viewer on Viewer {
      isLoggedIn
      canPublish
      user {
        posts (after: $afterCursor first: $count) @connection(key: "UserPosts_posts") {
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
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.user && props.viewer.user.posts
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
      query UserPostsPaginationQuery($afterCursor: String, $count: Int!) {
        viewer {
          ...UserPosts_viewer
        }
      }
    `,
  },
)
