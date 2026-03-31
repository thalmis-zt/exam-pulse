import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function POST({ request, fetch: eventFetch, cookies }) {
	try {
		const body = await request.json();
		const { otp, new_password } = body;

		if (!otp || !new_password) {
			return json(
				{ detail: 'otp and new_password are required' },
				{ status: 400 }
			);
		}

		const temp_token = cookies.get('forgotPasswordTempToken');
		if (!temp_token) {
			return json(
				{ detail: 'Session expired. Please start the password reset again.' },
				{ status: 401 }
			);
		}

		const endpoint = PUBLIC_API_BASE_URL + '/v1/auth/reset-password';
		const res = await eventFetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				temp_token,
				otp: String(otp).trim(),
				new_password
			})
		});

		const data = await res.json().catch(() => ({}));

		if (!res.ok) {
			return json(
				{ detail: data.detail || data.message || 'Failed to reset password' },
				{ status: res.status }
			);
		}

		cookies.delete('forgotPasswordTempToken', { path: '/' });

		return json(data);
	} catch (err) {
		return json({ detail: err?.message || 'An unexpected error occurred' }, { status: 500 });
	}
}
