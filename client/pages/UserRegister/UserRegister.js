import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import Formsy from 'formsy-react'

import Wrapper from './Wrapper'
import FormWrapper from './FormWrapper'
import TextInput from '../../components/Input/FormsyText'
import Button from '../../components/Button'
import RegisterMutation from '../../mutation/RegisterMutation'

import { ERRORS } from '../../../config'

class RegisterPage extends React.Component {
  static propTypes = {
    router: routerShape.isRequired,
    relay: PropTypes.shape({
      environment: PropTypes.any.isRequired,
    }).isRequired,
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
    const environment = this.props.relay.environment

    RegisterMutation.commit({
      environment,
      input: { email, password, firstName, lastName },
      onCompleted: () => this.props.router.push('/login'),
      onError: (errors) => {
        console.error('Registration Failed', errors[0])
        const formError = {}
        switch (errors[0]) {
          case ERRORS.EmailAlreadyTaken:
            formError.email =
              'This email address is already taken.'
            break
          default:
            break
        }
        this.formElement.updateInputsWithError(formError)
      },
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

        <FormWrapper>
          <Button
            label="Register with facebook"
            href="/facebook"
            style={{ marginTop: 20 }}
            external
            fullWidth
            secondary
          />

          <Formsy.Form
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
          </Formsy.Form>

          <Button
            label="Login"
            style={{ marginTop: 20 }}
            to="/login"
            fullWidth
            primary
          />
        </FormWrapper>
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
