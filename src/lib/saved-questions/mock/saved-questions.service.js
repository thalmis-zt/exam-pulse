/**
 * Saved Questions Mock Service
 * =============================
 * Provides saved questions data to the page with filtering, searching, deletion, and pagination.
 * This is a mock service that simulates API behavior with proper error handling.
 *
 * To integrate with a real backend:
 * 1. Replace function bodies with actual API calls (fetch/axios)
 * 2. Ensure responses match the schema in saved-questions.schema.js
 * 3. No component changes needed — the interface stays the same
 */

import { allQuestions, physicsQuestions, chemistryQuestions, mathsQuestions } from './saved-questions.data.js';

/**
 * Fetches paginated saved questions with optional filters.
 * Simulates a backend API response with a small delay.
 *
 * @param {number} [page=1] - Page number (1-indexed)
 * @param {number} [pageSize=10] - Questions per page
 * @param {import('./saved-questions.schema.js').SearchFilters} [filters=null] - Optional filters
 * @returns {Promise<import('./saved-questions.schema.js').SavedQuestionsResponse>}
 * @throws {Error} If page is invalid or data retrieval fails
 *
 * @example
 * const response = await getSavedQuestions(1, 10, { subject: 'Physics' });
 */
export async function getSavedQuestions(page = 1, pageSize = 10, filters = null) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	try {
		// Validate input
		if (page < 1) {
			throw new Error('Page number must be at least 1');
		}
		if (pageSize < 1 || pageSize > 50) {
			throw new Error('Page size must be between 1 and 50');
		}

		// Apply filters
		let filtered = allQuestions;

		if (filters?.subject) {
			filtered = filtered.filter((q) => q.subject === filters.subject);
		}

		if (filters?.difficulty) {
			filtered = filtered.filter((q) => q.difficulty === filters.difficulty);
		}

		// Apply search query if provided
		if (filters?.query) {
			const query = filters.query.toLowerCase();
			filtered = filtered.filter(
				(q) =>
					q.text.toLowerCase().includes(query) ||
					q.topic.toLowerCase().includes(query) ||
					q.subject.toLowerCase().includes(query)
			);
		}

		// Sort by savedAt descending (most recent first)
		filtered = filtered.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

		// Calculate pagination
		const totalCount = filtered.length;
		const totalPages = Math.ceil(totalCount / pageSize);

		// Validate page
		if (page > totalPages && totalCount > 0) {
			throw new Error(`Page ${page} out of range. Total pages: ${totalPages}`);
		}

		// Get page data
		const startIdx = (page - 1) * pageSize;
		const endIdx = startIdx + pageSize;
		const questions = filtered.slice(startIdx, endIdx);

		return {
			questions,
			totalCount,
			page,
			pageSize,
			hasMore: page < totalPages
		};
	} catch (error) {
		console.error('[getSavedQuestions] Error:', error.message);
		throw {
			message: error.message || 'Failed to fetch saved questions',
			code: 'FETCH_ERROR',
			statusCode: 400
		};
	}
}

/**
 * Searches saved questions by query string and optional filters.
 * Performs case-insensitive search across question text, topic, and subject.
 *
 * @param {string} query - Search query string
 * @param {import('./saved-questions.schema.js').SearchFilters} [filters=null] - Optional filters
 * @returns {Promise<import('./saved-questions.schema.js').SavedQuestion[]>}
 * @throws {Error} If search fails
 *
 * @example
 * const results = await searchSavedQuestions('derivative', { subject: 'Maths' });
 */
export async function searchSavedQuestions(query, filters = null) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	try {
		if (!query || query.trim().length === 0) {
			throw new Error('Search query cannot be empty');
		}

		const searchQuery = query.toLowerCase().trim();
		let results = allQuestions.filter(
			(q) =>
				q.text.toLowerCase().includes(searchQuery) ||
				q.topic.toLowerCase().includes(searchQuery) ||
				q.subject.toLowerCase().includes(searchQuery)
		);

		// Apply additional filters if provided
		if (filters?.subject) {
			results = results.filter((q) => q.subject === filters.subject);
		}

		if (filters?.difficulty) {
			results = results.filter((q) => q.difficulty === filters.difficulty);
		}

		// Sort by savedAt descending
		results = results.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

		return results;
	} catch (error) {
		console.error('[searchSavedQuestions] Error:', error.message);
		throw {
			message: error.message || 'Search failed',
			code: 'SEARCH_ERROR',
			statusCode: 500
		};
	}
}

