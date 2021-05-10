const TokenKey = 'Auth-Token'
const UserKey = 'Auth-User'

const storage = global.localStorage

export function getToken () {
  return storage.getItem(TokenKey)
}

export function setToken (token) {
  return storage.setItem(TokenKey, token)
}

export function removeToken () {
  return storage.removeItem(TokenKey)
}

export function getUser () {
  // return JSON.parse(storage.getItem(UserKey))
  return storage.getItem(UserKey)
}

export function setUser (user) {
  // return storage.setItem(UserKey, JSON.stringify(user))
  return storage.setItem(UserKey, user)
}

export function removeUser () {
  return storage.removeItem(UserKey)
}
