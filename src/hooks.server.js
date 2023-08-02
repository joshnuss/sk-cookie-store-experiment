import { setCookies } from '$lib/cookieStore'

export async function handle({ event, resolve }) {
	console.log({headers: event.request.headers.get('cookie')})
	setCookies(event.cookies)
	return await resolve(event)
}