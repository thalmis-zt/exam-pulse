/**
 * Quiz Summary Mock Data
 * =====================
 * Sample data for UI development.
 * Replace with real API calls via quiz-summary.service.js when backend is ready.
 */

/** @type {import('./quiz-summary.schema.js').QuizResult} */
export const quizResult = {
	quizTitle: 'Biology Basics',
	message:
		"You've conquered 'Biology Basics' with impressive accuracy. Your understanding of fundamental concepts is exceptional.",
	xpEarned: 420
};

/** @type {import('./quiz-summary.schema.js').PerformanceMetrics} */
export const performanceMetrics = {
	correct: 18,
	wrong: 2,
	unattempted: 2,
	bestScore: 18,
	rank: 18,
	percentile: 18,
	total: 20
};

/** @type {import('./quiz-summary.schema.js').TimeBreakdownMetrics} */
export const timeBreakdownMetrics = {
	correctTimeSeconds: 450,
	wrongTimeSeconds: 180,
	unattemptedTimeSeconds: 135
};

/** @type {import('./quiz-summary.schema.js').SubjectResult[]} */
export const subjectDeepDive = [
	{ name: 'Molecular Biology', total: 10, correct: 8, wrong: 2, timeSeconds: 45, iconName: 'BarChart3' },
	{ name: 'Cellular Biology', total: 10, correct: 8, wrong: 2, timeSeconds: 45, iconName: 'Target' }
];

/** @type {import('./quiz-summary.schema.js').MockTest[]} */
export const recommendedMocks = [
	{
		title: 'JEE Main - Full Test 08',
		description: 'Based on the latest exam pattern for 2026.',
		duration: '180 mins',
		questions: '90 Qs',
		users: '12.4k',
		xp: '+150 XP'
	},
	{
		title: 'Physics: Mechanics Master',
		description: 'Intensive focus on Newtonian mechanics and kinematics.',
		duration: '45 mins',
		questions: '30 Qs',
		users: '3.1k',
		xp: '+50 XP'
	},
	{
		title: 'Physics: Mechanics Master',
		description: 'Intensive focus on Newtonian mechanics and kinematics.',
		duration: '45 mins',
		questions: '30 Qs',
		users: '3.1k',
		xp: '+50 XP'
	}
];
