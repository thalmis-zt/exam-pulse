import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const accessToken = event.cookies.get('access_token');
	const username = event.cookies.get('username');
	const user_id = event.cookies.get('user_id');

	// Authentication check
	if (accessToken) {
		event.locals.user = {
			isAuthenticated: true,
			username,
			user_id
		};

		// Proceed with the request if authenticated and authorized
		return await resolve(event);
	} else {
		event.locals.user = {
			isAuthenticated: false,
			username: null,
			user_id: null
		};

		// Only check page requests; ignore API route requests
		if (
			!event.url.pathname.startsWith('/apis') &&
			event.url.pathname !== '/login' &&
			event.url.pathname !== '/' &&
			event.url.pathname !== '/register'
		) {
			// Redirect to the login page if not authenticated
			const fromUrl = `${event.url.pathname}${event.url.search}`;
			console.log('Redirecting to login from:', fromUrl);
			throw redirect(302, `/login?redirectTo=${fromUrl}`);
		}

		// Allow API or login page requests
		return await resolve(event);
	}
}
