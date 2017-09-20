import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

import RegisterMutation from '../../mutation/RegisterMutation'
import { ERRORS } from '../../../config'

const Wrapper = styled.div`
  margin-top: 50px;
  text-align: center;
`

const Form = styled(Formsy.Form)`
  width: 200px;
  margin-left: auto;
  margin-right: auto;
`

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

  goToLogin = () => {
    this.props.router.push('/login')
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
    if (this.props.viewer.isLoggedIn) {
      this.props.router.push('/')
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

          <FormsyText
            name="email"
            floatingLabelText="E-Mail"
            fullWidth
            validations="isEmail"
            validationError="Please enter a valid email address"
            required
          />

          <FormsyText
            name="password"
            type="password"
            floatingLabelText="Passwort"
            fullWidth
            validations="minLength:5"
            validationError="Please enter at least 5 characters"
            required
          />

          <FormsyText
            name="firstName"
            floatingLabelText="First Name"
            fullWidth
            validations="isWords"
            validationError="Please enter your first name"
            required
          />

          <FormsyText
            name="lastName"
            floatingLabelText="Last Name"
            fullWidth
            validations="isWords"
            validationError="Please enter your last name"
            required
          />

          <RaisedButton
            type="submit"
            label="Register"
            secondary
            fullWidth
            style={{ marginTop: 20 }}
            disabled={!this.state.canSubmit}
          />

          <RaisedButton
            label="Login"
            primary
            fullWidth
            style={{ marginTop: 20 }}
            onClick={this.goToLogin}
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
