import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { routerShape } from 'found/lib/PropTypes'

import Wrapper from './Wrapper'
import Form from './Form'
import TextInput from '../../components/Input/FormsyText'
import ImageInput from '../../components/Input/ImageInput'
import Button from '../../components/Button'
import CreatePostMutation from '../../mutation/CreatePostMutation'

class CreatePostPage extends React.Component {
  static propTypes = {
    router: routerShape.isRequired,
    relay: PropTypes.shape({
      environment: PropTypes.any.isRequired,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = {
      canSubmit: false,
    }
  }

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  }

  createPost = ({ title, description, image }) => {
    const environment = this.props.relay.environment

    CreatePostMutation.commit({
      environment,
      input: { title, description, image },
      onCompleted: () => this.props.router.push('/user/posts'),
      onError: errors => console.error('Creating post Failed', errors[0]),
    })
  }

  render() {
    return (
      <Wrapper>
        <h2>Create Post</h2>

        <Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onSubmit={this.createPost}
        >

          <TextInput
            name="title"
            label="Title"
            validations="isWords"
            validationError="Please enter a title"
            fullWidth
            required
          />

          <TextInput
            name="description"
            label="Description"
            validations="isWords"
            validationError="Please enter a description"
            fullWidth
            required
          />

          <ImageInput
            label="Select Image"
            name="image"
            style={{ marginTop: 20 }}
            validations="isExisty"
            validationError="Please select an image"
            fullWidth
          />

          <Button
            type="submit"
            label="Save post"
            style={{ marginTop: 20 }}
            disabled={!this.state.canSubmit}
            secondary
            fullWidth
          />
        </Form>
      </Wrapper>
    )
  }
}

export default createFragmentContainer(
  CreatePostPage,
  graphql`
    fragment UserCreatePost_viewer on Viewer {
      canPublish
    }
  `,
)
