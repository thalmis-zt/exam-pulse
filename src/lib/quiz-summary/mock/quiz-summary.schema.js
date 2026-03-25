/**
 * Quiz Summary Mock Data Schema
 * ============================
 * Defines the structure of API responses for the Quiz Summary page.
 * Build UI components against this schema independently of backend.
 *
 * Later, quiz-summary.service.js will be replaced with real API calls
 * without needing to change any components.
 */

/**
 * @typedef {Object} QuizResult
 * @property {string} quizTitle - Quiz name e.g. "Biology Basics"
 * @property {string} message - Congratulatory message
 * @property {number} xpEarned - XP earned from the quiz
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {number} correct
 * @property {number} wrong
 * @property {number} unattempted
 * @property {number} bestScore
 * @property {number} rank
 * @property {number} percentile
 * @property {number} total
 */

/**
 * @typedef {Object} TimeBreakdownMetrics
 * @property {number} correctTimeSeconds - Time spent on correct answers (seconds)
 * @property {number} wrongTimeSeconds - Time spent on wrong answers (seconds)
 * @property {number} unattemptedTimeSeconds - Time spent on unattempted (seconds)
 */

/**
 * @typedef {Object} SubjectResult
 * @property {string} name - Subject name
 * @property {number} total
 * @property {number} correct
 * @property {number} wrong
 * @property {number} timeSeconds - Time spent on this subject (seconds)
 * @property {'BarChart3' | 'Target'} [iconName] - Icon to display for the subject
 */

/**
 * @typedef {Object} MockTest
 * @property {string} title - Test title
 * @property {string} description - Short subtitle
 * @property {string} duration - e.g. "180 mins"
 * @property {string} questions - e.g. "90 Qs"
 * @property {string} users - e.g. "12.4k"
 * @property {string} xp - e.g. "+150 XP"
 */

/**
 * @typedef {Object} QuizSummaryPageData
 * @property {QuizResult} quizResult
 * @property {PerformanceMetrics} performanceMetrics
 * @property {TimeBreakdownMetrics} timeBreakdownMetrics
 * @property {SubjectResult[]} subjectDeepDive
 * @property {MockTest[]} recommendedMocks
 */

export {};
