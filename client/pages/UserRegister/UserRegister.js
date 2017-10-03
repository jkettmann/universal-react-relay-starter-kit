import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'

import Wrapper from './Wrapper'
import Form from './Form'
import TextInput from '../../components/Input/FormsyText'
import Button from '../../components/Button'
import { ERRORS } from '../../../config'

class RegisterPage extends React.Component {
  static propTypes = {
    router: routerShape.isRequired,
    viewer: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = {
      canSubmit: false,
    }
  }

  setFormElement = (element) => {
    this.formElement = element
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

  register = ({ email, password, firstName, lastName }) => {
    fetch('/register/credentials', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    }).then(response =>
      response.json(),
    ).then(({ error }) => {
      if (error) {
        console.error(ERRORS[error.name])
      } else {
        this.props.router.go('/')
      }
    })
  }

  render() {
    const { viewer, router } = this.props
    if (viewer.isLoggedIn) {
      router.push('/')
      return <div />
    }

    return (
      <Wrapper>
        <h2>Register</h2>

        <Form
          ref={this.setFormElement}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onSubmit={this.register}
        >

          <TextInput
            name="email"
            label="E-Mail"
            validations="isEmail"
            validationError="Please enter a valid email address"
            fullWidth
            required
          />

          <TextInput
            name="password"
            type="password"
            label="Passwort"
            validations="minLength:5"
            validationError="Please enter at least 5 characters"
            fullWidth
            required
          />

          <TextInput
            name="firstName"
            label="First Name"
            validations="isWords"
            validationError="Please enter your first name"
            fullWidth
            required
          />

          <TextInput
            name="lastName"
            label="Last Name"
            validations="isWords"
            validationError="Please enter your last name"
            fullWidth
            required
          />

          <Button
            type="submit"
            label="Register"
            style={{ marginTop: 20 }}
            disabled={!this.state.canSubmit}
            fullWidth
            secondary
          />

          <Button
            label="Login"
            style={{ marginTop: 20 }}
            to="/login"
            fullWidth
            primary
          />

        </Form>

      </Wrapper>
    )
  }
}

const container = createFragmentContainer(
  RegisterPage,
  graphql`
    fragment UserRegister_viewer on Viewer {
      isLoggedIn
    }
  `,
)

export default container
