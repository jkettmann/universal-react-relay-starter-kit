const initialState = {
  openDialogId: null,
}

const openDialog = (state, { dialogId, options }) => ({
  ...state,
  openDialogId: dialogId,
  options,
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
