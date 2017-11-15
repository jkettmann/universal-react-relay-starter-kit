export const DIALOG_IDS = {
  LOGIN: 'login',
  REGISTER: 'register',
  RESET_PASSWORD: 'resetPassword',
  VERIFY_USER: 'verifyUser',
}

export const openDialog = (id, options) => {
  if (!Object.values(DIALOG_IDS).includes(id)) {
    console.error(`Dialog with id "${id}" not supported`)
  }

  return {
    type: 'OPEN_DIALOG',
    dialogId: id,
    options,
  }
}

export const closeDialog = () => ({
  type: 'CLOSE_DIALOG',
})

export const openLoginDialog = email => openDialog(DIALOG_IDS.LOGIN, { email })
export const openRegisterDialog = () => openDialog(DIALOG_IDS.REGISTER)
export const openResetPasswordDialog = () => openDialog(DIALOG_IDS.RESET_PASSWORD)
export const openVerifyUserDialog = email => openDialog(DIALOG_IDS.VERIFY_USER, { email })
