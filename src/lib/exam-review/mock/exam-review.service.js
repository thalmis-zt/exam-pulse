/**
 * Exam review mock service — completed attempts only (real API later).
 */

import { getQuizAttemptData } from '$lib/quiz-attempt/mock/quiz-attempt.service.js';

/**
 * Deterministic correct key per question for mock review UI.
 * @param {string} questionId
 * @returns {string}
 */
function mockCorrectLabel(questionId) {
	const n = parseInt(questionId.replace(/\D/g, ''), 10) || 0;
	const labels = ['A', 'B', 'C', 'D'];
	return labels[n % 4];
}

/**
 * @param {string} attemptId
 * @returns {Promise<import('../exam-review.schema.js').ExamReviewData>}
 */
export async function getExamReviewData(attemptId) {
	await new Promise((resolve) => setTimeout(resolve, 250));

	const attempt = await getQuizAttemptData(attemptId);
	const questions = attempt.questions;

	/** @type {Record<string, string>} */
	const correctAnswers = {};
	for (const q of questions) {
		correctAnswers[q.id] = mockCorrectLabel(q.id);
	}

	const userAnswers = { ...attempt.answers };

	let correctCount = 0;
	let wrongCount = 0;
	let unansweredCount = 0;
	for (const q of questions) {
		const ua = userAnswers[q.id] ?? null;
		const ca = correctAnswers[q.id];
		if (ua == null) unansweredCount++;
		else if (ua === ca) correctCount++;
		else wrongCount++;
	}

	const total = questions.length;
	const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

	return {
		testId: attemptId,
		status: 'completed',
		title: attempt.title,
		section: attempt.section,
		completedAt: new Date().toISOString(),
		durationSeconds: attempt.durationSeconds,
		totalQuestions: total,
		correctCount,
		wrongCount,
		unansweredCount,
		scorePercent,
		questions,
		userAnswers,
		correctAnswers
	};
}
