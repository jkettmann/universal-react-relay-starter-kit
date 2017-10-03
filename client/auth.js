const HOST_AUTH = process.env.HOST_AUTH

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
  }).then(response =>
    !response.ok,
  )
}
