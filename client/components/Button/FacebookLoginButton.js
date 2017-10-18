import PropTypes from 'prop-types'
import { compose, withProps, setPropTypes } from 'recompose'

import SocialLoginButton from './SocialLoginButton'

const propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
  onLoginFailure: PropTypes.func.isRequired,
}

const enhance = compose(
  setPropTypes(propTypes),
  withProps(() => ({
    provider: 'facebook',
    appId: process.env.FACEBOOK_APP_ID,
  })),
)

export default enhance(SocialLoginButton)
