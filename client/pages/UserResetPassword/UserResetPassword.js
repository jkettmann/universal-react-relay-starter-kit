import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import withRouter from 'found/lib/withRouter'

import Wrapper from './Wrapper'
import UserResetPasswordBox from '../../components/UserResetPasswordBox'

import paths from '../../router/paths'

const UserResetPasswordPage = ({ onResetPasswordSuccess }) => (
  <Wrapper>
    <UserResetPasswordBox
      onResetPasswordSuccess={onResetPasswordSuccess}
    />
  </Wrapper>
)

UserResetPasswordPage.propTypes = {
  onResetPasswordSuccess: PropTypes.func.isRequired,
}

const enhance = compose(
  withRouter,
  withHandlers({
    onResetPasswordSuccess: ({ router }) => () => router.replace(paths.userLogin),
  }),
)

export default enhance(UserResetPasswordPage)
