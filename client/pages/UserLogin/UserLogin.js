import React from 'react'
import PropTypes from 'prop-types'
import withRouter from 'found/lib/withRouter'
import { compose, withHandlers, withProps } from 'recompose'
import { SubmissionError, reduxForm } from 'redux-form'

import Wrapper from './Wrapper'
import Bold from './Bold'
import Hint from './Hint'
import FormWrapper from './FormWrapper'
import TextField from '../../components/Input/TextField'
import Button, { FacebookLoginButton } from '../../components/Button'

import LoginMutation from '../../mutation/LoginMutation'
import { ERRORS } from '../../../common/config'
import mapSubmitErrorsToFormErrors from './mapSubmitErrorsToFormErrors'

const acceptedErrors = [
  { id: ERRORS.WrongEmailOrPassword, field: 'email', message: 'Wrong email or password' },
  { id: ERRORS.WrongEmailOrPassword, field: 'password', message: 'Wrong email or password' },
]

const UserLoginPage = ({
  onFacebookLoginSuccess,
  onFacebookLoginFailure,
  handleSubmit,
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

      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="E-Mail"
          validations="email"
          fullWidth
          required
        />

        <TextField
          type="password"
          name="password"
          label="Passwort"
          fullWidth
          required
        />

        <Button
          type="submit"
          label="Login"
          fullWidth
          secondary
        />
      </form>

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
  handleSubmit: PropTypes.func.isRequired,
}

const loginHandlers = {
  login: ({ router }) => ({ email, password, facebookToken }) =>
    LoginMutation.commit({ email, password, facebookToken })
      .then(() => router.replace('/'))
      .catch((error) => {
        console.error('login failed', error)
        const formErrors = mapSubmitErrorsToFormErrors(error, acceptedErrors)
        throw new SubmissionError(formErrors)
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

const enhance = compose(
  withRouter,
  withHandlers(loginHandlers),
  withHandlers(facebookHandlers),
  withProps(({ login }) => ({ onSubmit: login })),
  reduxForm({ form: 'login' }),
)

export default enhance(UserLoginPage)
