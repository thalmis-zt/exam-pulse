/**
 * Test Configuration Mock Data Schema
 * ===================================
 * Defines the structure of API responses for the Test Configuration page.
 * This schema documents the expected data shape so that UI components
 * can be built independently of backend API implementation.
 *
 * Later, the `testConfig.service.js` will be replaced with real API calls
 * without modifying any components using this data.
 */

/**
 * @typedef {Object} Subject
 * @property {string} id - Unique identifier (e.g., "math", "physics")
 * @property {string} name - Display name (e.g., "Mathematics", "Physics")
 * @property {string} icon - Lucide icon name (e.g., "Calculator", "Zap")
 * @property {string} color - Color class (e.g., "bg-blue-500")
 */

/**
 * @typedef {Object} Topic
 * @property {string} id - Unique identifier (e.g., "calculus_basics")
 * @property {string} name - Display name (e.g., "Calculus Basics")
 * @property {string} subjectId - Parent subject ID (e.g., "math")
 * @property {string} description - Brief topic description (optional)
 */

/**
 * @typedef {Object} DifficultyLevel
 * @property {string} id - Identifier (e.g., "easy", "medium", "hard")
 * @property {string} label - Display label (e.g., "Easy", "Medium", "Hard")
 * @property {string} description - Brief description of difficulty
 */

/**
 * @typedef {Object} ExamGuideline
 * @property {string} id - Unique identifier for the guideline
 * @property {string} title - Guideline title (e.g., "Standard Scoring")
 * @property {string} description - Detailed description
 * @property {string} icon - Lucide icon name (e.g., "CheckCircle2", "Clock")
 */

/**
 * @typedef {Object} TestConfigData
 * @property {Subject[]} subjects - List of available subjects
 * @property {Topic[]} topics - All topics across all subjects
 * @property {DifficultyLevel[]} difficultyLevels - Available difficulty levels
 * @property {ExamGuideline[]} examGuidelines - Exam guidelines/rules
 */

/**
 * @typedef {Object} TestConfigRequest
 * @property {string} subjectId - Selected subject ID
 * @property {string} topicId - Selected topic ID
 * @property {string} difficultyId - Selected difficulty level
 * @property {number} questionCount - Number of questions to include
 * @property {boolean} negativeMarking - Whether negative marking is enabled
 */

// Export as module documentation
export {};
