/** @type {import('./subject-detail.schema.js').SubjectDetail} */
const mathematics = {
	id: 'mathematics',
	iconName: 'Calculator',
	iconBgClass: 'bg-subject-mathematics-surface',
	iconTextClass: 'text-subject-mathematics',
	hero: {
		subjectLabel: 'Mathematics (Core)',
		gradeLabel: 'Grade 12',
		title: 'Advanced Calculus & Algebra',
		description:
			'Master differential & integral calculus with structured practice aligned to JEE Main & Advanced.',
		masteryPercent: 78,
		masteryCaption: 'You are in the top 15% of your class.',
		rank: 42,
		xpEarned: 2450
	},
	performance: {
		questionsAttempted: { current: 1248, total: 3000 },
		accuracyPercent: 84.2,
		accuracyDelta: '+2.4% vs last week',
		totalTime: '42h 15m',
		timePerDay: 'Avg. 45m / day'
	},
	syllabusTerms: [
		{
			id: 'term1',
			label: 'Term 1',
			topics: [
				{
					id: 'diff',
					name: 'Differentiation & Applications',
					percentCovered: 92,
					questionCount: 450
				},
				{
					id: 'int',
					name: 'Integral Calculus',
					percentCovered: 65,
					questionCount: 320
				},
				{
					id: 'mat',
					name: 'Matrices & Determinants',
					percentCovered: 88,
					questionCount: 210
				},
				{
					id: 'prob',
					name: 'Probability & Distributions',
					percentCovered: 40,
					questionCount: 180
				},
				{ id: 'lim', name: 'Limits & Continuity', percentCovered: 88, questionCount: 280 },
				{ id: 'vec', name: 'Vectors & 3D Geometry', percentCovered: 65, questionCount: 190 },
				{ id: 'seq', name: 'Sequences & Series', percentCovered: 48, questionCount: 140 },
				{ id: 'complex', name: 'Complex Numbers', percentCovered: 81, questionCount: 175 },
				{ id: 'quad', name: 'Quadratic Equations', percentCovered: 95, questionCount: 120 },
				{ id: 'trig', name: 'Trigonometry', percentCovered: 90, questionCount: 260 },
				{ id: 'coord', name: 'Coordinate Geometry', percentCovered: 76, questionCount: 300 }
			]
		},
		{
			id: 'term2',
			label: 'Term 2',
			topics: [
				{
					id: 'ode',
					name: 'Differential Equations',
					percentCovered: 45,
					questionCount: 200
				},
				{
					id: 'app',
					name: 'Applications of Derivatives',
					percentCovered: 62,
					questionCount: 310
				}
			]
		}
	],
	smartFocus: {
		strong: ['Limits & Continuity', 'Matrix Inversion', 'Linear Programming'],
		weak: ['Complex Integration', 'Vector Product Theory', 'Conditional Probability']
	},
	quickStats: {
		savedQuestions: 142,
		mistakeLog: 84
	},
	recommendedMocks: [
		{
			title: 'JEE Main: Full Syllabus Mock 08',
			description: 'Latest pattern — timed full paper',
			duration: '180 mins',
			questions: '90 Qs',
			users: '12.4k users',
			xp: '+150 XP',
			difficulty: 'Hard'
		},
		{
			title: 'Calculus Deep Dive — Part B',
			description: 'Integration focus',
			duration: '90 mins',
			questions: '45 Qs',
			users: '4.2k users',
			xp: '+80 XP',
			difficulty: 'Medium'
		},
		{
			title: 'Speed Drill: Limits & Continuity',
			description: 'Quick revision',
			duration: '45 mins',
			questions: '30 Qs',
			users: '8.1k users',
			xp: '+40 XP',
			difficulty: 'Easy'
		},
		{
			title: 'JEE Advanced Pattern Test 02',
			description: 'Mixed calculus & algebra',
			duration: '180 mins',
			questions: '54 Qs',
			users: '6.0k users',
			xp: '+120 XP',
			difficulty: 'Hard'
		}
	],
	newMocksCount: 3,
	resources: [
		{ id: 'r1', label: 'Recent Practice Sessions', kind: 'sessions' },
		{ id: 'r2', label: 'Download Formula Sheet (PDF)', kind: 'pdf' },
		{ id: 'r3', label: 'Ask a Doubts Expert', kind: 'expert' }
	]
};

/** @type {import('./subject-detail.schema.js').SubjectDetail} */
const chemistry = {
	...mathematics,
	id: 'chemistry',
	iconName: 'Beaker',
	iconBgClass: 'bg-subject-chemistry-surface',
	iconTextClass: 'text-subject-chemistry',
	hero: {
		...mathematics.hero,
		subjectLabel: 'Chemistry (Core)',
		title: 'Organic & Physical Chemistry',
		description: 'Build mastery in mechanisms, thermodynamics, and periodic trends.',
		masteryPercent: 71,
		masteryCaption: 'You are in the top 22% of your class.',
		rank: 58,
		xpEarned: 1890
	},
	smartFocus: {
		strong: ['GOC Basics', 'IUPAC Nomenclature', 'Mole Concept'],
		weak: ['Electrochemistry', 'Coordination Compounds', 'Thermodynamics']
	}
};

/** @type {import('./subject-detail.schema.js').SubjectDetail} */
const physics = {
	...mathematics,
	id: 'physics',
	iconName: 'Atom',
	iconBgClass: 'bg-subject-physics-surface',
	iconTextClass: 'text-subject-physics',
	hero: {
		...mathematics.hero,
		subjectLabel: 'Physics (Core)',
		title: 'Mechanics & Electromagnetism',
		description: 'Vectors, rotation, circuits, and modern physics essentials.',
		masteryPercent: 65,
		masteryCaption: 'You are in the top 28% of your class.',
		rank: 71,
		xpEarned: 1620
	},
	smartFocus: {
		strong: ['Kinematics', 'Work & Energy', 'Current Electricity'],
		weak: ['Rotation', 'EM Waves', 'Optics']
	}
};

/** @type {Record<string, import('./subject-detail.schema.js').SubjectDetail>} */
export const SUBJECT_DETAIL_BY_ID = {
	mathematics,
	chemistry,
	physics
};
