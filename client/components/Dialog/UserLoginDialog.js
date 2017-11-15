import { connect } from 'react-redux'

import UserLoginBox from '../UserLoginBox'
import {
  openRegisterDialog,
  openResetPasswordDialog,
  closeDialog,
} from './actions'

const mapDispatchToProps = dispatch => ({
  onClickRegister: () => dispatch(openRegisterDialog()),
  onClickResetPassword: () => dispatch(openResetPasswordDialog()),
  onLoginSuccess: () => dispatch(closeDialog()),
})

export default connect(null, mapDispatchToProps)(UserLoginBox)
