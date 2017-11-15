import { connect } from 'react-redux'

import UserVerifyBox from '../UserVerifyBox'
import {
  openLoginDialog,
} from './actions'

const mapStateToProps = state => ({
  email: state.dialog.options && state.dialog.options.email,
})

const mapDispatchToProps = dispatch => ({
  onVerifySuccess: email => dispatch(openLoginDialog(email)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UserVerifyBox)
