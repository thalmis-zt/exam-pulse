import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function POST({ request, fetch: eventFetch, cookies }) {
	try {
		const body = await request.json();
		const { otp } = body;

		if (!otp) {
			return json(
				{ detail: 'OTP is required' },
				{ status: 400 }
			);
		}

		const temp_token = cookies.get('registrationTempToken');
		if (!temp_token) {
			return json(
				{ detail: 'Session expired. Please register again.' },
				{ status: 401 }
			);
		}

		const endpoint = PUBLIC_API_BASE_URL + '/v1/register/verify';

		const res = await eventFetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				temp_token,
				otp: String(otp).trim()
			})
		});

		if (res.ok) {
			const data = await res.json().catch(() => ({}));

			cookies.delete('registrationTempToken', { path: '/' });

			return json(data, { status: res.status });
		}

		return new Response(res.body, { status: res.status });
	} catch (err) {
		return new Response(JSON.stringify({ error: err?.message || 'Verification failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
}
