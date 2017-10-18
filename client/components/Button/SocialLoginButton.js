import { compose, withHandlers } from 'recompose'
import SocialLogin from 'react-social-login'

import Button from './Button'

const enhance = compose(
  SocialLogin,
  withHandlers({
    onClick: ({ triggerLogin }) => () => triggerLogin(),
  }),
)

export default enhance(Button)
