import { storage } from '$lib/cookieStore'

export function handle({ event, resolve }) {
  return storage.run(event.cookies, () => {
    return resolve(event)
  })
}
