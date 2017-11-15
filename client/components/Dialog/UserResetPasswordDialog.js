import { connect } from 'react-redux'

import UserResetPasswordBox from '../UserResetPasswordBox'
import {
  openLoginDialog,
} from './actions'

const mapStateToProps = state => ({
  email: state.dialog.options && state.dialog.options.email,
})

const mapDispatchToProps = dispatch => ({
  onResetPasswordSuccess: email => dispatch(openLoginDialog(email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserResetPasswordBox)
