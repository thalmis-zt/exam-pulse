/**
 * Goal Data Schema
 * ================
 * Defines the structure for goal setup with type-specific configurations.
 *
 * Goal Types:
 * - entrance: Exam-based goals (e.g., "IIT JEE 2026", "SAT 2025")
 * - classwise: Class/board-based goals (e.g., "Class 12 CBSE", "Grade 10 ICSE")
 */

/**
 * @typedef {Object} GoalBase
 * @property {string} id - Unique identifier
 * @property {'entrance' | 'classwise'} type - Goal category
 * @property {number} targetYear - Target year for achievement
 * @property {string | null} name - Optional custom goal name (e.g., "My JEE Dream")
 * @property {boolean} isPrimary - true = Primary Goal (max 1), false = Secondary Goal
 */

/**
 * @typedef {Object} EntranceGoal
 * @property {GoalBase} base
 * @property {string} entranceExamId - Reference to entrance exam config
 * @property {null} stateId - Not applicable
 * @property {null} boardId - Not applicable
 * @property {null} mediumId - Not applicable
 * @property {null} classId - Not applicable
 *
 * Example:
 * {
 *   base: { id, type: 'entrance', targetYear: 2026, name: 'IIT Dream', isPrimary: true },
 *   entranceExamId: 'exam_jee_main_2026',
 *   stateId: null,
 *   boardId: null,
 *   mediumId: null,
 *   classId: null
 * }
 */

/**
 * @typedef {Object} ClasswiseGoal
 * @property {GoalBase} base
 * @property {null} entranceExamId - Not applicable
 * @property {string} stateId - Reference to state config (e.g., 'state_maharashtra')
 * @property {string} boardId - Reference to board (depends on state, e.g., 'board_cbse')
 * @property {string} mediumId - Reference to medium (depends on board, e.g., 'medium_english')
 * @property {string} classId - Reference to class/grade level (e.g., 'class_12')
 *
 * Example:
 * {
 *   base: { id, type: 'classwise', targetYear: 2024, name: 'CBSE 12th', isPrimary: false },
 *   entranceExamId: null,
 *   stateId: 'state_maharashtra',
 *   boardId: 'board_cbse',
 *   mediumId: 'medium_english',
 *   classId: 'class_12'
 * }
 */

/**
 * @typedef {EntranceGoal | ClasswiseGoal} Goal
 */

/**
 * @typedef {Object} EntranceExamConfig
 * @property {string} id - Exam ID (e.g., 'exam_jee_main_2026')
 * @property {string} label - Display name (e.g., "JEE Main 2026")
 * @property {string} category - Category (e.g., "Engineering", "Medical")
 * @property {number[]} availableYears - Years this exam is offered
 */

/**
 * @typedef {Object} StateConfig
 * @property {string} id - State ID (e.g., 'state_maharashtra')
 * @property {string} label - State name (e.g., "Maharashtra")
 */

/**
 * @typedef {Object} BoardConfig
 * @property {string} id - Board ID (e.g., 'board_cbse')
 * @property {string} label - Board name (e.g., "CBSE")
 * @property {string} stateId - Parent state ID (e.g., 'state_all')
 */

/**
 * @typedef {Object} MediumConfig
 * @property {string} id - Medium ID (e.g., 'medium_english')
 * @property {string} label - Medium name (e.g., "English")
 * @property {string} boardId - Parent board ID (e.g., 'board_cbse')
 */

/**
 * @typedef {Object} ClassConfig
 * @property {string} id - Class ID (e.g., 'class_12')
 * @property {string} label - Display label (e.g., "Class 12" or "Grade 12")
 * @property {number} level - Numeric level (10-12 for high school)
 */

export {};
