import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import withRouter from 'found/lib/withRouter'

import Wrapper from './Wrapper'
import UserLoginBox from '../../components/UserLoginBox'

import paths from '../../router/paths'

const UserLoginPage = ({
  onClickRegister,
  onClickResetPassword,
  onLoginSuccess,
}) => (
  <Wrapper>
    <UserLoginBox
      onClickRegister={onClickRegister}
      onClickResetPassword={onClickResetPassword}
      onLoginSuccess={onLoginSuccess}
    />
  </Wrapper>
)

UserLoginPage.propTypes = {
  onClickRegister: PropTypes.func.isRequired,
  onClickResetPassword: PropTypes.func.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
}

const enhance = compose(
  withRouter,
  withHandlers({
    onClickRegister: ({ router }) => () => router.push(paths.userRegister),
    onClickResetPassword: ({ router }) => () => router.push(paths.resetPassword),
    onLoginSuccess: ({ router }) => () => router.push(paths.home),
  }),
)

export default enhance(UserLoginPage)
