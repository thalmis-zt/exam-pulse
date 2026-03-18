/**
 * Quiz Summary Mock Service
 * =============================
 * Provides quiz summary page data.
 * Simulates API behavior with a small delay.
 *
 * To integrate with a real backend:
 * 1. Replace the function body with an API call (fetch/axios)
 * 2. Ensure the response matches the schema in quiz-summary.schema.js
 * 3. No component changes needed — the interface stays the same
 */

import {
	quizResult,
	performanceMetrics,
	timeBreakdownMetrics,
	subjectDeepDive,
	recommendedMocks
} from './quiz-summary.data.js';

/**
 * Fetches quiz summary data for the given test result.
 * @param {string} [testId] - Optional test ID for future API integration
 * @returns {Promise<import('./quiz-summary.schema.js').QuizSummaryPageData>}
 */
export async function getQuizSummaryData(testId) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	// TODO: Replace with real API call when backend is ready
	// const response = await fetch(`/api/tests/${testId}/result`);
	// return response.json();

	return {
		quizResult,
		performanceMetrics,
		timeBreakdownMetrics,
		subjectDeepDive,
		recommendedMocks
	};
}
