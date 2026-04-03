/**
 * Goal Data Service
 * =================
 * Provides mock data and helpers for goal configuration options.
 * 
 * Maintains proper dependency hierarchy:
 * - Entrance Exams are independent
 * - States are independent
 * - Boards belong to States (filtered by stateId)
 * - Mediums belong to Boards (filtered by boardId)
 * - Classes are independent (not filtered)
 */

/** @type {import('./goal.schema.js').EntranceExamConfig[]} */
const ENTRANCE_EXAMS = [
	{
		id: 'exam_jee_main',
		label: 'JEE Main',
		category: 'Engineering',
		availableYears: [2024, 2025, 2026, 2027]
	},
	{
		id: 'exam_jee_advanced',
		label: 'JEE Advanced',
		category: 'Engineering',
		availableYears: [2024, 2025, 2026, 2027]
	},
	{
		id: 'exam_neet',
		label: 'NEET',
		category: 'Medical',
		availableYears: [2024, 2025, 2026, 2027]
	},
	{
		id: 'exam_cuet',
		label: 'CUET',
		category: 'UG Admission',
		availableYears: [2024, 2025, 2026, 2027]
	},
	{
		id: 'exam_gate',
		label: 'GATE',
		category: 'Post-Graduate',
		availableYears: [2024, 2025, 2026, 2027]
	},
	{
		id: 'exam_sat',
		label: 'SAT',
		category: 'International',
		availableYears: [2024, 2025, 2026, 2027]
	},
	{
		id: 'exam_act',
		label: 'ACT',
		category: 'International',
		availableYears: [2024, 2025, 2026, 2027]
	}
];

/** @type {import('./goal.schema.js').StateConfig[]} */
const STATES = [
	{ id: 'state_all', label: 'All India' },
	{ id: 'state_maharashtra', label: 'Maharashtra' },
	{ id: 'state_delhi', label: 'Delhi' },
	{ id: 'state_karnataka', label: 'Karnataka' },
	{ id: 'state_tamil_nadu', label: 'Tamil Nadu' },
	{ id: 'state_telangana', label: 'Telangana' },
	{ id: 'state_uttar_pradesh', label: 'Uttar Pradesh' },
	{ id: 'state_bengal', label: 'West Bengal' }
];

/** @type {import('./goal.schema.js').BoardConfig[]} */
const BOARDS = [
	// All India Boards
	{ id: 'board_cbse', label: 'CBSE', stateId: 'state_all' },
	{ id: 'board_icse', label: 'ICSE', stateId: 'state_all' },
	{ id: 'board_ib', label: 'IB', stateId: 'state_all' },

	// Maharashtra State Boards
	{ id: 'board_msbshse', label: 'Maharashtra State Board (HSC)', stateId: 'state_maharashtra' },
	{ id: 'board_msbssc', label: 'Maharashtra State Board (SSC)', stateId: 'state_maharashtra' },

	// Delhi State Boards
	{ id: 'board_delhi_cbse', label: 'CBSE (Delhi)', stateId: 'state_delhi' },
	{ id: 'board_delhi_icse', label: 'ICSE (Delhi)', stateId: 'state_delhi' },

	// Karnataka State Boards
	{ id: 'board_karnataka_state', label: 'Karnataka State Board', stateId: 'state_karnataka' },
	{ id: 'board_karnataka_cbse', label: 'CBSE (Karnataka)', stateId: 'state_karnataka' },

	// Tamil Nadu State Boards
	{ id: 'board_tnbse', label: 'Tamil Nadu State Board', stateId: 'state_tamil_nadu' },
	{ id: 'board_cbse_tn', label: 'CBSE (Tamil Nadu)', stateId: 'state_tamil_nadu' }
];

