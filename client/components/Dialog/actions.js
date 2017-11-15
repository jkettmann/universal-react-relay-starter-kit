export const DIALOG_IDS = {
  LOGIN: 'login',
  REGISTER: 'register',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_USER: 'verifyUser',
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

export const openLoginDialog = () => showDialog(DIALOG_IDS.LOGIN)
export const openRegisterDialog = () => showDialog(DIALOG_IDS.REGISTER)
export const openResetPasswordDialog = () => showDialog(DIALOG_IDS.RESET_PASSWORD)
export const openVerifyUserDialog = () => showDialog(DIALOG_IDS.VERIFY_USER)
