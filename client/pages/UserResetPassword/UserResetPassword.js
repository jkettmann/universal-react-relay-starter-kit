import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState, withProps } from 'recompose'
import { SubmissionError, reduxForm } from 'redux-form'

import Wrapper from './Wrapper'
import FormWrapper from './FormWrapper'
import TextField from '../../components/Input/TextField'
import Button from '../../components/Button'
import FormError from '../../components/Input/FormError'

import ResetPasswordMutation from '../../mutation/ResetPasswordMutation'
import ConfirmPasswordMutation from '../../mutation/ConfirmPasswordMutation'

import { ERRORS } from '../../../common/config'
import mapSubmitErrorsToFormErrors from '../../utils/mapSubmitErrorsToFormErrors'

const acceptedErrors = [
  { id: ERRORS.WrongEmailOrVerificationPIN, field: 'email', message: 'The email or verification PIN is wrong' },
  { id: ERRORS.WrongEmailOrVerificationPIN, field: 'pin', message: 'The email or verification PIN is wrong' },
]

const UserResetPasswordPage = ({
  hasSentPin,
  valid,
  error,
  resetPassword,
  handleSubmit,
}) => (
  <Wrapper>
    <h2>Reset your password</h2>

    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <TextField
          name="email"
          label="E-Mail"
          validations="email"
          fullWidth
          required
        />

        {
          hasSentPin && (
            <TextField
              name="pin"
              label="Verification PIN"
              validations="number"
              validateImmediately
              fullWidth
              required
            />
          )
        }

        {
          hasSentPin && (
            <TextField
              name="password"
              label="Password"
              type="password"
              validations="password"
              validateImmediately
              fullWidth
              required
            />
          )
        }

        {error && <FormError>{error}</FormError>}

        <Button
          type="submit"
          label={hasSentPin ? 'Set new password' : 'Send confirmation email'}
          fullWidth
          secondary
        />
      </form>
    </FormWrapper>
  </Wrapper>
)

UserResetPasswordPage.propTypes = {
  hasSentPin: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  resetPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

UserResetPasswordPage.defaultProps = {
  error: null,
}

const handlers = {
  resetPassword: ({ setHasSentPin }) => ({ email }) =>
    ResetPasswordMutation.commit({ email })
      .then(() => {
        setHasSentPin(true)
      })
      .catch((errors) => {
        console.error('password reset failed', errors)
        const formErrors = mapSubmitErrorsToFormErrors(errors, acceptedErrors)
        throw new SubmissionError(formErrors)
      }),
  confirmPassword: ({ router }) => ({ email, pin, password }) =>
    ConfirmPasswordMutation.commit({ email, pin, password })
      .then(() => router.replace('/login'))
      .catch((errors) => {
        console.error('password confirmation failed', errors)
        const formErrors = mapSubmitErrorsToFormErrors(errors, acceptedErrors)
        throw new SubmissionError(formErrors)
      }),
}

const enhance = compose(
  withState('hasSentPin', 'setHasSentPin', false),
  withHandlers(handlers),
  withProps(({ hasSentPin, resetPassword, confirmPassword }) => ({
    onSubmit: hasSentPin ? confirmPassword : resetPassword,
  })),
  reduxForm({ form: 'resetPassword' }),
)

export default enhance(UserResetPasswordPage)
