/**
 * PYQ (Previous Year Questions) Schema
 * ====================================
 * Defines the structure of PYQ API responses.
 * Years are intentionally excluded from topic cards for a compact UI.
 */

/**
 * @typedef {Object} PYQTopic
 * @property {string} id - Unique identifier
 * @property {string} name - Topic name (e.g., "Modern Physics", "Organic Chemistry")
 * @property {number} questionCount - Number of questions in this topic
 * @property {'Physics' | 'Chemistry' | 'Mathematics'} subject - Subject
 */

/**
 * @typedef {Object} PYQYearCard
 * @property {string} id - Unique identifier
 * @property {number} year - Year (e.g., 2025, 2024)
 * @property {string} examType - "JEE Mains" | "JEE Advanced"
 * @property {boolean} [isNew] - Show "NEW" badge
 */

/**
 * @typedef {Object} PYQSubjectSection
 * @property {'Physics' | 'Chemistry' | 'Mathematics'} subject
 * @property {PYQTopic[]} topics
 */

/**
 * @typedef {Object} PYQPageData
 * @property {PYQYearCard[]} yearCards - Year-wise mock test cards
 * @property {PYQSubjectSection[]} subjectSections - Topics grouped by subject
 * @property {string[]} examTypes - Available exam type filters (e.g., ["All", "JEE Mains", "JEE Advanced"])
 * @property {number[]} availableYears - Years for year filter dropdown
 */

export {};
