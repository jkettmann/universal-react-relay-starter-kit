import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Overlay from './Overlay'
import UniversalComponent from '../UniversalComponent'

import * as actions from './actions'

const getDialogForId = (dialogId) => {
  if (!dialogId) return null

  const name = 'UserLoginBox'
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
  openDialog: id => dispatch(actions.openDialog(id)),
  closeDialog: () => dispatch(actions.closeDialog()),
})

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
)

export default enhance(Dialog)
