import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers, withProps } from 'recompose'
import withRouter from 'found/lib/withRouter'

import Wrapper from './Wrapper'
import UserVerifyBox from '../../components/UserVerifyBox'

import paths from '../../router/paths'

const UserVerifyPage = ({ email, onVerifySuccess }) => (
  <Wrapper>
    <UserVerifyBox
      email={email}
      onVerifySuccess={onVerifySuccess}
    />
  </Wrapper>
)

UserVerifyPage.propTypes = {
  email: PropTypes.string,
  onVerifySuccess: PropTypes.func.isRequired,
}

UserVerifyPage.defaultProps = {
  email: null,
}

const enhance = compose(
  withRouter,
  withProps(({ params }) => ({
    email: params.email,
  })),
  withHandlers({
    onVerifySuccess: ({ router }) => () => router.replace(paths.userLogin),
  }),
)

export default enhance(UserVerifyPage)
