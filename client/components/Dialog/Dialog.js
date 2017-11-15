import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import Overlay from './Overlay'

import * as actions from './actions'

const Dialog = ({ openDialogId }) => (
  <Overlay active={!!openDialogId}>
    <div>
      {openDialogId}
    </div>
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
