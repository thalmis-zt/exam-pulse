import { error } from '@sveltejs/kit';
import { getMockTestById } from '$lib/mock-tests/mockTests.catalog.js';

/** Page load only: resolves mock details; unknown IDs → 404. `+page.svelte` passes `data.mock` into dumb components. */
export function load({ params }) {
	const mock = getMockTestById(params.id);
	if (!mock) {
		throw error(404, 'Mock test not found');
	}
	return { mock };
}
