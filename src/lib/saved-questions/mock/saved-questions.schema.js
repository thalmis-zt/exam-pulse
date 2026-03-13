/**
 * Saved Questions Schema
 * =====================
 * Defines the structure of saved questions API responses.
 * This schema documents the expected data shape so that UI components
 * can be built independently of backend API implementation.
 */

/**
 * @typedef {Object} AnswerOption
 * @property {string} label - Option label (A, B, C, D)
 * @property {string} text - Option text content
 */

/**
 * @typedef {Object} SavedQuestion
 * @property {string} id - Unique identifier
 * @property {string} subject - Subject name (Physics, Chemistry, Maths)
 * @property {string} topic - Topic name (e.g., "Organic Chemistry", "Vector Algebra")
 * @property {'Easy' | 'Medium' | 'Hard'} difficulty - Difficulty level
 * @property {string} text - Full question text
 * @property {AnswerOption[]} options - Array of 4 answer options
 * @property {string} correctOptionLabel - Correct answer label (A, B, C, or D)
 * @property {string} explanation - Detailed explanation of correct answer
 * @property {string} savedAt - ISO timestamp when saved (e.g., "2024-01-15T10:30:00Z")
 */

/**
 * @typedef {Object} SavedQuestionsResponse
 * @property {SavedQuestion[]} questions - Array of saved questions
 * @property {number} totalCount - Total number of saved questions
 * @property {number} page - Current page number
 * @property {number} pageSize - Questions per page
 * @property {boolean} hasMore - Whether more pages exist
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} [subject] - Filter by subject
 * @property {string} [query] - Search query string
 * @property {'Easy' | 'Medium' | 'Hard'} [difficulty] - Filter by difficulty
 */

/**
 * @typedef {Object} SubjectStats
 * @property {number} physics - Count of physics questions
 * @property {number} chemistry - Count of chemistry questions
 * @property {number} maths - Count of maths questions
 * @property {number} total - Total questions across all subjects
 */

/**
 * @typedef {Object} ServiceError
 * @property {string} message - Error message
 * @property {string} code - Error code (e.g., 'NOT_FOUND', 'NETWORK_ERROR')
 * @property {number} [statusCode] - HTTP status code if applicable
 */

export {};
