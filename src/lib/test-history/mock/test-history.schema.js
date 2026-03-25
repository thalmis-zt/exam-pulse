/**
 * Test History Data Schema
 * Defines the shape of test/quiz history data and related models
 */

/**
 * @typedef {Object} TestAttempt
 * @property {string} id - Unique identifier
 * @property {string} name - Quiz/test name  * @property {string} subject - Subject (Physics, Chemistry, Biology, Maths)
 * @property {string} topic - Specific topic covered
 * @property {'completed' | 'in-progress' | 'abandoned'} status - Test completion status
 * @property {'easy' | 'medium' | 'hard'} difficulty - Quiz difficulty level
 * @property {Date} date - When the test was taken
 * @property {string} time - Time taken (e.g., '45m 12s')
 * @property {number} totalQuestions - Total questions in the test
 * @property {number} questionsAttempted - Questions the user attempted
 * @property {number} correct - Correct answers
 * @property {number} incorrect - Incorrect answers
 * @property {number} skipped - Skipped questions
 * @property {number} score - Score obtained
 * @property {number} maxScore - Maximum possible score
 */

/**
 * @typedef {Object} TestStats
 * @property {number} totalAttempts - Total quizzes attempted
 * @property {number} averageScore - Average score percentage
 * @property {number} bestScore - Best score achieved
 * @property {number} accuracy - Overall accuracy percentage
 * @property {string} totalTimeSpent - Total study time
 * @property {string} averageTimePerTest - Average time per test
 */

/**
 * @typedef {Object} Recommendation
 * @property {string} id - Unique identifier
 * @property {string} title - Main recommendation text
 * @property {string} subtitle - Additional details
 * @property {string} icon - Icon name
 */

/**
 * @typedef {Object} DailyAccumulation
 * @property {string} date - Date in YYYY-MM-DD format
 * @property {number} attempts - Number of quizzes attempted
 * @property {number} score - Average score for the day
 */

/**
 * @typedef {Object} TestHistoryResponse
 * @property {TestAttempt[]} data - Array of test attempts
 * @property {number} totalCount - Total number of tests
 * @property {number} page - Current page
 * @property {number} pageSize - Items per page
 * @property {boolean} hasMore - Whether there are more items
 */

/**
 * @typedef {Object} SearchFilters
 * @property {string} [subject] - Filter by subject
 * @property {string} [difficulty] - Filter by difficulty
 * @property {string} [timeRange] - Filter by time range ('1month' | '3months' | '6months' | 'all')
 * @property {string} [sortBy] - Sort order ('recent' | 'best' | 'oldest')
 * @property {string} [searchQuery] - Search in quiz names
 */

export {};
