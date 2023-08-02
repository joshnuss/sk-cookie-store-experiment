import { storage } from './localStorage'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export function persisted(key, initial) {
  const json = getCookie(key)
  const initialValue = json ? JSON.parse(json) : initial
  const store = writable(initialValue)

  store.subscribe((value) => {
    setCookie(key, value)
  })

  return store
}

function getCookie(key) {
  if (browser) {
    return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${key}=`))
      ?.split('=')[1]
  }

  return serverCookies().get(key)
}

function setCookie(key, value) {
  const json = JSON.stringify(value)
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  if (browser) {
    document.cookie = `${key}=${json}; Expires=${expires.toString()}; SameSite=Strict; Secure; Path=/`
    return
  }

  serverCookies().set(key, json, {
    expires,
    sameSite: true,
    secure: true,
    httpOnly: false,
    path: '/'
  })
}

export function serverCookies() {
  return storage.getStore()
}
