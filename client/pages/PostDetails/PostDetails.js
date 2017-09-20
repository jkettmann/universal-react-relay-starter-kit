import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay'

const Image = styled.img`
  width: 100%;
`

const ContentWrapper = styled.div`
  padding: 10px;
`

const Title = styled.h1`
  margin: 0;
`

const UserInfo = styled.div`
  margin-bottom: 20px;
`

const PostDetail = ({ viewer }) => (
  <div>
    <Image
      src={viewer.post.image}
      alt={viewer.post.title}
    />

    <ContentWrapper>
      <Title>{viewer.post.title}</Title>
      <UserInfo>
        by {viewer.post.creator.firstName} {viewer.post.creator.lastName}
      </UserInfo>

      <div>{viewer.post.description}</div>
    </ContentWrapper>
  </div>
)

PostDetail.propTypes = {
  viewer: PropTypes.shape({
    post: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      creator: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
}

export default createFragmentContainer(
  PostDetail,
  graphql`
    fragment PostDetails_viewer on Viewer {
      post (postId: $postId) {
        title
        description
        image
        creator {
          firstName
          lastName
        }
      }
    }
  `,
)
