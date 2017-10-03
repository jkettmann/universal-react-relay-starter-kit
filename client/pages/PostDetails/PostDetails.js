import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, flattenProp } from 'recompose'

import Image from './Image'
import ContentWrapper from './ContentWrapper'
import Title from './Title'
import UserInfo from './UserInfo'

const PostDetail = ({ image, title, creator, description }) => (
  <div>
    <Image
      src={image.src}
      alt={title}
    />

    <ContentWrapper>
      <Title>{title}</Title>
      <UserInfo>
        by {creator.firstName} {creator.lastName}
      </UserInfo>

      <div>{description}</div>
    </ContentWrapper>
  </div>
)

PostDetail.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  creator: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
}

const enhance = compose(
  flattenProp('viewer'),
  flattenProp('post'),
)

export default createFragmentContainer(
  enhance(PostDetail),
  graphql`
    fragment PostDetails_viewer on Viewer {
      post (postId: $postId) {
        title
        description
        image {
          src
        }
        creator {
          firstName
          lastName
        }
      }
    }
  `,
)
