/**
 * Quiz Attempt Mock Schema
 * ========================
 * Defines the structure of data for the Quiz Attempt page.
 */

/**
 * @typedef {'current'|'answered'|'marked'|'not-visited'} QuestionStatus
 */

/**
 * @typedef {Object} QuestionOption
 * @property {string} label - Option label (A, B, C, D)
 * @property {string} text - Option text
 */

/**
 * @typedef {Object} Question
 * @property {string} id - Unique question ID
 * @property {number} index - 1-based question number
 * @property {string} subject - Subject name (e.g., "Geometry")
 * @property {string} text - Question text
 * @property {QuestionOption[]} options - Answer options
 * @property {number} positiveMarks - Marks for correct answer (e.g., 4)
 * @property {number} negativeMarks - Marks deducted for wrong answer (e.g., 1)
 */

/**
 * @typedef {Object} QuizAttemptData
 * @property {string} testId - Test session ID
 * @property {string} title - Quiz title (e.g., "Geometry Assessment")
 * @property {string} section - Section name (e.g., "Section B: Advanced Properties")
 * @property {number} totalQuestions - Total number of questions
 * @property {number} durationSeconds - Total duration in seconds
 * @property {Question[]} questions - List of questions
 * @property {Record<string, QuestionStatus>} questionStatuses - Map of questionId -> status
 * @property {Record<string, string|null>} answers - Map of questionId -> selected option label
 */

export {};
