const initialState = {
  openDialogId: null,
}

const openDialog = (state, { dialogId }) => ({
  ...state,
  openDialogId: dialogId,
})

const closeDialog = state => ({
  ...state,
  openDialogId: null,
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DIALOG':
      return openDialog(state, action)

    case 'CLOSE_DIALOG':
      return closeDialog(state)

    default: return state
  }
}
