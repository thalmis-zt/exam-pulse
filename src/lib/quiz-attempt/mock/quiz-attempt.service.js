/**
 * Quiz Attempt Mock Service
 * =========================
 * Fetches quiz attempt data for a given test ID.
 */

import { geometryAssessmentQuestions, jeeMockQuestions } from './quiz-attempt.data.js';

/**
 * Example: open `/tests/jee-demo/review` for subject-wise review navigation.
 */
function useJeeMock(testId) {
	return /jee/i.test(testId);
}

/**
 * Fetches quiz attempt data for a test session
 *
 * @param {string} testId - Test session ID
 * @returns {Promise<import('./quiz-attempt.schema.js').QuizAttemptData>}
 */
export async function getQuizAttemptData(testId) {
	await new Promise((resolve) => setTimeout(resolve, 300));

	const jee = useJeeMock(testId);
	const questions = jee ? jeeMockQuestions : geometryAssessmentQuestions;
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
		title: jee ? 'JEE Main Mock — Multi-subject' : 'Geometry Assessment',
		section: jee ? 'Physics · Chemistry · Mathematics' : 'Section B: Advanced Properties',
		totalQuestions: questions.length,
		durationSeconds: 3 * 60 * 60, // 3 hours
		questions,
		questionStatuses,
		answers
	};
}
