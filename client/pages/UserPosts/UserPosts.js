import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createPaginationContainer, graphql } from 'react-relay'
import { compose, flattenProp, withHandlers, withProps } from 'recompose'

import PostList from '../../components/PostList'

export const POST_COUNT = 6

const UserPosts = ({ permission, posts, hasMore, loadMore, router }) => {
  if (!permission.isLoggedIn) {
    router.push('/login')
    return <div />
  }

  if (!permission.canPublish) {
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
  permission: PropTypes.shape({
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

const enhance = compose(props, handlers, flattenProp('data'), flattenProp('user'))

export default createPaginationContainer(
  enhance(UserPosts),
  graphql`
    fragment UserPosts on Query {
      permission {
        isLoggedIn
        canPublish
      }
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
      query UserPostsPaginationQuery($afterCursor: String, $count: Int!) {
        ...UserPosts
      }
    `,
  },
)
