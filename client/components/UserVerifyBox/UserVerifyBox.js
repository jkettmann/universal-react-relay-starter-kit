import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { defineMessages, FormattedMessage } from 'react-intl'
import { SubmissionError, reduxForm } from 'redux-form'

import Box from '../Box'
import TextField from '../../components/Input/TextField'
import Button from '../../components/Button'
import FormError from '../../components/Input/FormError'
import ResendVerificationButton from './ResendVerificationButton'

import ResendVerificationMutation from '../../mutation/ResendVerificationMutation'
import VerifyAccountMutation from '../../mutation/VerifyAccountMutation'

import { ERRORS } from '../../../common/config'
import mapSubmitErrorsToFormErrors from '../../utils/mapSubmitErrorsToFormErrors'

const acceptedErrors = [
  { id: ERRORS.WrongEmailOrVerificationPIN, field: 'email', message: 'The email or verification PIN is wrong' },
  { id: ERRORS.WrongEmailOrVerificationPIN, field: 'pin', message: 'The email or verification PIN is wrong' },
]

const messages = defineMessages({
  resendVerification: {
    id: 'User.Verify.resendPIN',
    defaultMessage: 'Send new verification PIN',
  },
  hasResentVerification: {
    id: 'User.Verify.hasResentPIN',
    defaultMessage: 'A new PIN has been sent to you',
  },
})

const getResendVerificationMessage = hasResentVerification => hasResentVerification
  ? messages.hasResentVerification
  : messages.resendVerification

const UserVerifyBox = ({
  valid,
  error,
  hasResentVerification,
  handleSubmit,
  resendVerification,
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

      <TextField
        name="pin"
        label="Verification PIN"
        validations="number"
        validateImmediately
        fullWidth
        required
      />

      {error && <FormError>{error}</FormError>}

      <Button
        type="submit"
        label="Verifiy"
        disabled={!valid}
        fullWidth
        secondary
      />
    </form>

    <ResendVerificationButton
      onClick={resendVerification}
    >
      <FormattedMessage {...getResendVerificationMessage(hasResentVerification)} />
    </ResendVerificationButton>
  </Box>
)

UserVerifyBox.propTypes = {
  valid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  hasResentVerification: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resendVerification: PropTypes.func.isRequired,
}

UserVerifyBox.defaultProps = {
  error: null,
}

const handlers = {
  verify: ({ onVerifySuccess }) => ({ email, pin }) =>
    VerifyAccountMutation.commit({ email, pin })
      .then(() => onVerifySuccess(email))
      .catch((errors) => {
        console.error('verification failed', errors)
        const formErrors = mapSubmitErrorsToFormErrors(errors, acceptedErrors)
        throw new SubmissionError(formErrors)
      }),
  resendVerification: ({ params, setIsLoading, setHasResentVerification }) => () => {
    setIsLoading(true)
    return ResendVerificationMutation.commit({ email: params.email })
      .then(() => {
        setIsLoading(false)
        setHasResentVerification(true)
      })
      .catch((errors) => {
        setIsLoading(false)
        console.error(errors)
      })
  },
}

const enhance = compose(
  withState('isLoading', 'setIsLoading', false),
  withState('hasResentVerification', 'setHasResentVerification', false),
  withHandlers(handlers),
  withProps(({ verify, email }) => ({
    onSubmit: verify,
    initialValues: { email },
  })),
  reduxForm({ form: 'verifyEmail' }),
)

export default enhance(UserVerifyBox)
