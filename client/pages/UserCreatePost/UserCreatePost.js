import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, withHandlers } from 'recompose'
import { SubmissionError } from 'redux-form'

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
  createPost: ({ router }) => ({ title, description, image }) =>
    CreatePostMutation.commit({ title, description, image })
      .then((result, errors) => {
        if (!errors) {
          router.push('/user/posts')
          return
        }
        console.error('create post', errors)
        throw new SubmissionError(errors[0])
      }),
}

const enhance = compose(
  fragment(graphql`
    fragment UserCreatePost on Query {
      permission {
        canPublish
      }
    }
  `),
  withHandlers(handlers),
)

export default enhance(UserCreatePostPage)
