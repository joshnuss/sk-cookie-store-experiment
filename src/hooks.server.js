import { setCookies } from '$lib/cookieStore'

export function handle({ event, resolve }) {
  setCookies(event.cookies)

  return resolve(event)
}
