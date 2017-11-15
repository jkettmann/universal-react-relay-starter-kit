import { connect } from 'react-redux'

import UserLoginBox from '../UserLoginBox'
import {
  openRegisterDialog,
  openResetPasswordDialog,
  closeDialog,
} from './actions'

const mapStateToProps = state => ({
  email: state.dialog.options && state.dialog.options.email,
})

const mapDispatchToProps = dispatch => ({
  onClickRegister: () => dispatch(openRegisterDialog()),
  onClickResetPassword: () => dispatch(openResetPasswordDialog()),
  onLoginSuccess: () => dispatch(closeDialog()),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserLoginBox)
