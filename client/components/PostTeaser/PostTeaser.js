import React from 'react'
import { createFragmentContainer, graphql } from 'react-relay'
import PropTypes from 'prop-types'
import { flattenProp } from 'recompose'

import Tile from './Tile'
import Link from './Link'
import { AspectRatio, TileContent } from '../Grid'

const PostTeaser = ({ id, image, title }) => (
  <Tile>
    <AspectRatio ratio={0.75}>
      <TileContent>
        <Link to={`/post/${id}`}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={image}
            alt={title}
          />
        </Link>
      </TileContent>
    </AspectRatio>
  </Tile>
)

PostTeaser.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

const enhance = flattenProp('post')

export default createFragmentContainer(
  enhance(PostTeaser),
  graphql`
    fragment PostTeaser_post on Post {
      id
      title
      image
    }
  `,
)