/** @type {import('./goal.schema.js').MediumConfig[]} */
const MEDIUMS = [
	// CBSE Mediums
	{ id: 'medium_english', label: 'English', boardId: 'board_cbse' },
	{ id: 'medium_hindi', label: 'Hindi', boardId: 'board_cbse' },

	// ICSE Mediums
	{ id: 'medium_icse_english', label: 'English', boardId: 'board_icse' },

	// IB Mediums
	{ id: 'medium_ib_english', label: 'English', boardId: 'board_ib' },

	// Maharashtra HSC
	{ id: 'medium_mh_english', label: 'English', boardId: 'board_msbshse' },
	{ id: 'medium_mh_marathi', label: 'Marathi', boardId: 'board_msbshse' },

	// Maharashtra SSC
	{ id: 'medium_mh_ssc_english', label: 'English', boardId: 'board_msbssc' },
	{ id: 'medium_mh_ssc_marathi', label: 'Marathi', boardId: 'board_msbssc' },

	// Karnataka State
	{ id: 'medium_kn_english', label: 'English', boardId: 'board_karnataka_state' },
	{ id: 'medium_kn_kannada', label: 'Kannada', boardId: 'board_karnataka_state' },

	// Tamil Nadu Board
	{ id: 'medium_tn_english', label: 'English', boardId: 'board_tnbse' },
	{ id: 'medium_tn_tamil', label: 'Tamil', boardId: 'board_tnbse' }
];

/** @type {import('./goal.schema.js').ClassConfig[]} */
const CLASSES = [
	{ id: 'class_08', label: 'Class 8', level: 8 },
	{ id: 'class_09', label: 'Class 9', level: 9 },
	{ id: 'class_10', label: 'Class 10 (X)', level: 10 },
	{ id: 'class_11', label: 'Class 11 (XI)', level: 11 },
	{ id: 'class_12', label: 'Class 12 (XII)', level: 12 },

	// International Grade Labels
	{ id: 'grade_6', label: 'Grade 6', level: 6 },
	{ id: 'grade_7', label: 'Grade 7', level: 7 },
	{ id: 'grade_8', label: 'Grade 8', level: 8 },
	{ id: 'grade_9', label: 'Grade 9', level: 9 },
	{ id: 'grade_10', label: 'Grade 10', level: 10 },
	{ id: 'grade_11', label: 'Grade 11', level: 11 },
	{ id: 'grade_12', label: 'Grade 12', level: 12 }
];

/**
 * Get all entrance exams
 * @returns {import('./goal.schema.js').EntranceExamConfig[]}
 */
export function getEntranceExams() {
	return ENTRANCE_EXAMS;
}

/**
 * Get all states
 * @returns {import('./goal.schema.js').StateConfig[]}
 */
export function getStates() {
	return STATES;
}

/**
 * Get boards filtered by state
 * @param {string} stateId - State ID to filter boards
 * @returns {import('./goal.schema.js').BoardConfig[]}
 */
export function getBoardsByState(stateId) {
	if (!stateId) return [];
	return BOARDS.filter((b) => b.stateId === stateId);
}

/**
 * Get mediums filtered by board
 * @param {string} boardId - Board ID to filter mediums
 * @returns {import('./goal.schema.js').MediumConfig[]}
 */
export function getMediumsByBoard(boardId) {
	if (!boardId) return [];
	return MEDIUMS.filter((m) => m.boardId === boardId);
}

/**
 * Get all classes (independent, not filtered)
 * @returns {import('./goal.schema.js').ClassConfig[]}
 */
export function getClasses() {
	return CLASSES;
}

/**
 * Get entrance exam by ID
 * @param {string} examId
 * @returns {import('./goal.schema.js').EntranceExamConfig | undefined}
 */
export function getEntranceExamById(examId) {
	return ENTRANCE_EXAMS.find((e) => e.id === examId);
}

/**
 * Get state by ID
 * @param {string} stateId
 * @returns {import('./goal.schema.js').StateConfig | undefined}
 */
export function getStateById(stateId) {
	return STATES.find((s) => s.id === stateId);
}

