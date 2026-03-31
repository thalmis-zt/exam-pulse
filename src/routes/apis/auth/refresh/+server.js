import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

const AUTH_COOKIE_OPTIONS = {
	httpOnly: true,
	sameSite: 'strict',
	secure: process.env.NODE_ENV === 'production',
	path: '/'
};

/** Matches cookies set in `apis/login/+server.js` */
function clearAuthCookies(cookies) {
	const authCookieNames = [
		'access_token',
		'refresh_token',
		'token_type',
		'username',
		'user_id',
		'email'
	];
	authCookieNames.forEach((name) => {
		cookies.set(name, '', { path: '/', maxAge: 0 });
	});
}

/**
 * POST /apis/auth/refresh
 */
export async function POST({ cookies, fetch: eventFetch }) {
	try {
		const refreshToken = cookies.get('refresh_token');

		if (!refreshToken) {
			clearAuthCookies(cookies);
			return json({ error: 'Refresh token missing or expired' }, { status: 401 });
		}

		const endpoint = PUBLIC_API_BASE_URL + '/v1/auth/refresh';
		const res = await eventFetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ refresh_token: refreshToken })
		});

		if (res.status === 401) {
			clearAuthCookies(cookies);
			const body = await res.json().catch(() => ({}));
			const detail = body?.detail;
			const msg =
				typeof detail === 'string'
					? detail
					: 'Invalid, expired, or revoked refresh token';
			return json({ error: msg }, { status: 401 });
		}

		if (!res.ok) {
			return new Response(res.body, { status: res.status });
		}

		const data = await res.json();

		if (!data.access_token) {
			clearAuthCookies(cookies);
			return json({ error: 'Invalid refresh response: missing access_token' }, { status: 500 });
		}

		const expiresInSec = typeof data.expires_in === 'number' ? data.expires_in : 60 * 15;

		cookies.set('access_token', data.access_token, {
			...AUTH_COOKIE_OPTIONS,
			maxAge: expiresInSec
		});

		const tokenType = data.token_type || 'bearer';
		cookies.set('token_type', tokenType, {
			...AUTH_COOKIE_OPTIONS,
			maxAge: expiresInSec
		});

		if (data.refresh_token) {
			cookies.set('refresh_token', data.refresh_token, {
				...AUTH_COOKIE_OPTIONS,
				maxAge: 60 * 60 * 24 * 14
			});
		}

		return json({
			access_token: data.access_token,
			token_type: tokenType,
			expires_in: expiresInSec
		});
	} catch (err) {
		clearAuthCookies(cookies);
		return json({ error: err?.message || 'Failed to refresh token' }, { status: 500 });
	}
}
