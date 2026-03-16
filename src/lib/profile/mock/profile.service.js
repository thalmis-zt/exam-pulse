/**
 * Profile Mock Service
 * ====================
 * Provides profile page data.
 * Simulates API behavior with a small delay.
 *
 * To integrate with a real backend:
 * 1. Replace the function body with an API call (fetch/axios)
 * 2. Ensure the response matches the schema in profile.schema.js
 * 3. No component changes needed — the interface stays the same
 */

import { user, stats, goals, performance, subjects, recentExams, achievements, leaderboard, account } from './profile.data.js';

/**
 * Fetches all profile page data for the current user.
 * @returns {Promise<import('./profile.schema.js').ProfilePageData>}
 */
export async function getProfileData() {
	await new Promise((resolve) => setTimeout(resolve, 300));

	return {
		user,
		stats,
		goals,
		performance,
		subjects,
		recentExams,
		achievements,
		leaderboard,
		account
	};
}
