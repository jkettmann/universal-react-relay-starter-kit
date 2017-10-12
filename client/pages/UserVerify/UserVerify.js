import React from 'react'
import PropTypes from 'prop-types'
import { routerShape } from 'found/lib/PropTypes'
import { createFragmentContainer, graphql } from 'react-relay'
import { defineMessages, FormattedMessage } from 'react-intl'

import Wrapper from './Wrapper'
import Form from './Form'
import ResendVerificationButton from './ResendVerificationButton'
import TextInput from '../../components/Input/FormsyText'
import Button from '../../components/Button'

import resendVerification from '../../auth/resendVerification'
import verifyAccount from '../../auth/verify'

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
    viewer: PropTypes.shape({
      isLoggedIn: PropTypes.bool,
    }).isRequired,
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
    this.setState({ isLoading: true })
    verifyAccount({ email, pin })
      .then(() => {
        this.setState({ isLoading: false })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  resendVerification = () => {
    this.setState({ isLoading: true })
    const { email } = this.props.params
    resendVerification({ email })
      .then(() => {
        this.setState({
          isLoading: false,
          hasResentVerification: true,
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  render() {
    const { viewer, router, params } = this.props
    if (viewer.isLoggedIn) {
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

const container = createFragmentContainer(
  UserVerifyPage,
  graphql`
    fragment UserVerify_viewer on Viewer {
      isLoggedIn
    }
  `,
)

export default container
