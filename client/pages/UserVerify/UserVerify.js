import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-relay'
import { fragment } from 'relay-compose'
import { compose, flattenProp, withHandlers, withState } from 'recompose'
import { defineMessages, FormattedMessage } from 'react-intl'
import { SubmissionError } from 'redux-form'

import Wrapper from './Wrapper'
import Form from './Form'
import ResendVerificationButton from './ResendVerificationButton'

import ResendVerificationMutation from '../../mutation/ResendVerificationMutation'
import VerifyAccountMutation from '../../mutation/VerifyAccountMutation'
import { ERRORS } from '../../../common/config'

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

const UserVerifyPage = ({ hasResentVerification, verify, resendVerification, params }) => (
  <Wrapper>
    <h2>Verify your account</h2>

    <Form
      initialValues={{ email: params && params.email }}
      onSubmit={verify}
    />

    <ResendVerificationButton
      onClick={resendVerification}
    >
      <FormattedMessage {...getResendVerificationMessage(hasResentVerification)} />
    </ResendVerificationButton>
  </Wrapper>
)

UserVerifyPage.propTypes = {
  params: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  hasResentVerification: PropTypes.bool.isRequired,
  verify: PropTypes.func.isRequired,
  resendVerification: PropTypes.func.isRequired,
}

const handlers = {
  verify: ({ router }) => ({ email, pin }) =>
    VerifyAccountMutation.commit({ email, pin })
      .then((result, errors) => {
        if (!errors) {
          router.replace('/login')
          return
        }

        console.error('verification failed', errors)
        // const formError = {}
        // switch (errors[0]) {
        //   case ERRORS.WrongEmailOrVerificationPIN:
        //     formError.email = 'Email or password is incorrect'
        //     formError.pin = 'Email or verification PIN is incorrect'
        //     break
        //   default:
        //     break
        // }
        throw new SubmissionError(errors[0])
      }),
  resendVerification: ({ params, setIsLoading, setHasResentVerification }) => () => {
    setIsLoading(true)
    return ResendVerificationMutation.commit({ email: params.email })
      .then((result, errors) => {
        setIsLoading(false)
        if (!errors) {
          setHasResentVerification(true)
        } else {
          throw new SubmissionError(errors[0])
        }
      })
  },
}

const enhance = compose(
  fragment(graphql`
    fragment UserVerify on Query {
      permission {
        isLoggedIn
      }
    }
  `),
  withState('isLoading', 'setIsLoading', false),
  withState('hasResentVerification', 'setHasResentVerification', false),
  withHandlers(handlers),
  flattenProp('data'),
  flattenProp('permission'),
)

export default enhance(UserVerifyPage)
