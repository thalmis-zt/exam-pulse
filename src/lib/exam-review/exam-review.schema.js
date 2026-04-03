/**
 * Post-completion exam review (read-only).
 * @typedef {'completed'} ExamAttemptStatus
 */

/**
 * @typedef {Object} ExamReviewData
 * @property {string} testId - Attempt / session id
 * @property {ExamAttemptStatus} status
 * @property {string} title
 * @property {string} [section]
 * @property {string} completedAt - ISO date string (submitted / completed time)
 * @property {number} durationSeconds - Exam duration limit in seconds
 * @property {number} totalQuestions
 * @property {number} correctCount
 * @property {number} wrongCount
 * @property {number} unansweredCount
 * @property {number} scorePercent - 0–100
 * @property {import('$lib/quiz-attempt/mock/quiz-attempt.schema.js').Question[]} questions
 * @property {Record<string, string | null>} userAnswers - questionId -> selected option label
 * @property {Record<string, string>} correctAnswers - questionId -> correct option label
 */

export {};
