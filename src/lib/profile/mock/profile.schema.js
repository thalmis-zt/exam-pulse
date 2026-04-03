/**
 * Profile Page Mock Data Schema
 * ==============================
 * Defines the structure of API responses for the Profile page.
 * Build UI components against this schema independently of backend.
 *
 * Later, profile.service.js will be replaced with real API calls
 * without needing to change any components.
 */

/**
 * @typedef {Object} UserProfile
 * @property {string} name - Full display name
 * @property {string} handle - Username handle e.g. "@johndoe_study"
 * @property {string|null} avatar - URL to avatar image, null for initials fallback
 * @property {string} bio - Short bio / quote
 * @property {string} grade - e.g. "Grade 12"
 * @property {string} examTag - e.g. "SAT/JEE"
 * @property {number} profileCompletion - 0–100
 * @property {string} joinedDate - e.g. "Jan 2024"
 * @property {number} rank - Current XP rank position
 * @property {number} totalXP - Total XP earned
 */

/**
 * @typedef {Object} ProfileStats
 * @property {number} avgScore - Average score percentage 0–100
 * @property {number} accuracy - Accuracy percentage 0–100
 * @property {number} totalQuizzes - Total quizzes attempted
 */

/**
 * @typedef {Object} Goal
 * @property {string} base.id
 * @property {'entrance' | 'classwise'} base.type
 * @property {number} base.targetYear
 * @property {string | null} base.name
 * @property {boolean} base.isPrimary
 * @property {string | null} entranceExamId - For entrance goals
 * @property {string | null} stateId - For classwise goals
 * @property {string | null} boardId - For classwise goals
 * @property {string | null} mediumId - For classwise goals
 * @property {string | null} classId - For classwise goals
 */

/**
 * @typedef {Object} DailyGoal
 * @property {number} current - Questions solved today
 * @property {number} total - Daily target questions
 * @property {number} targetPercent - Minimum % needed to be on-track (0–100)
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {string} bestSubject - Subject where user scores highest
 * @property {string} weakestTopic - Topic needing the most improvement
 * @property {DailyGoal} dailyGoal
 */

/**
 * @typedef {Object} SubjectItem
 * @property {string} id
 * @property {string} name - Subject name e.g. "Advanced Mathematics"
 * @property {string} grade - e.g. "Grade 12"
 * @property {number} lessons - Number of lessons
 * @property {string} icon - Lucide icon name
 */

/**
 * @typedef {Object} RecentExam
 * @property {string} id
 * @property {string} title - Exam title e.g. "Calculus Basics"
 * @property {string} subject - Subject label e.g. "Math"
 * @property {string} date - Human-readable date e.g. "Oct 24"
 * @property {number|null} scorePercent - Score 0–100, null if not scored yet
 * @property {'completed'|'pending'} status
 */

/**
 * @typedef {Object} Achievement
 * @property {string} id
 * @property {string} label - Display name e.g. "7 Day Streak"
 * @property {string} icon - Lucide icon name
 * @property {'completed'|'in_progress'|'locked'} status
 */

/**
 * @typedef {Object} LeaderboardEntry
 * @property {number} rank - Rank position (1-based)
 * @property {string} name - Full display name
 * @property {string} handle - Username handle
 * @property {number} xp - Total XP points
 * @property {string|null} avatar - Avatar URL or null
 * @property {boolean} isCurrentUser - Highlight as the current user's row
 */

/**
 * @typedef {Object} AccountInfo
 * @property {string} email
 * @property {boolean} emailVerified
 * @property {string} phone
 * @property {boolean} smsVerified
 * @property {string} subscription - e.g. "Pro Plan"
 * @property {number} activeSessions - Number of active sessions
 */

/**
 * @typedef {Object} ProfilePageData
 * @property {UserProfile} user
 * @property {ProfileStats} stats
 * @property {Goal[]} goals
 * @property {PerformanceMetrics} performance
 * @property {SubjectItem[]} subjects
 * @property {RecentExam[]} recentExams
 * @property {Achievement[]} achievements
 * @property {LeaderboardEntry[]} leaderboard
 * @property {AccountInfo} account
 */

export {};
