import { writable } from 'svelte/store'
import { browser } from '$app/environment'

let cookies

export function persisted(key, initial) {
  const json = getCookie(key)
  console.log({ key, json, initial })
  const initialValue = json ? JSON.parse(json) : initial
  const store = writable(initialValue)

  store.subscribe((value) => {
    setCookie(key, value)
  })

  return store
}

export function setCookies(value) {
  if (browser) {
    throw Error('server only')
  }
  cookies = value
}

function getCookie(key) {
  if (browser) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split('=')[1]
  }

  return cookies.get(key)
}

function setCookie(key, value) {
  const json = JSON.stringify(value)
  console.log('setCookie', { key, value, json })
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  if (browser) {
    document.cookie = `${key}=${json}; Expires=${expires.toString()}; SameSite=Strict; Secure; Path=/`
    return
  }

  cookies.set(key, json, {
    expires,
    sameSite: true,
    secure: true,
    httpOnly: false,
    path: '/'
  })
}
