import { json } from '@sveltejs/kit';

/** Matches cookies set in `apis/login/+server.js` */
const AUTH_COOKIE_NAMES = [
	'access_token',
	'refresh_token',
	'token_type',
	'username',
	'user_id',
	'email'
];

function clearAuthCookies(cookies) {
	AUTH_COOKIE_NAMES.forEach((name) => {
		cookies.set(name, '', { path: '/', maxAge: 0 });
	});
}

export async function POST({ cookies }) {
	try {
		clearAuthCookies(cookies);

		const allCookies = cookies.getAll();
		allCookies.forEach(({ name }) => {
			if (!AUTH_COOKIE_NAMES.includes(name)) {
				cookies.set(name, '', { path: '/', maxAge: 0 });
			}
		});

		return json({}, { status: 200 });
	} catch (err) {
		return json({ error: err?.message || 'Logout failed' }, { status: 500 });
	}
}
