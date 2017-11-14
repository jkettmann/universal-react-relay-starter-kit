const generalFormErrorKey = '_error'

function mapToFieldErrors(errorId, acceptedErrors) {
  if (!acceptedErrors || !acceptedErrors.find(({ id }) => id === errorId)) {
    return { [generalFormErrorKey]: 'An unknown error has occured. Please try again later.' }
  }

  return acceptedErrors.reduce((fieldErrors, acceptedError) => {
    if (acceptedError.id === errorId) {
      const errorKey = acceptedError.field || generalFormErrorKey
      return {
        [errorKey]: acceptedError.message,
        ...fieldErrors,
      }
    }
    return fieldErrors
  }, {})
}

export default function (errors, acceptedErrors) {
  if (errors instanceof Array) {
    return errors.reduce(
      (fieldErrors, error) => mapToFieldErrors(error.message, acceptedErrors),
      {},
    )
  }

  return mapToFieldErrors(errors, acceptedErrors)
}
