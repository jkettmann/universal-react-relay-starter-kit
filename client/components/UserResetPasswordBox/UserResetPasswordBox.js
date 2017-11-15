import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withState, withProps } from 'recompose'
import { SubmissionError, reduxForm } from 'redux-form'

import Box from '../Box'
import TextField from '../Input/TextField'
import Button from '../Button'
import FormError from '../Input/FormError'

import ResetPasswordMutation from '../../mutation/ResetPasswordMutation'
import ConfirmPasswordMutation from '../../mutation/ConfirmPasswordMutation'

import { ERRORS } from '../../../common/config'
import mapSubmitErrorsToFormErrors from '../../utils/mapSubmitErrorsToFormErrors'

const acceptedErrors = [
  { id: ERRORS.WrongEmailOrVerificationPIN, field: 'email', message: 'The email or verification PIN is wrong' },
  { id: ERRORS.WrongEmailOrVerificationPIN, field: 'pin', message: 'The email or verification PIN is wrong' },
]

const UserResetPasswordBox = ({
  hasSentPin,
  error,
  handleSubmit,
}) => (
  <Box>
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
        label={hasSentPin ? 'Set new password' : 'Reset password'}
        fullWidth
        secondary
      />
    </form>
  </Box>
)

UserResetPasswordBox.propTypes = {
  hasSentPin: PropTypes.bool.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
}

UserResetPasswordBox.defaultProps = {
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
  confirmPassword: ({ onResetPasswordSuccess }) => ({ email, pin, password }) =>
    ConfirmPasswordMutation.commit({ email, pin, password })
      .then(() => onResetPasswordSuccess(email))
      .catch((errors) => {
        console.error('password confirmation failed', errors)
        const formErrors = mapSubmitErrorsToFormErrors(errors, acceptedErrors)
        throw new SubmissionError(formErrors)
      }),
}

const enhance = compose(
  withState('hasSentPin', 'setHasSentPin', false),
  withHandlers(handlers),
  withProps(({ email, hasSentPin, resetPassword, confirmPassword }) => ({
    initialValues: { email },
    onSubmit: hasSentPin ? confirmPassword : resetPassword,
  })),
  reduxForm({ form: 'resetPassword' }),
)

export default enhance(UserResetPasswordBox)
