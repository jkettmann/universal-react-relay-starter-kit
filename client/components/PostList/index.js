import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from '../Grid'
import Wrapper from './Wrapper'
import Button from './Button'
import PostTeaser from '../PostTeaser'

const PostList = ({ posts, hasMore, onMore }) => (
  <Wrapper>
    <Grid>
      {
        posts.map(({ node }) => (
          <PostTeaser
            key={node.id}
            post={node}
          />
        ))
      }

    </Grid>

    {hasMore &&
      <Button
        label="More"
        onClick={onMore}
        secondary
        fullWidth
      />
    }
  </Wrapper>
)

PostList.propTypes = {
  onMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  ),
}

PostList.defaultProps = {
  posts: [],
}

export default PostList
