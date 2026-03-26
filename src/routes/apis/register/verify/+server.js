import { json } from '@sveltejs/kit';
import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function POST({ request, fetch: eventFetch }) {
	try {
		const body = await request.json();
		const endpoint = PUBLIC_API_BASE_URL + '/v1/register/verify';

		const res = await eventFetch(endpoint, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		});

		if (res.ok) {
			const data = await res.json().catch(() => ({}));
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
