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
  [DIALOG_IDS.LOGIN]: 'UserLoginBox',
  [DIALOG_IDS.REGISTER]: 'UserRegisterBox',
  [DIALOG_IDS.RESET_PASSWORD]: 'UserResetPasswordBox',
  [DIALOG_IDS.VERIFY_USER]: 'UserVerifyBox',
}

const getDialogForId = (dialogId) => {
  if (!dialogId) {
    return null
  }

  const name = dialogComponentNames[dialogId]
  if (!name) {
    console.error(`No dialog component for dialog ${dialogId} found`)
    return null
  }

  return <UniversalComponent name={name} />
}

const Dialog = ({ openDialogId }) => (
  <Overlay active={!!openDialogId}>
    {getDialogForId(openDialogId)}
  </Overlay>
)

Dialog.propTypes = {
  openDialogId: PropTypes.string,
}

Dialog.defaultProps = {
  openDialogId: null,
}

const mapStateToProps = state => ({
  openDialogId: state.dialog.openDialogId,
})

const mapDispatchToProps = dispatch => ({
  openDialog: id => dispatch(openDialogAction(id)),
  closeDialog: () => dispatch(closeDialogAction()),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(Dialog)
