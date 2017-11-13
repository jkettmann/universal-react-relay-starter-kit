import React from 'react'
import PropTypes from 'prop-types'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, flattenProp, withHandlers, withState } from 'recompose'
import { defineMessages, FormattedMessage } from 'react-intl'

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

const UserVerifyPage = ({ hasResentVerification, verify, resendVerification }) => (
  <Wrapper>
    <h2>Verify your account</h2>

    <Form onSubmit={verify} />

    <ResendVerificationButton
      onClick={resendVerification}
    >
      <FormattedMessage {...getResendVerificationMessage(hasResentVerification)} />
    </ResendVerificationButton>
  </Wrapper>
)

UserVerifyPage.propTypes = {
  hasResentVerification: PropTypes.bool.isRequired,
  verify: PropTypes.func.isRequired,
  resendVerification: PropTypes.func.isRequired,
}

const handlers = {
  verify: ({ relay, router }) => ({ email, pin }) => {
    const environment = relay.environment
    VerifyAccountMutation.commit({
      environment,
      input: { email, pin },
      onCompleted: (result, errors) => {
        if (!errors) {
          router.replace('/login')
          return
        }

        console.error('verification failed', errors)
        const formError = {}
        switch (errors[0]) {
          case ERRORS.WrongEmailOrVerificationPIN:
            formError.email = 'Email or password is incorrect'
            formError.pin = 'Email or verification PIN is incorrect'
            break
          default:
            break
        }
        this.formElement.updateInputsWithError(formError)
      },
      onError: (error) => {
        console.error('verification failed', error)
      },
    })
  },
  resendVerification: ({ relay, params, setIsLoading, setHasResentVerification }) => () => {
    setIsLoading(true)
    const { email } = params
    const environment = relay.environment
    ResendVerificationMutation.commit({
      environment,
      input: { email },
      onCompleted: (result, errors) => {
        if (!errors) {
          setHasResentVerification(true)
        } else {
          console.error('verification failed', errors)
        }
        setIsLoading(false)
      },
      onError: (error) => {
        console.error('verification failed', error)
      },
    })
  },
}

const enhance = compose(
  withState('isLoading', 'setIsLoading', false),
  withState('hasResentVerification', 'setHasResentVerification', false),
  withHandlers(handlers),
  flattenProp('data'),
  flattenProp('permission'),
)

const container = createFragmentContainer(
  enhance(UserVerifyPage),
  graphql`
    fragment UserVerify on Query {
      permission {
        isLoggedIn
      }
    }
  `,
)

export default container
