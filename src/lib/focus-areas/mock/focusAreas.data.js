/**
 * Focus Areas Mock Data
 * ====================
 * Contains sample focus area data objects for UI development.
 * Replace with real API calls in the service layer later.
 */

/**
 * Score Boosters: Topics where the user is performing well
 * @type {import('./focusAreas.schema.js').FocusAreaItem[]}
 */
export const boosters = [
	{
		id: 'booster_1',
		subject: 'Organic Chemistry',
		icon: 'Beaker',
		category: 'Chemistry',
		masteryPercent: 82,
		status: 'booster',
		questionsAttempted: 45,
		questionsCorrect: 37,
		weakTopics: [],
		suggestedPracticeCount: 5,
		accuracy: 88,
		timePerQuestion: 38,
		lastPracticed: 'Recently',
		description: 'Sharpen your strength with harder questions'
	},
	{
		id: 'booster_2',
		subject: 'Vector Algebra',
		icon: 'Grid',
		category: 'Mathematics',
		masteryPercent: 78,
		status: 'booster',
		questionsAttempted: 58,
		questionsCorrect: 45,
		weakTopics: [],
		suggestedPracticeCount: 8,
		accuracy: 85,
		timePerQuestion: 45,
		lastPracticed: 'Recently',
		description: 'Challenge yourself with advanced problems'
	},
	{
		id: 'booster_3',
		subject: 'Photosynthesis',
		icon: 'Leaf',
		category: 'Biology',
		masteryPercent: 86,
		status: 'booster',
		questionsAttempted: 32,
		questionsCorrect: 28,
		weakTopics: [],
		suggestedPracticeCount: 4,
		accuracy: 92,
		timePerQuestion: 35,
		lastPracticed: 'Yesterday',
		description: 'Master the biochemical pathways'
	},
	{
		id: 'booster_4',
		subject: 'Thermodynamics',
		icon: 'Flame',
		category: 'Physics',
		masteryPercent: 80,
		status: 'booster',
		questionsAttempted: 40,
		questionsCorrect: 32,
		weakTopics: [],
		suggestedPracticeCount: 6,
		accuracy: 87,
		timePerQuestion: 42,
		lastPracticed: 'Today',
		description: 'Strengthen concepts with advanced cases'
	},
	{
		id: 'booster_5',
		subject: 'Ancient History',
		icon: 'BookOpen',
		category: 'History',
		masteryPercent: 84,
		status: 'booster',
		questionsAttempted: 50,
		questionsCorrect: 42,
		weakTopics: [],
		suggestedPracticeCount: 7,
		accuracy: 89,
		timePerQuestion: 40,
		lastPracticed: 'Recently',
		description: 'Perfect your timeline knowledge'
	},
	{
		id: 'booster_6',
		subject: 'Coordinate Geometry',
		icon: 'Grid3x3',
		category: 'Mathematics',
		masteryPercent: 79,
		status: 'booster',
		questionsAttempted: 35,
		questionsCorrect: 28,
		weakTopics: [],
		suggestedPracticeCount: 5,
		accuracy: 86,
		timePerQuestion: 48,
		lastPracticed: 'Yesterday',
		description: 'Explore complex plane problems'
	}
];

/**
 * Knowledge Gaps: Topics where the user needs improvement
 * @type {import('./focusAreas.schema.js').FocusAreaItem[]}
 */
export const gaps = [
	{
		id: 'gap_1',
		subject: 'Inorganic Chemistry',
		icon: 'BookOpen',
		category: 'Chemistry',
		masteryPercent: 44,
		status: 'gap',
		questionsAttempted: 32,
		questionsCorrect: 14,
		weakTopics: ['Coordination Compounds', 'Complex Ions'],
		suggestedPracticeCount: 15,
		avgSpeed: 45,
		correctAttempts: 14,
		totalQuestions: 100,
		targetMastery: 80
	},
	{
		id: 'gap_2',
		subject: 'Integration & Calculus',
		icon: 'Function',
		category: 'Mathematics',
		masteryPercent: 52,
		status: 'gap',
		questionsAttempted: 28,
		questionsCorrect: 15,
		weakTopics: ['Definite Integrals', 'Area Under Curve'],
		suggestedPracticeCount: 12,
		avgSpeed: 52,
		correctAttempts: 15,
		totalQuestions: 100,
		targetMastery: 80
	},
	{
		id: 'gap_3',
		subject: 'Electromagnetism',
		icon: 'Zap',
		category: 'Physics',
		masteryPercent: 25,
		status: 'gap',
		questionsAttempted: 40,
		questionsCorrect: 10,
		weakTopics: ['EM Induction', 'AC Circuits', 'Magnetic Fields'],
		suggestedPracticeCount: 22,
		avgSpeed: 60,
		correctAttempts: 10,
		totalQuestions: 100,
		targetMastery: 80
	}
];

/**
 * User summary data
 * @type {import('./focusAreas.schema.js').FocusAreasSummary}
 */
export const summary = {
	totalSolved: 187,
	totalQuestions: 450,
	weekPercentage: 72
};

/**
 * User info
 * @type {{ name: string, studentId: string }}
 */
export const user = {
	name: 'Rahul Rajan',
	studentId: 'STU_2024_8451'
};

/**
 * Recent mistakes/error log
 * @type {import('./focusAreas.schema.js').MistakeLogData}
 */
export const mistakeLog = {
	totalMistakes: 34,
	recentMistakes: [
		{
			id: 'mistake_1',
			question: 'Which of the following is an example of a chelate complex?',
			yourAnswer: '[Cu(NH₃)₄]²⁺',
			correctAnswer: '[Co(EDTA)]⁻',
			timestamp: '2026-03-11T14:32:00Z'
		},
		{
			id: 'mistake_2',
			question: 'Find the value of ∫₀^π sin(x) dx',
			yourAnswer: '0',
			correctAnswer: '2',
			timestamp: '2026-03-10T10:15:00Z'
		},
		{
			id: 'mistake_3',
			question: 'A conductor moves perpendicular to a magnetic field...',
			yourAnswer: 'F = BIL cos(θ)',
			correctAnswer: 'F = BIL sin(θ)',
			timestamp: '2026-03-09T16:45:00Z'
		}
	]
};

/**
 * Learning tips
 * @type {import('./focusAreas.schema.js').LearningTipsData}
 */
export const learningTips = {
	items: [
		{
			id: 'tip_1',
			icon: 'CheckCircle2',
			content: 'Focus on subjects with accuracy < 50% first to boost your overall percentile.'
		},
		{
			id: 'tip_2',
			icon: 'Clock',
			content: 'Your average speed in Calculus is significantly lower than the target. Try time-boxed sessions.'
		}
	]
};
