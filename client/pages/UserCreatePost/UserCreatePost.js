import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withProps } from 'recompose'
import { SubmissionError, reduxForm } from 'redux-form'

import Wrapper from './Wrapper'
import Form from './Form'
import TextField from '../../components/Input/TextField'
import ImageField from '../../components/Input/ImageField'
import Button from '../../components/Button'
import CreatePostMutation from '../../mutation/CreatePostMutation'

const UserCreatePostPage = ({ valid, handleSubmit }) => (
  <Wrapper>
    <h2>Create Post</h2>

    <Form onSubmit={handleSubmit}>
      <TextField
        name="title"
        label="Title"
        fullWidth
        required
      />

      <TextField
        name="description"
        label="Description"
        fullWidth
        required
      />

      <ImageField
        label="Select Image"
        name="image"
        style={{ marginTop: 20 }}
        fullWidth
        required
      />

      <Button
        type="submit"
        label="Save post"
        disabled={!valid}
        secondary
        fullWidth
      />
    </Form>
  </Wrapper>
)

UserCreatePostPage.propTypes = {
  valid: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
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
  withHandlers(handlers),
  withProps(({ createPost }) => ({ onSubmit: createPost })),
  reduxForm({ form: 'createPost' }),
)

export default enhance(UserCreatePostPage)
