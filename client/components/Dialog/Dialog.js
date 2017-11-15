import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Overlay from './Overlay'
import UniversalComponent from '../UniversalComponent'

import {
  DIALOG_IDS,
  openDialog as openDialogAction,
  closeDialog as closeDialogAction,
} from './actions'

const dialogComponentNames = {
  [DIALOG_IDS.LOGIN]: 'UserLoginDialog',
  [DIALOG_IDS.REGISTER]: 'UserRegisterDialog',
  [DIALOG_IDS.RESET_PASSWORD]: 'UserResetPasswordBox',
  [DIALOG_IDS.VERIFY_USER]: 'UserVerifyDialog',
}

const getDialogForId = (dialogId, options = null) => {
  if (!dialogId) {
    return null
  }

  const name = dialogComponentNames[dialogId]
  if (!name) {
    console.error(`No dialog component for dialog ${dialogId} found`)
    return null
  }

  return <UniversalComponent name={name} {...options} />
}

const Dialog = ({ openDialogId, options }) => (
  <Overlay active={!!openDialogId}>
    {getDialogForId(openDialogId, options)}
  </Overlay>
)

Dialog.propTypes = {
  openDialogId: PropTypes.string,
  options: PropTypes.object, // eslint-disable-line react/forbid-prop-types
}

Dialog.defaultProps = {
  openDialogId: null,
  options: null,
}

const mapStateToProps = state => ({
  openDialogId: state.dialog.openDialogId,
  options: state.dialog.options,
})

const mapDispatchToProps = dispatch => ({
  openDialog: id => dispatch(openDialogAction(id)),
  closeDialog: () => dispatch(closeDialogAction()),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(Dialog)
