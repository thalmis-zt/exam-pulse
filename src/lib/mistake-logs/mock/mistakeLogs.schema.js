/**
 * Mistake Logs Schema
 * ===================
 * Defines the structure of mistake logs API responses.
 */

/**
 * @typedef {Object} AnswerOption
 * @property {string} label - Option label (A, B, C, D)
 * @property {string} text - Option text content
 */

/**
 * @typedef {Object} MistakeLog
 * @property {string} id - Unique identifier
 * @property {string} testName - Name of the test where mistake occurred
 * @property {string} testAttemptId - ID of the test attempt
 * @property {string} subject - Subject name (Physics, Chemistry, Maths)
 * @property {string} topic - Topic name
 * @property {'Easy' | 'Medium' | 'Hard'} difficulty - Difficulty level
 * @property {string} text - Full question text
 * @property {AnswerOption[]} options - Array of 4 answer options
 * @property {string} correctOptionLabel - Correct answer label (A, B, C, or D)
 * @property {string} userOptionLabel - User's selected answer label
 * @property {string} explanation - Explanation of correct answer
 * @property {string[]} tags - Tags associated with the question
 * @property {string} source - Test source
 * @property {string} mistakeAt - ISO timestamp when mistake occurred
 * @property {number} accuracy - Accuracy percentage on similar questions
 */

/**
 * @typedef {Object} MistakeLogsResponse
 * @property {MistakeLog[]} mistakes
 * @property {number} totalCount
 * @property {number} currentPage
 * @property {boolean} hasMore
 */

/**
 * @typedef {Object} MistakeFilters
 * @property {string} [subject]
 * @property {string} [query]
 */

export {};
