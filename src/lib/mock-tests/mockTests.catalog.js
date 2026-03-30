/**
 * Mock test catalog — shared IDs for list → exam start → attempt flow.
 * Replace with API-backed data when the backend is ready.
 */

/**
 * @typedef {Object} MockTestCatalogEntry
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} duration
 * @property {string} questions
 * @property {string} users
 * @property {string} xp - Label for dense cards, e.g. "+150 XP"
 * @property {number} rewardXp
 * @property {string} [difficulty]
 * @property {string} [format] - e.g. exam mode / question type summary
 * @property {string[]} instructions - rules shown on the exam start page
 */

/** @type {Record<string, MockTestCatalogEntry>} */
const BY_ID = {
	'jee-main-full-08': {
		id: 'jee-main-full-08',
		title: 'JEE Main – Full Test 08',
		description: 'Based on the latest exam pattern for 2026.',
		duration: '180 mins',
		questions: '90 Qs',
		users: '12.4k users',
		xp: '+150 XP',
		rewardXp: 150,
		difficulty: 'Mixed',
		format: 'Multiple choice, single correct; full syllabus coverage.',
		instructions: [
			'The timer starts as soon as you begin. You cannot pause the exam.',
			'All questions carry equal marks unless stated otherwise on the question.',
			'Switching tabs or leaving fullscreen may be flagged when proctoring is enabled.',
			'Submit before time runs out; auto-submit applies when the clock reaches zero.'
		]
	},
	'physics-mechanics-master': {
		id: 'physics-mechanics-master',
		title: 'Physics: Mechanics Master',
		description: 'Intensive focus on Newtonian mechanics and kinematics.',
		duration: '45 mins',
		questions: '30 Qs',
		users: '3.1k users',
		xp: '+50 XP',
		rewardXp: 50,
		difficulty: 'Medium',
		format: 'Topic-focused practice; mixed conceptual and numerical.',
		instructions: [
			'Use of a rough sheet is allowed; calculators follow exam rules.',
			'Each question has four options with one correct answer.',
			'You can navigate between questions and mark for review before submitting.'
		]
	},
	'speed-math-drill': {
		id: 'speed-math-drill',
		title: 'Speed Mathematics Drill',
		description: 'Based on the latest exam pattern for 2026.',
		duration: '45 mins',
		questions: '30 Qs',
		users: '3.1k users',
		xp: '+25 XP',
		rewardXp: 25,
		difficulty: 'Medium',
		format: 'Rapid-fire quantitative reasoning.',
		instructions: [
			'Short timed sections — pace yourself across all questions.',
			'No negative marking unless shown on a specific question.',
			'Review the summary before final submission.'
		]
	},
	'verbal-reasoning-101': {
		id: 'verbal-reasoning-101',
		title: 'Verbal Reasoning 101',
		description: 'Based on the latest exam pattern for 2026.',
		duration: '45 mins',
		questions: '30 Qs',
		users: '3.1k users',
		xp: '+25 XP',
		rewardXp: 25,
		difficulty: 'Easy',
		format: 'Comprehension and logical verbal items.',
		instructions: [
			'Read each passage carefully before answering linked questions.',
			'You may flag questions and return to them later.',
			'Submit the section when you are finished; changes may not be allowed after submit.'
		]
	},
	'calculus-deep-dive-b': {
		id: 'calculus-deep-dive-b',
		title: 'Calculus Deep Dive — Part B',
		description: 'Integration focus',
		duration: '90 mins',
		questions: '45 Qs',
		users: '4.2k users',
		xp: '+80 XP',
		rewardXp: 80,
		difficulty: 'Medium',
		format: 'Integration-heavy calculus with proof-style prompts.',
		instructions: [
			'Show intermediate steps where the interface provides working space.',
			'Partial marking may apply for multi-step problems.',
			'Stay within the allotted time for each subsection.'
		]
	},
	'speed-drill-limits': {
		id: 'speed-drill-limits',
		title: 'Speed Drill: Limits & Continuity',
		description: 'Quick revision',
		duration: '45 mins',
		questions: '30 Qs',
		users: '8.1k users',
		xp: '+40 XP',
		rewardXp: 40,
		difficulty: 'Easy',
		format: 'Short sprint on limits and continuity.',
		instructions: [
			'Ideal for warm-up before full mocks.',
			'Skip and return using the question palette.',
			'Submit to see immediate feedback where enabled.'
		]
	},
	'jee-advanced-pattern-02': {
		id: 'jee-advanced-pattern-02',
		title: 'JEE Advanced Pattern Test 02',
		description: 'Mixed calculus & algebra',
		duration: '180 mins',
		questions: '54 Qs',
		users: '6.0k users',
		xp: '+120 XP',
		rewardXp: 120,
		difficulty: 'Hard',
		format: 'JEE Advanced style; integer and numeric answers where applicable.',
		instructions: [
			'Some questions may have partial marking; read instructions per question.',
			'Use the on-screen calculator only if provided for this test.',
			'Ensure a stable connection before starting; reconnect may not extend time.'
		]
	}
};

/**
 * @param {string} id
 * @returns {MockTestCatalogEntry | undefined}
 */
export function getMockTestById(id) {
	return BY_ID[id];
}

/** @returns {MockTestCatalogEntry[]} */
export function listMockTests() {
	return Object.values(BY_ID);
}
