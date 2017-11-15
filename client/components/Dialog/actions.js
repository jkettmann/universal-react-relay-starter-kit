export const DIALOG_IDS = {
  LOGIN: 'login',
}

export const showDialog = (id) => {
  if (!Object.values(DIALOG_IDS).include(id)) {
    console.error(`Dialog with id "${id}" not supported`)
  }

  return {
    type: 'OPEN_DIALOG',
    dialogId: id,
  }
}

export const closeDialog = () => ({
  type: 'CLOSE_DIALOG',
})
