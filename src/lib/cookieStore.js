import { writable } from 'svelte/store'
import { browser } from '$app/environment'

let cookies

export function persisted(key, initial) {
	const raw = getCookie(key)
	console.log({key, raw, initial})
	const initialValue = raw ? JSON.parse(raw) : initial
	const store = writable(initialValue)

	store.subscribe(value => {
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
		  .split("; ")
		  .find((row) => row.startsWith(`${key}=`))
		  ?.split("=")[1];
	}

	console.log({ getCookie: cookies.getAll() })
	return cookies.get(key)
}

function setCookie(key, value) {
	console.log('setCookie', {key, value})
	const raw = JSON.stringify(value)
	const expires = new Date()
	expires.setFullYear(expires.getFullYear() + 1)
	
	if (browser) {
		console.log('setting cookie ' + key)
		console.log(`${key}=${raw}; Expires=${expires.toString()}; SameSite=Strict; Secure`)
		document.cookie = `${key}=${raw}; Expires=${expires.toString()}; SameSite=Strict; Secure`;
		return
	}

	cookies.set(key, raw, {
		expires,
		sameSite: true,
		secure: true
	})
}