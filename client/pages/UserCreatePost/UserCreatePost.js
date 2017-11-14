import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, withHandlers } from 'recompose'

import Wrapper from './Wrapper'
import Form from './Form'
import CreatePostMutation from '../../mutation/CreatePostMutation'

const UserCreatePostPage = ({ createPost }) => (
  <Wrapper>
    <h2>Create Post</h2>

    <Form onSubmit={createPost} />
  </Wrapper>
)

UserCreatePostPage.propTypes = {
  createPost: PropTypes.func.isRequired,
}

const handlers = {
  createPost: ({ relay, router }) => ({ title, description, image }) => {
    const environment = relay.environment

    CreatePostMutation.commit({
      environment,
      input: { title, description, image },
      onCompleted: (result, errors) => {
        if (!errors) {
          router.push('/user/posts')
          return
        }
        console.error('create post', errors)
      },
      onError: error => console.error('Creating post failed', error),
    })
  },
}

const enhance = compose(
  withHandlers(handlers),
)

export default createFragmentContainer(
  enhance(UserCreatePostPage),
  graphql`
    fragment UserCreatePost on Query {
      permission {
        canPublish
      }
    }
  `,
)
