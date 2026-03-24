import { SUBJECT_DETAIL_BY_ID } from './subject-detail.data.js';

/**
 * @param {string} id - Route param / subject identifier (e.g. mathematics, chemistry)
 * @returns {Promise<import('./subject-detail.schema.js').SubjectDetail>}
 */
export async function getSubjectDetail(id) {
	const normalized = String(id || '')
		.trim()
		.toLowerCase();
	await new Promise((r) => setTimeout(r, 120));
	const data = SUBJECT_DETAIL_BY_ID[normalized];
	if (!data) {
		const err = new Error('Subject not found');
		// @ts-ignore
		err.code = 'NOT_FOUND';
		throw err;
	}
	return structuredClone(data);
}
