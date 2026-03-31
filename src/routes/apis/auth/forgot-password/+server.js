import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function POST({ request, fetch: eventFetch, cookies }) {
	try {
		const body = await request.json();
		const { email } = body;

		if (!email || typeof email !== 'string') {
			return json({ detail: 'Email is required' }, { status: 400 });
		}

		const endpoint = PUBLIC_API_BASE_URL + '/v1/auth/forgot-password';
		const res = await eventFetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email.trim() })
		});

		const data = await res.json().catch(() => ({}));

		if (!res.ok) {
			return json(
				{ detail: data.detail || data.message || 'Failed to send reset code' },
				{ status: res.status }
			);
		}

		if (data.temp_token) {
			cookies.set('forgotPasswordTempToken', data.temp_token, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 600, // 10 minutes
				path: '/'
			});
		}

		const { temp_token, ...responseData } = data;
		return json(responseData);
	} catch (err) {
		return json({ detail: err?.message || 'An unexpected error occurred' }, { status: 500 });
	}
}
