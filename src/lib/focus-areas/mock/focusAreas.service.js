/**
 * Focus Areas Mock Service
 * =======================
 * Provides focus areas data to the page.
 * This is a mock service that simulates API behavior.
 *
 * To integrate with a real backend:
 * 1. Replace the function body with an API call (fetch/axios)
 * 2. Ensure the response matches the schema in focusAreas.schema.js
 * 3. No component changes needed — the interface stays the same
 */

import { user, summary, boosters, gaps, mistakeLog, learningTips } from './focusAreas.data.js';

/**
 * Fetches focus areas data for the current user.
 * Simulates a backend API response with a small delay.
 *
 * @returns {Promise<import('./focusAreas.schema.js').FocusAreasPageData>}
 * @throws {Error} If data retrieval fails
 */
export async function getFocusAreasData() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	// Assemble the complete response
	return {
		user,
		summary,
		scoreBoosters: boosters,
		knowledgeGaps: gaps,
		mistakeLog,
		learningTips
	};
}

/**
 * Optional: Service function to track when user marks a mistake as reviewed
 * (Future: API integration)
 * @param {string} mistakeId - ID of the mistake to mark as reviewed
 */
export async function markMistakeAsReviewed(mistakeId) {
	console.log(`[Mock] Marking mistake ${mistakeId} as reviewed`);
	// TODO: Replace with real API call
	return { success: true };
}

/**
 * Optional: Service function to trigger targeted practice for a focus area
 * (Future: API integration)
 * @param {string} focusAreaId - ID of the focus area to practice
 */
export async function startTargetedPractice(focusAreaId) {
	console.log(`[Mock] Starting targeted practice for focus area ${focusAreaId}`);
	// TODO: Replace with real API call
	return { success: true };
}
