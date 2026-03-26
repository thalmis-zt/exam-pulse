import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function POST({ request, fetch: eventFetch }) {
	try {
		const body = await request.json();
		const { temp_token, otp, new_password } = body;

		if (!temp_token || !otp || !new_password) {
			return json(
				{ detail: 'temp_token, otp, and new_password are required' },
				{ status: 400 }
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

		return json(data);
	} catch (err) {
		return json({ detail: err?.message || 'An unexpected error occurred' }, { status: 500 });
	}
}
