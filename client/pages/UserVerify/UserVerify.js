import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withProps, withState } from 'recompose'
import { defineMessages, FormattedMessage } from 'react-intl'
import { SubmissionError, reduxForm } from 'redux-form'

import Wrapper from './Wrapper'
import Form from './Form'
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

const UserVerifyPage = ({
  valid,
  error,
  hasResentVerification,
  handleSubmit,
  resendVerification,
}) => (
  <Wrapper>
    <h2>Verify your account</h2>

    <Form onSubmit={handleSubmit}>
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
    </Form>

    <ResendVerificationButton
      onClick={resendVerification}
    >
      <FormattedMessage {...getResendVerificationMessage(hasResentVerification)} />
    </ResendVerificationButton>
  </Wrapper>
)

UserVerifyPage.propTypes = {
  valid: PropTypes.bool.isRequired,
  error: PropTypes.string,
  hasResentVerification: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resendVerification: PropTypes.func.isRequired,
}

UserVerifyPage.defaultProps = {
  error: null,
}

const handlers = {
  verify: ({ router }) => ({ email, pin }) =>
    VerifyAccountMutation.commit({ email, pin })
      .then(() => router.replace('/login'))
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
  withProps(({ verify, params }) => ({
    onSubmit: verify,
    initialValues: { email: params && params.email },
  })),
  reduxForm({ form: 'verifyEmail' }),
)

export default enhance(UserVerifyPage)
