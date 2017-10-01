import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'

import Wrapper from './Wrapper'
import Bold from './Bold'
import Hint from './Hint'
import Form from './Form'
import TextInput from '../../components/Input/FormsyText'
import Button from '../../components/Button'
import LoginMutation from '../../mutation/LoginMutation'
import { ERRORS } from '../../../config'

class LoginPage extends React.Component {
  static propTypes = {
    router: routerShape.isRequired,
    relay: PropTypes.shape({
      environment: PropTypes.any.isRequired,
    }).isRequired,
    viewer: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
    }).isRequired,
  }

  setFormElement = (element) => {
    this.formElement = element
  }

  login = ({ email, password }) => {
    fetch('/login/credentials', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(response => {
      console.log('response', response.json())
    })
  }

  render() {
    const { viewer, router } = this.props
    if (viewer.isLoggedIn) {
      this.props.router.push('/')
      return <div />
    }

    const submitMargin = { marginTop: 20 }

    return (
      <Wrapper>
        <h2>Login</h2>

        <Hint>
          You can use <Bold>reader@test.com</Bold>, <Bold>publisher@test.com</Bold>,
          <Bold> publisher2@test.com</Bold> with password <Bold>qwerty</Bold>.
        </Hint>

        <Form
          ref={this.setFormElement}
          onSubmit={this.login}
        >

          <TextInput
            name="email"
            label="E-Mail"
            validations="isEmail"
            validationError="Please enter a valid email address"
            fullWidth
          />

          <TextInput
            type="password"
            name="password"
            label="Passwort"
            fullWidth
          />

          <Button
            type="submit"
            label="Login"
            style={submitMargin}
            fullWidth
            secondary
          />

          <Button
            label="Register"
            style={submitMargin}
            onClick={() => router.push('/register')}
            fullWidth
            primary
          />
        </Form>
      </Wrapper>
    )
  }
}

export default createFragmentContainer(
  LoginPage,
  graphql`
    fragment UserLogin_viewer on Viewer {
      isLoggedIn
      canPublish
    }
  `,
)
