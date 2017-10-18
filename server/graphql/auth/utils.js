import debug from 'debug'

import { ROLES } from './config'

const log = debug('server:authentication')

export function isLoggedIn({ role }) {
  return !!Object.values(ROLES).find(existingRole => existingRole === role)
}

export function canPublish({ role }) {
  return role === ROLES.publisher || role === ROLES.admin
}