/**
 * Deletes a saved question by ID.
 * Simulates occasional API errors (30% chance) to test error handling and retries.
 *
 * @param {string} questionId - ID of question to delete
 * @returns {Promise<{success: boolean, message: string}>}
 * @throws {Error} If deletion fails
 *
 * @example
 * await deleteSavedQuestion('phys_001');
 */
export async function deleteSavedQuestion(questionId) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	try {
		if (!questionId || questionId.trim().length === 0) {
			throw new Error('Question ID is required');
		}

		// Simulate occasional errors (30% chance) for retry pattern testing
		if (Math.random() < 0.0) {
			// Set to 0.3 to enable error simulation, 0.0 to disable
			throw new Error('Network error: Failed to delete question. Please retry.');
		}

		// Check if question exists
		const exists = allQuestions.some((q) => q.id === questionId);
		if (!exists) {
			throw new Error(`Question with ID ${questionId} not found`);
		}

		// In real API, this would remove from database
		// For mock, just confirm success
		console.log(`[Mock] Deleted question: ${questionId}`);

		return {
			success: true,
			message: `Question ${questionId} deleted successfully`
		};
	} catch (error) {
		console.error('[deleteSavedQuestion] Error:', error.message);
		throw {
			message: error.message || 'Failed to delete question',
			code: 'DELETE_ERROR',
			statusCode: error.message.includes('not found') ? 404 : 500
		};
	}
}

/**
 * Fetches statistics for saved questions by subject.
 *
 * @returns {Promise<import('./saved-questions.schema.js').SubjectStats>}
 * @throws {Error} If fetching stats fails
 *
 * @example
 * const stats = await getSubjectStats();
 * console.log(stats.physics); // 24
 */
export async function getSubjectStats() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	try {
		return {
			physics: physicsQuestions.length,
			chemistry: chemistryQuestions.length,
			maths: mathsQuestions.length,
			total: allQuestions.length
		};
	} catch (error) {
		console.error('[getSubjectStats] Error:', error.message);
		throw {
			message: 'Failed to fetch subject statistics',
			code: 'STATS_ERROR',
			statusCode: 500
		};
	}
}

/**
 * Helper function: Implements pagination logic for an array of data.
 * Extracts a page-sized slice and returns pagination metadata.
 *
 * @param {any[]} data - Array of items to paginate
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {{items: any[], page: number, pageSize: number, totalCount: number, totalPages: number, hasMore: boolean}}
 * @private
 */
export function getPagedData(data, page, pageSize) {
	const totalCount = data.length;
	const totalPages = Math.ceil(totalCount / pageSize);

	const startIdx = (page - 1) * pageSize;
	const endIdx = startIdx + pageSize;
	const items = data.slice(startIdx, endIdx);

	return {
		items,
		page,
		pageSize,
		totalCount,
		totalPages,
		hasMore: page < totalPages
	};
}

/**
 * Optional: Service function to mark a question as read/viewed
 * (Future: API integration for analytics)
 *
 * @param {string} questionId - ID of the question viewed
 * @returns {Promise<{success: boolean}>}
 */
export async function trackQuestionView(questionId) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 100));

	console.log(`[Mock] Tracked view for question: ${questionId}`);
	return { success: true };
}

/**
 * Optional: Service function to export saved questions as PDF/JSON
 * (Future: API integration)
 *
 * @param {string[]} questionIds - Array of question IDs to export
 * @param {'pdf' | 'json'} format - Export format
 * @returns {Promise<Blob>}
 */
export async function exportSavedQuestions(questionIds, format = 'json') {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 500));

	console.log(`[Mock] Exporting ${questionIds.length} questions as ${format}`);
	// In real API, would return actual file blob
	return new Blob(['Mock export data'], { type: 'application/json' });
}
