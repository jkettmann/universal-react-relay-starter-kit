import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { AspectRatio, Tile, TileContent } from '../Grid'

// ${props => props.theme.media.tablet`width: 50%`};
// ${props => props.theme.media.tablet`width: 25%`};

const StyledTile = styled(Tile)`
  width: 100%;

  ${props => props.theme.media.tablet`width: 50%`};
  ${props => props.theme.media.desktop`width: 33.33%`};
  ${props => props.theme.media.giant`width: 25%`};
`

const PostListItem = ({ post, onClick }) => (
  <StyledTile onClick={onClick}>
    <AspectRatio ratio={0.75}>
      <TileContent>
        <img
          style={{ width: '100%', height: '100%' }}
          src={post.image}
          alt={post.title}
        />
      </TileContent>
    </AspectRatio>
  </StyledTile>
)

PostListItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default createFragmentContainer(
  PostListItem,
  graphql`
    fragment PostListItem_post on Post {
      title
      image
    }
  `,
)
