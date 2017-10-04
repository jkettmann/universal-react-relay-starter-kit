const HOST_AUTH = process.env.HOST_AUTH

export const loginWithFacebookRoute = `${HOST_AUTH}/login/facebook`

export function login({ email, password }) {
  return fetch(`${HOST_AUTH}/login/credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(response =>
    response.json(),
  ).then(({ error }) => error)
}

export function register({ email, password, firstName, lastName }) {
  return fetch(`${HOST_AUTH}/register/credentials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
  }).then(response =>
    response.json(),
  ).then(({ error }) =>
    error,
  )
}

export function logout() {
  return fetch(`${HOST_AUTH}/logout`, {
    method: 'POST',
    credentials: 'include',
  }).then((response) => {
    if (response.ok) {
      // redirect to home on success to reload all data
      // eslint-disable-next-line no-undef
      location.assign(`${location.protocol}//${location.host}`)
    }
  })
}
