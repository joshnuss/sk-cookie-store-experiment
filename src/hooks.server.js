import { setCookies } from '$lib/cookieStore'
import { storage } from '$lib/localStorage'

export function handle({ event, resolve }) {
  return storage.run(event.cookies, () => {
    return resolve(event)
  })
}
