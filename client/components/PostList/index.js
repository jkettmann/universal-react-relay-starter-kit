import React from 'react'
import PropTypes from 'prop-types'

import { Grid } from '../Grid'
import Button from '../Button'

import Wrapper from './Wrapper'
import PostListItem from '../PostListItem'

const PostList = ({ posts, hasMore, onItemClick, onMore }) => (
  <Wrapper>
    <Grid>
      {
        posts.map(({ node }) => (
          <PostListItem
            key={node.id}
            post={node}
            onClick={() => onItemClick(node.id)}
          />
        ))
      }

    </Grid>

    {hasMore &&
      <div
        style={{
          marginTop: 15,
          width: '100%',
          maxWidth: 400,
          padding: '0 2px 0',
        }}
      >
        <Button
          label="More"
          onClick={onMore}
          secondary
          fullWidth
        />
      </div>}
  </Wrapper>
)

PostList.propTypes = {
  onItemClick: PropTypes.func.isRequired,
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
