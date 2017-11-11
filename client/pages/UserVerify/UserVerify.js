import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import { compose, flattenProp } from 'recompose'
import { defineMessages, FormattedMessage } from 'react-intl'

import Wrapper from './Wrapper'
import Form from './Form'
import ResendVerificationButton from './ResendVerificationButton'
import TextInput from '../../components/Input/FormsyText'
import Button from '../../components/Button'

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

class UserVerifyPage extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      email: PropTypes.string.isRequired,
    }).isRequired,
    router: routerShape.isRequired,
    relay: PropTypes.shape({
      environment: PropTypes.any.isRequired,
    }).isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }

  state = {
    isLoading: false,
    hasResentVerification: false,
    canSubmit: false,
  }

  setFormElement = (element) => {
    this.formElement = element
  }

  getResendVerificationMessage = hasResentVerification => hasResentVerification
    ? messages.hasResentVerification
    : messages.resendVerification

  enableButton = () => {
    this.setState({
      canSubmit: true,
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    })
  }

  verify = ({ email, pin }) => {
    const environment = this.props.relay.environment
    VerifyAccountMutation.commit({
      environment,
      input: { email, pin },
      onCompleted: () => this.props.router.go(-1),
      onError: (errors) => {
        console.error('verification failed', errors[0])
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
    })
  }

  resendVerification = () => {
    this.setState({ isLoading: true })
    const { email } = this.props.params
    const environment = this.props.relay.environment
    ResendVerificationMutation.commit({
      environment,
      input: { email },
      onCompleted: () => {
        this.setState({
          isLoading: false,
          hasResentVerification: true,
        })
      },
      onError: (errors) => {
        console.error('verification failed', errors[0])
      },
    })
  }

  render() {
    const { isLoggedIn, router, params } = this.props
    if (isLoggedIn) {
      router.push('/')
      return <div />
    }

    const { hasResentVerification } = this.state
    const resendVerificationMessage = this.getResendVerificationMessage(hasResentVerification)

    return (
      <Wrapper>
        <h2>Verify your account</h2>

        <Form
          ref={this.setFormElement}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onSubmit={this.verify}
        >
          <TextInput
            name="email"
            value={params.email}
            label="E-Mail"
            validations="isEmail"
            validationError="Please enter a valid email address"
            fullWidth
            required
          />

          <TextInput
            name="pin"
            label="Verification PIN"
            fullWidth
            required
          />

          <Button
            type="submit"
            label="Verifiy"
            style={{ marginTop: 20 }}
            disabled={!this.state.canSubmit}
            fullWidth
            secondary
          />
        </Form>

        <ResendVerificationButton
          onClick={this.resendVerification}
        >
          <FormattedMessage {...resendVerificationMessage} />
        </ResendVerificationButton>
      </Wrapper>
    )
  }
}

const enhance = compose(
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
