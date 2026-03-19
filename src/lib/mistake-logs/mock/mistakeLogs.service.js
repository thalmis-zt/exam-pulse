/**
 * Mistake Logs Service
 * ====================
 * Provides data fetching and manipulation for mistake logs.
 */

import { mistakesData, PAGE_SIZE } from './mistakeLogs.data.js';

/**
 * Fetch paginated mistake logs with optional filtering
 * @param {number} [page=1] - Page number (1-indexed)
 * @param {number} [pageSize=10] - Items per page
 * @param {Object} [filters] - Filter criteria
 * @param {string} [filters.subject] - Filter by subject name
 * @param {string} [filters.query] - Search query for question text and tags
 * @returns {Promise<{mistakes: Array, totalCount: number, currentPage: number, hasMore: boolean}>}
 */
export async function fetchMistakeLogs(page = 1, pageSize = PAGE_SIZE, filters = null) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  let filtered = [...mistakesData];

  // Filter by subject
  if (filters?.subject) {
    filtered = filtered.filter((mistake) => mistake.subject === filters.subject);
  }

  // Search by query (searches in question text and tags)
  if (filters?.query) {
    const queryLower = filters.query.toLowerCase();
    filtered = filtered.filter(
      (mistake) =>
        mistake.text.toLowerCase().includes(queryLower) ||
        mistake.tags.some((tag) => tag.toLowerCase().includes(queryLower)) ||
        mistake.topic.toLowerCase().includes(queryLower) ||
        mistake.explanation.toLowerCase().includes(queryLower)
    );
  }

  // Sort by mistakeAt descending (most recent first)
  filtered.sort((a, b) => new Date(b.mistakeAt) - new Date(a.mistakeAt));

  const totalCount = filtered.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const mistakes = filtered.slice(startIndex, endIndex);

  return {
    mistakes,
    totalCount,
    currentPage: page,
    hasMore: endIndex < totalCount
  };
}

/**
 * Search mistakes by query (searches in question text and tags)
 * @param {string} query - Search query
 * @param {Object} [filters] - Additional filters
 * @param {string} [filters.subject] - Filter by subject
 * @returns {Promise<Array>}
 */
export async function searchMistakeLogs(query, filters = null) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  let results = [...mistakesData];

  // Filter by subject
  if (filters?.subject) {
    results = results.filter((mistake) => mistake.subject === filters.subject);
  }

  // Search in question text and tags
  const queryLower = query.toLowerCase();
  results = results.filter(
    (mistake) =>
      mistake.text.toLowerCase().includes(queryLower) ||
      mistake.tags.some((tag) => tag.toLowerCase().includes(queryLower)) ||
      mistake.topic.toLowerCase().includes(queryLower)
  );

  // Sort by relevance and recency
  results.sort((a, b) => new Date(b.mistakeAt) - new Date(a.mistakeAt));

  return results;
}

/**
 * Get statistics of mistakes by subject
 * @returns {Promise<{subject: string, count: number, accuracy: number}[]>}
 */
export async function getSubjectStats() {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const subjects = ['Physics', 'Chemistry', 'Maths'];
  const stats = subjects.map((subject) => {
    const subjectMistakes = mistakesData.filter((m) => m.subject === subject);
    const avgAccuracy =
      subjectMistakes.length > 0
        ? Math.round(
            subjectMistakes.reduce((sum, m) => sum + m.accuracy, 0) / subjectMistakes.length
          )
        : 0;

    return {
      subject,
      count: subjectMistakes.length,
      accuracy: avgAccuracy
    };
  });

  return stats;
}

/**
 * Delete a single mistake log
 * @param {string} id - Mistake ID
 * @returns {Promise<boolean>}
 */
export async function deleteMistake(id) {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const index = mistakesData.findIndex((m) => m.id === id);
  if (index > -1) {
    mistakesData.splice(index, 1);
    return true;
  }

  return false;
}

/**
 * Create a practice test from selected mistakes
 * @param {string[]} mistakeIds - Array of mistake IDs
 * @returns {Promise<{testId: string, questionCount: number, subjects: string[]}>}
 */
export async function createTestFromMistakes(mistakeIds) {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const selectedMistakes = mistakesData.filter((m) => mistakeIds.includes(m.id));
  const subjects = [...new Set(selectedMistakes.map((m) => m.subject))];
  const testId = `test-${Date.now()}`;

  return {
    testId,
    questionCount: selectedMistakes.length,
    subjects
  };
}
