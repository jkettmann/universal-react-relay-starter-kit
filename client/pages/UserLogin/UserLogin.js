import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'found/lib/withRouter'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import Formsy from 'formsy-react'

import Wrapper from './Wrapper'
import Bold from './Bold'
import Hint from './Hint'
import FormWraper from './FormWrapper'
import TextInput from '../../components/Input/FormsyText'
import Button from '../../components/Button'

import loginUser from '../../auth/login'
import { ERRORS } from '../../../config'

class LoginPage extends React.Component {
  static propTypes = {
    router: routerShape.isRequired,
    viewer: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
    }).isRequired,
  }

  setFormElement = (element) => {
    this.formElement = element
  }

  login = ({ email, password }) => {
    loginUser({ email, password })
      .then((result) => {
        console.log('successfully logged in', result)
        // this.props.router.go(-1)
      })
      .catch((error) => {
        console.error(ERRORS[error.name])
      })
  }

  render() {
    const { viewer } = this.props
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

        <FormWraper>

          <Button
            label="Login with facebook"
            style={submitMargin}
            href="/facebook"
            external
            fullWidth
            secondary
          />

          <Formsy.Form
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
          </Formsy.Form>

          <Button
            label="Register"
            style={submitMargin}
            to="/register"
            fullWidth
            primary
          />
        </FormWraper>
      </Wrapper>
    )
  }
}

export default createFragmentContainer(
  withRouter(LoginPage),
  graphql`
    fragment UserLogin_viewer on Viewer {
      isLoggedIn
      canPublish
    }
  `,
)
