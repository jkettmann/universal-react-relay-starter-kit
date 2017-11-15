import { connect } from 'react-redux'

import UserRegisterBox from '../UserRegisterBox'
import {
  openLoginDialog,
  openVerifyUserDialog,
} from './actions'

const mapDispatchToProps = dispatch => ({
  onClickLogin: () => dispatch(openLoginDialog()),
  onRegisterSuccess: email => dispatch(openVerifyUserDialog(email)),
})

export default connect(null, mapDispatchToProps)(UserRegisterBox)