/**
 * Get board by ID
 * @param {string} boardId
 * @returns {import('./goal.schema.js').BoardConfig | undefined}
 */
export function getBoardById(boardId) {
	return BOARDS.find((b) => b.id === boardId);
}

/**
 * Get medium by ID
 * @param {string} mediumId
 * @returns {import('./goal.schema.js').MediumConfig | undefined}
 */
export function getMediumById(mediumId) {
	return MEDIUMS.find((m) => m.id === mediumId);
}

/**
 * Get class by ID
 * @param {string} classId
 * @returns {import('./goal.schema.js').ClassConfig | undefined}
 */
export function getClassById(classId) {
	return CLASSES.find((c) => c.id === classId);
}

/**
 * Generate goal title from goal config
 * @param {import('./goal.schema.js').Goal} goal
 * @returns {string}
 */
export function generateGoalTitle(goal) {
	if (goal.base.name) {
		return goal.base.name;
	}

	if (goal.base.type === 'entrance') {
		const exam = getEntranceExamById(goal.entranceExamId);
		return exam ? `${exam.label} ${goal.base.targetYear}` : `Goal ${goal.base.targetYear}`;
	}

	if (goal.base.type === 'classwise') {
		const board = getBoardById(goal.boardId);
		const classConfig = getClassById(goal.classId);

		if (board && classConfig) {
			return `${board.label} ${classConfig.label}`;
		}
		return `Class Goal ${goal.base.targetYear}`;
	}

	return `Goal ${goal.base.targetYear}`;
}

/**
 * Generate goal description from goal config
 * @param {import('./goal.schema.js').Goal} goal
 * @returns {string}
 */
export function generateGoalDescription(goal) {
	if (goal.base.type === 'entrance') {
		const exam = getEntranceExamById(goal.entranceExamId);
		return exam ? `${exam.category} entrance exam` : 'Entrance exam goal';
	}

	if (goal.base.type === 'classwise') {
		const board = getBoardById(goal.boardId);
		const medium = getMediumById(goal.mediumId);
		const classConfig = getClassById(goal.classId);

		const parts = [];
		if (board) parts.push(board.label);
		if (medium) parts.push(medium.label);
		if (classConfig) parts.push(classConfig.label);

		return parts.length > 0 ? parts.join(', ') : 'Class-wise goal';
	}

	return 'Learning goal';
}

/**
 * Create new goal object with default structure
 * @param {string} type - 'entrance' or 'classwise'
 * @param {number} targetYear
 * @returns {import('./goal.schema.js').Goal}
 */
export function createGoal(type, targetYear) {
	const id = `goal_${type}_${Date.now()}`;

	if (type === 'entrance') {
		return {
			base: {
				id,
				type: 'entrance',
				targetYear,
				name: null,
				isPrimary: false
			},
			entranceExamId: null,
			stateId: null,
			boardId: null,
			mediumId: null,
			classId: null
		};
	}

	// classwise
	return {
		base: {
			id,
			type: 'classwise',
			targetYear,
			name: null,
			isPrimary: false
		},
		entranceExamId: null,
		stateId: null,
		boardId: null,
		mediumId: null,
		classId: null
	};
}

/**
 * Validate goal has required fields
 * @param {import('./goal.schema.js').Goal} goal
 * @returns {{ valid: boolean; errors: string[] }}
 */
export function validateGoal(goal) {
	const errors = [];

	if (!goal.base.targetYear) {
		errors.push('Target year is required');
	}

	if (goal.base.type === 'entrance') {
		if (!goal.entranceExamId) {
			errors.push('Entrance exam is required');
		}
	} else if (goal.base.type === 'classwise') {
		if (!goal.stateId) errors.push('State is required');
		if (!goal.boardId) errors.push('Board is required');
		if (!goal.mediumId) errors.push('Medium is required');
		if (!goal.classId) errors.push('Class is required');
	}

	return {
		valid: errors.length === 0,
		errors
	};
}
