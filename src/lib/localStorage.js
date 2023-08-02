import { browser } from '$app/environment'

export let storage = undefined

if (!browser) {
  const { AsyncLocalStorage } = await import('node:async_hooks')
  storage = new AsyncLocalStorage()
}
