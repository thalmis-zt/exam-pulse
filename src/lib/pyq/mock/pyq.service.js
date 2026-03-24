/**
 * PYQ Mock Service
 * ================
 * Provides PYQ data for the listing page.
 * To integrate with a real backend: replace with API calls matching pyq.schema.js
 */

import { pyqData } from './pyq.data.js';

/**
 * Fetches PYQ page data (year cards, subject sections, filters).
 *
 * @param {Object} [filters]
 * @param {string} [filters.examType] - "All" | "JEE Mains" | "JEE Advanced"
 * @param {number} [filters.year] - Filter year cards
 * @returns {Promise<import('./pyq.schema.js').PYQPageData>}
 */
export async function getPYQData(filters = {}) {
	await new Promise((resolve) => setTimeout(resolve, 200));

	let yearCards = [...pyqData.yearCards];

	if (filters.examType && filters.examType !== 'All') {
		yearCards = yearCards.filter((c) => c.examType === filters.examType);
	}
	if (filters.year) {
		yearCards = yearCards.filter((c) => c.year === filters.year);
	}

	return {
		yearCards,
		subjectSections: pyqData.subjectSections,
		examTypes: pyqData.examTypes,
		availableYears: pyqData.availableYears,
	};
}
