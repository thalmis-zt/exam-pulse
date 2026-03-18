/**
 * Test Configuration Mock Service
 * ===============================
 * Provides test configuration data to the page.
 * This is a mock service that simulates API behavior.
 *
 * To integrate with a real backend:
 * 1. Replace the function body with an API call (fetch/axios)
 * 2. Ensure the response matches the schema in testConfig.schema.js
 * 3. No component changes needed — the interface stays the same
 */

import { subjects, topics, difficultyLevels, examGuidelines } from './testConfig.data.js';

/**
 * Fetches all available subjects for test configuration
 * Simulates a backend API response with a small delay.
 *
 * @returns {Promise<import('./testConfig.schema.js').Subject[]>}
 * @throws {Error} If data retrieval fails
 */
export async function getSubjects() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	return subjects;
}

/**
 * Fetches topics for a specific subject
 * Topics are filtered by subjectId
 *
 * @param {string} subjectId - The subject ID to fetch topics for
 * @returns {Promise<import('./testConfig.schema.js').Topic[]>}
 * @throws {Error} If data retrieval fails
 */
export async function getTopicsBySubject(subjectId) {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 150));

	if (!subjectId) {
		throw new Error('Subject ID is required');
	}

	return topics.filter((topic) => topic.subjectId === subjectId);
}

/**
 * Fetches all available difficulty levels
 *
 * @returns {Promise<import('./testConfig.schema.js').DifficultyLevel[]>}
 * @throws {Error} If data retrieval fails
 */
export async function getDifficultyLevels() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 150));

	return difficultyLevels;
}

/**
 * Fetches exam guidelines and rules
 *
 * @returns {Promise<import('./testConfig.schema.js').ExamGuideline[]>}
 * @throws {Error} If data retrieval fails
 */
export async function getExamGuidelines() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 150));

	return examGuidelines;
}

/**
 * Retrieves complete test configuration data
 * Fetches subjects, difficulty levels, and guidelines in parallel
 *
 * @returns {Promise<{subjects: import('./testConfig.schema.js').Subject[], difficultyLevels: import('./testConfig.schema.js').DifficultyLevel[], examGuidelines: import('./testConfig.schema.js').ExamGuideline[]}>}
 * @throws {Error} If data retrieval fails
 */
export async function getTestConfigData() {
	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 300));

	return {
		subjects,
		difficultyLevels,
		examGuidelines
	};
}

/**
 * Service function to start a mock test with given configuration
 * (Future: API integration)
 *
 * @param {import('./testConfig.schema.js').TestConfigRequest} config - Test configuration
 * @returns {Promise<{testId: string, message: string}>}
 */
export async function startMockTest(config) {
	console.log('[Mock] Starting mock test with config:', config);

	// Simulate network delay
	await new Promise((resolve) => setTimeout(resolve, 200));

	if (!config.subjectId || !config.topicId || !config.difficultyId) {
		throw new Error('Subject, topic, and difficulty are required');
	}

	if (config.questionCount < 1 || config.questionCount > 100) {
		throw new Error('Question count must be between 1 and 100');
	}

	// Return mock test ID
	return {
		testId: `test_${Date.now()}`,
		message: 'Test started successfully'
	};
}
