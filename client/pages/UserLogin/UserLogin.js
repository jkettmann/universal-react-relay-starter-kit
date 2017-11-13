import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'found/lib/withRouter'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, flattenProp, setPropTypes, withHandlers } from 'recompose'

import Wrapper from './Wrapper'
import Bold from './Bold'
import Hint from './Hint'
import FormWrapper from './FormWrapper'
import Form from './Form'
import Button, { FacebookLoginButton } from '../../components/Button'

import LoginMutation from '../../mutation/LoginMutation'
import { ERRORS } from '../../../common/config'

const UserLoginPage = ({
  onFacebookLoginSuccess,
  onFacebookLoginFailure,
  login,
}) => (
  <Wrapper>
    <h2>Logins</h2>

    <Hint>
      You can use <Bold>reader@test.com</Bold>, <Bold>publisher@test.com</Bold>,
      <Bold> publisher2@test.com</Bold> with password <Bold>qwerty</Bold>.
    </Hint>

    <FormWrapper>

      <FacebookLoginButton
        label="Login with facebook"
        onLoginSuccess={onFacebookLoginSuccess}
        onLoginFailure={onFacebookLoginFailure}
        fullWidth
        secondary
      />

      <Form onSubmit={login} />

      <Button
        label="Register"
        to="/register"
        fullWidth
        primary
      />
    </FormWrapper>
  </Wrapper>
)

UserLoginPage.propTypes = {
  onFacebookLoginSuccess: PropTypes.func.isRequired,
  onFacebookLoginFailure: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
}

const loginHandlers = {
  login: ({ relay, router }) => ({ email, password, facebookToken }) => {
    const environment = relay.environment
    LoginMutation.commit({
      environment,
      input: { email, password, facebookToken },
      onCompleted: () => router.go(-1),
      onError: (errors) => {
        console.error('login failed', errors[0])
        const formError = {}
        switch (errors[0]) {
          case ERRORS.WrongEmailOrPassword:
            formError.email = 'Email or password is incorrect'
            formError.password = 'Email or password is incorrect'
            break
          default:
            break
        }
        this.formElement.updateInputsWithError(formError)
      },
    })
  },
}

const facebookHandlers = {
  onFacebookLoginSuccess: ({ login }) => (result) => {
    const { email } = result.profile
    const { accessToken } = result.token

    login({ email, facebookToken: accessToken })
  },
  onFacebookLoginFailure: (error) => {
    console.log('facebook failure', error)
  },
}

const propTypes = {
  router: routerShape.isRequired,
  relay: PropTypes.shape({
    environment: PropTypes.any.isRequired,
  }).isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}

const enhance = compose(
  withRouter,
  setPropTypes(propTypes),
  withHandlers(loginHandlers),
  withHandlers(facebookHandlers),
  flattenProp('data'),
  flattenProp('permission'),
)

export default createFragmentContainer(
  enhance(UserLoginPage),
  graphql`
    fragment UserLogin on Query {
      permission {
        isLoggedIn
        canPublish
      }
    }
  `,
)
