/**
 * Subject detail page — mock schema (UI + future API contract).
 */

/**
 * @typedef {Object} SubjectHeroData
 * @property {string} subjectLabel - e.g. "Mathematics (Core)"
 * @property {string} gradeLabel - e.g. "Grade 12"
 * @property {string} title
 * @property {string} description
 * @property {number} masteryPercent
 * @property {string} masteryCaption
 * @property {number} rank
 * @property {number} xpEarned
 */

/**
 * @typedef {Object} PerformanceBlock
 * @property {{ current: number, total: number }} questionsAttempted
 * @property {number} accuracyPercent
 * @property {string} accuracyDelta
 * @property {string} totalTime
 * @property {string} timePerDay
 */

/**
 * @typedef {Object} SyllabusTopic
 * @property {string} id
 * @property {string} name
 * @property {number} percentCovered
 * @property {number} questionCount
 */

/**
 * @typedef {Object} SyllabusTerm
 * @property {string} id
 * @property {string} label
 * @property {SyllabusTopic[]} topics
 */

/**
 * @typedef {Object} SmartFocusData
 * @property {string[]} strong - Topics for Score Boosters (strong areas)
 * @property {string[]} weak - Topics for Knowledge Gaps (needs improvement)
 */

/**
 * @typedef {Object} QuickStats
 * @property {number} savedQuestions
 * @property {number} mistakeLog
 */

/**
 * @typedef {Object} ResourceLink
 * @property {string} id
 * @property {string} label
 * @property {'sessions' | 'pdf' | 'expert'} kind
 */

/**
 * @typedef {Object} SubjectMockTest
 * @property {string} title
 * @property {string} description
 * @property {string} duration
 * @property {string} questions
 * @property {string} users
 * @property {string|number} xp
 * @property {'Easy' | 'Medium' | 'Hard'} [difficulty]
 */

/**
 * @typedef {Object} SubjectDetail
 * @property {string} id - Subject identifier (matches `subjects/[id]` route)
 * @property {string} iconName - Lucide icon name for hero
 * @property {string} iconBgClass
 * @property {string} iconTextClass
 * @property {SubjectHeroData} hero
 * @property {PerformanceBlock} performance
 * @property {SyllabusTerm[]} syllabusTerms
 * @property {SmartFocusData} smartFocus
 * @property {QuickStats} quickStats
 * @property {SubjectMockTest[]} recommendedMocks
 * @property {number} newMocksCount
 * @property {ResourceLink[]} resources
 */

export {};
