/**
 * Test History Mock Service
 * ============================
 * Provides test history data with filtering, pagination, and recommendations.
 * This is a mock service that simulates API behavior.
 *
 * To integrate with a real backend:
 * 1. Replace function bodies with actual API calls (fetch/axios)
 * 2. Ensure responses match the schema in test-history.schema.js
 * 3. No component changes needed — the interface stays the same
 */

import {
	mockTestHistory,
	mockStats,
	mockRecommendations,
	mockProTips,
	mockDailyAccumulation
} from './test-history.data.js';

/**
 * Fetches paginated test history with optional filters
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @param {import('./test-history.schema.js').SearchFilters} filters - Optional filters
 * @returns {Promise<import('./test-history.schema.js').TestHistoryResponse>}
 * @throws {Error} If filters are invalid or fetch fails
 */
export async function getTestHistory(page = 1, pageSize = 10, filters = {}) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	try {
		if (page < 1) {
			throw new Error('Page number must be at least 1');
		}
		if (pageSize < 1 || pageSize > 50) {
			throw new Error('Page size must be between 1 and 50');
		}

		let filtered = [...mockTestHistory];

		// Apply subject filter
		if (filters.subject) {
			filtered = filtered.filter((t) => t.subject.toLowerCase() === filters.subject.toLowerCase());
		}

		// Apply difficulty filter
		if (filters.difficulty) {
			filtered = filtered.filter(
				(t) => t.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
			);
		}

		// Apply search query
		if (filters.searchQuery) {
			const query = filters.searchQuery.toLowerCase();
			filtered = filtered.filter(
				(t) =>
					t.name.toLowerCase().includes(query) ||
					t.topic.toLowerCase().includes(query) ||
					t.subject.toLowerCase().includes(query)
			);
		}

		// Apply time range filter (simulate by date filtering)
		if (filters.timeRange && filters.timeRange !== 'all') {
			const now = new Date();
			let cutoffDate = new Date();

			switch (filters.timeRange) {
				case '1month':
					cutoffDate.setMonth(now.getMonth() - 1);
					break;
				case '3months':
					cutoffDate.setMonth(now.getMonth() - 3);
					break;
				case '6months':
					cutoffDate.setMonth(now.getMonth() - 6);
					break;
				default:
					cutoffDate = new Date(0); // Very old date
			}

			filtered = filtered.filter((t) => new Date(t.date) >= cutoffDate);
		}

		// Apply sorting
		if (filters.sortBy === 'best') {
			filtered.sort((a, b) => b.score - a.score);
		} else if (filters.sortBy === 'oldest') {
			filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
		} else {
			// Default: sort by recent
			filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
		}

		// Pagination
		const totalCount = filtered.length;
		const totalPages = Math.ceil(totalCount / pageSize);

		if (page > totalPages && totalCount > 0) {
			throw new Error(`Page ${page} out of range. Total pages: ${totalPages}`);
		}

		const startIdx = (page - 1) * pageSize;
		const endIdx = startIdx + pageSize;
		const data = filtered.slice(startIdx, endIdx);

		return {
			data,
			totalCount,
			page,
			pageSize,
			hasMore: page < totalPages
		};
	} catch (error) {
		console.error('[getTestHistory] Error:', error.message);
		throw {
			message: error.message || 'Failed to fetch test history',
			code: 'FETCH_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Fetches overall test statistics
 * @returns {Promise<import('./test-history.schema.js').TestStats>}
 * @throws {Error} If fetch fails
 */
export async function getTestStats() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	try {
		return mockStats;
	} catch (error) {
		console.error('[getTestStats] Error:', error.message);
		throw {
			message: error.message || 'Failed to fetch statistics',
			code: 'FETCH_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Fetches study recommendations based on performance
 * @returns {Promise<import('./test-history.schema.js').Recommendation[]>}
 * @throws {Error} If fetch fails
 */
export async function getRecommendations() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 250));

	try {
		return mockRecommendations;
	} catch (error) {
		console.error('[getRecommendations] Error:', error.message);
		throw {
			message: error.message || 'Failed to fetch recommendations',
			code: 'FETCH_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Fetches pro tips for studying
 * @returns {Promise<Array>}
 * @throws {Error} If fetch fails
 */
export async function getProTips() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	try {
		return mockProTips;
	} catch (error) {
		console.error('[getProTips] Error:', error.message);
		throw {
			message: error.message || 'Failed to fetch pro tips',
			code: 'FETCH_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Fetches daily quiz accumulation data for charts
 * @returns {Promise<import('./test-history.schema.js').DailyAccumulation[]>}
 * @throws {Error} If fetch fails
 */
export async function getDailyAccumulation() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	try {
		return mockDailyAccumulation;
	} catch (error) {
		console.error('[getDailyAccumulation] Error:', error.message);
		throw {
			message: error.message || 'Failed to fetch daily data',
			code: 'FETCH_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Retries (reattempts) a quiz
 * @param {string} testId - Test ID to retry
 * @returns {Promise<{success: boolean, message: string, testId: string}>}
 * @throws {Error} If retry fails
 */
export async function retryTest(testId) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 150));

	try {
		if (!testId) {
			throw new Error('Test ID is required');
		}

		// TODO: Navigate to test attempt page once routing is ready
		return {
			success: true,
			message: 'Test restarted successfully',
			testId
		};
	} catch (error) {
		console.error('[retryTest] Error:', error.message);
		throw {
			message: error.message || 'Failed to start test',
			code: 'RETRY_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Reviews a completed test
 * @param {string} testId - Test ID to review
 * @returns {Promise<{success: boolean, message: string, testId: string}>}
 * @throws {Error} If review fails
 */
export async function reviewTest(testId) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 150));

	try {
		if (!testId) {
			throw new Error('Test ID is required');
		}

		// TODO: Navigate to test review page once routing is ready
		return {
			success: true,
			message: 'Opening test review',
			testId
		};
	} catch (error) {
		console.error('[reviewTest] Error:', error.message);
		throw {
			message: error.message || 'Failed to review test',
			code: 'REVIEW_ERROR',
			statusCode: 400
		};
	}
}
