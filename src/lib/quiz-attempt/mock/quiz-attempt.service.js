/**
 * Quiz Attempt Mock Service
 * =========================
 * Fetches quiz attempt data for a given test ID.
 */

import { geometryAssessmentQuestions } from './quiz-attempt.data.js';

/**
 * Fetches quiz attempt data for a test session
 *
 * @param {string} testId - Test session ID
 * @returns {Promise<import('./quiz-attempt.schema.js').QuizAttemptData>}
 */
export async function getQuizAttemptData(testId) {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const questions = geometryAssessmentQuestions;
	const questionStatuses = {};
	const answers = {};

	// Initialize statuses: first 3 answered, 4th current, 8th marked
	questions.forEach((q, i) => {
		const idx = i + 1;
		if (idx <= 3) questionStatuses[q.id] = 'answered';
		else if (idx === 4) questionStatuses[q.id] = 'current';
		else if (idx === 8) questionStatuses[q.id] = 'marked';
		else questionStatuses[q.id] = 'not-visited';
	});

	// Sample answers for first 3 questions
	answers[questions[0].id] = 'B';
	answers[questions[1].id] = 'B';
	answers[questions[2].id] = 'B';
	answers[questions[3].id] = 'B'; // Current question selected

	return {
		testId,
		title: 'Geometry Assessment',
		section: 'Section B: Advanced Properties',
		totalQuestions: questions.length,
		durationSeconds: 3 * 60 * 60, // 3 hours
		questions,
		questionStatuses,
		answers
	};
}
