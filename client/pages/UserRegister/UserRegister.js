import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import withRouter from 'found/lib/withRouter'

import Wrapper from './Wrapper'
import UserRegisterBox from '../../components/UserRegisterBox'

import paths, { buildPathWithVariable } from '../../router/paths'

const UserRegisterPage = ({
  onClickLogin,
  onRegisterSuccess,
}) => (
  <Wrapper>
    <UserRegisterBox
      onClickLogin={onClickLogin}
      onRegisterSuccess={onRegisterSuccess}
    />
  </Wrapper>
)

UserRegisterPage.propTypes = {
  onClickLogin: PropTypes.func.isRequired,
  onRegisterSuccess: PropTypes.func.isRequired,
}

const enhance = compose(
  withRouter,
  withHandlers({
    onClickLogin: ({ router }) => () => router.push(paths.login),
    onRegisterSuccess: ({ router }) => email =>
      router.replace(buildPathWithVariable(paths.userVerifyWithEmail, email)),
  }),
)

export default enhance(UserRegisterPage)
