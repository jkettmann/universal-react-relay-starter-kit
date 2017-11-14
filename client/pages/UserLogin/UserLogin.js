import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'found/lib/withRouter'
import { routerShape } from 'found/lib/PropTypes'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, flattenProp, setPropTypes, withHandlers } from 'recompose'
import { SubmissionError } from 'redux-form'

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
  login: ({ router }) => ({ email, password, facebookToken }) =>
    LoginMutation.commit({ email, password, facebookToken })
      .then((result, errors) => {
        if (!errors) {
          router.replace('/')
          return
        }

        console.error('login failed', errors[0])
        throw new SubmissionError(errors[0])
      }),
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
  isLoggedIn: PropTypes.bool.isRequired,
}

const enhance = compose(
  withRouter,
  fragment(graphql`
    fragment UserLogin on Query {
      permission {
        isLoggedIn
        canPublish
      }
    }
  `),
  setPropTypes(propTypes),
  withHandlers(loginHandlers),
  withHandlers(facebookHandlers),
  flattenProp('data'),
  flattenProp('permission'),
)

export default enhance(UserLoginPage)
