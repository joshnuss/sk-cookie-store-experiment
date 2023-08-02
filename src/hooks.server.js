import { setCookies } from '$lib/cookieStore'

export async function handle({ event, resolve }) {
	setCookies(event.cookies)

	return await resolve(event)
}
