/**
 * Focus Areas Mock Data Schema
 * ===========================
 * Defines the structure of API responses for the Focus Areas page.
 * This schema documents the expected data shape so that UI components
 * can be built independently of backend API implementation.
 *
 * Later, the `focusAreas.service.js` will be replaced with real API calls
 * without modifying any components using this data.
 */

/**
 * @typedef {Object} FocusAreaItem
 * @property {string} id - Unique identifier for the focus area
 * @property {string} subject - Subject/topic name (e.g., "Organic Chemistry")
 * @property {string} icon - Lucide icon name (e.g., "Beaker", "Circle")
 * @property {string} category - Category name (e.g., "Chemistry")
 * @property {number} masteryPercent - Mastery level as percentage (0–100)
 * @property {'booster' | 'gap'} status - Whether this is a score booster or knowledge gap
 * @property {number} questionsAttempted - Total questions attempted
 * @property {number} questionsCorrect - Questions answered correctly
 * @property {string[]} weakTopics - List of weak topic names (e.g., ["Resonance", "Isomerism"])
 * @property {number} suggestedPracticeCount - Number of suggested practice questions
 * @property {number} [accuracy] - Accuracy percentage for boosters (optional)
 * @property {number} [timePerQuestion] - Average time per question in seconds (optional)
 * @property {string} [lastPracticed] - When last practiced (e.g., "Recently", "2 days ago") (optional)
 * @property {string} [description] - Motivational description for CTA (optional)
 * @property {number} [avgSpeed] - Average speed in seconds per question for gaps (optional)
 * @property {number} [correctAttempts] - Number of correct attempts (optional)
 * @property {number} [totalQuestions] - Total questions in category (optional)
 * @property {number} [targetMastery] - Target mastery percentage (optional)
 */

/**
 * @typedef {Object} MistakeEntry
 * @property {string} id - Unique identifier
 * @property {string} question - Question text or identifier
 * @property {string} yourAnswer - User's answer
 * @property {string} correctAnswer - Correct answer
 * @property {string} timestamp - ISO timestamp when mistake was logged
 */

/**
 * @typedef {Object} LearningTipItem
 * @property {string} id - Unique identifier for the tip
 * @property {string} icon - Lucide icon name (e.g., "CheckCircle2", "Clock")
 * @property {string} content - Tip content text (supports markdown-like bold with **text**)
 */

/**
 * @typedef {Object} FocusAreasSummary
 * @property {number} totalSolved - Total questions solved in current session/week
 * @property {number} totalQuestions - Total questions available
 * @property {number} weekPercentage - Percentage of weekly goal achieved
 */

/**
 * @typedef {Object} MistakeLogData
 * @property {number} totalMistakes - Total mistake count
 * @property {MistakeEntry[]} recentMistakes - Recent mistake entries (last 5–10)
 */

/**
 * @typedef {Object} FocusAreasPageData
 * @property {Object} user - Current user info
 * @property {string} user.name - User's full name
 * @property {string} user.studentId - Unique student ID
 * @property {FocusAreasSummary} summary - Session/week summary stats
 * @property {FocusAreaItem[]} scoreBoosters - Focus areas where user is strong (status='booster')
 * @property {FocusAreaItem[]} knowledgeGaps - Focus areas needing improvement (status='gap')
 * @property {MistakeLogData} mistakeLog - User's recent mistakes
 * @property {LearningTipsData} learningTips - Learning tips/advice items
 */

// Export as module documentation
export {};
