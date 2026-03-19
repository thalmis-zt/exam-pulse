/**
 * PYQ Mock Data
 * =============
 * Sample data for Previous Year Questions listing.
 * Years are not included in topic data — kept compact per design.
 */

/** @type {import('./pyq.schema.js').PYQTopic[]} */
const physicsTopics = [
	{ id: 'phys-modern', name: 'Modern Physics', questionCount: 12, subject: 'Physics' },
	{ id: 'phys-rotational', name: 'Rotational Mechanics', questionCount: 8, subject: 'Physics' },
	{ id: 'phys-electrostatics', name: 'Electrostatics', questionCount: 15, subject: 'Physics' },
	{ id: 'phys-thermodynamics', name: 'Thermodynamics', questionCount: 10, subject: 'Physics' },
	{ id: 'phys-optics', name: 'Optics', questionCount: 9, subject: 'Physics' },
	{ id: 'phys-waves', name: 'Waves & Sound', questionCount: 7, subject: 'Physics' },
];

/** @type {import('./pyq.schema.js').PYQTopic[]} */
const chemistryTopics = [
	{ id: 'chem-organic', name: 'Organic Chemistry', questionCount: 18, subject: 'Chemistry' },
	{ id: 'chem-inorganic', name: 'Inorganic Chemistry', questionCount: 12, subject: 'Chemistry' },
	{ id: 'chem-physical', name: 'Physical Chemistry', questionCount: 14, subject: 'Chemistry' },
	{ id: 'chem-coordination', name: 'Coordination Compounds', questionCount: 6, subject: 'Chemistry' },
	{ id: 'chem-equilibrium', name: 'Chemical Equilibrium', questionCount: 8, subject: 'Chemistry' },
	{ id: 'chem-electro', name: 'Electrochemistry', questionCount: 5, subject: 'Chemistry' },
];

/** @type {import('./pyq.schema.js').PYQTopic[]} */
const mathsTopics = [
	{ id: 'math-calculus', name: 'Calculus', questionCount: 20, subject: 'Mathematics' },
	{ id: 'math-algebra', name: 'Algebra', questionCount: 16, subject: 'Mathematics' },
	{ id: 'math-vectors', name: 'Vector Algebra', questionCount: 9, subject: 'Mathematics' },
	{ id: 'math-trig', name: 'Trigonometry', questionCount: 11, subject: 'Mathematics' },
	{ id: 'math-probability', name: 'Probability', questionCount: 7, subject: 'Mathematics' },
	{ id: 'math-coordinate', name: 'Coordinate Geometry', questionCount: 13, subject: 'Mathematics' },
];

/** @type {import('./pyq.schema.js').PYQYearCard[]} */
const yearCards = [
	{ id: 'y-2025', year: 2025, examType: 'JEE Advanced', isNew: true },
	{ id: 'y-2024', year: 2024, examType: 'JEE Advanced' },
	{ id: 'y-2023', year: 2023, examType: 'JEE Mains' },
	{ id: 'y-2022', year: 2022, examType: 'JEE Mains' },
];

/** @type {import('./pyq.schema.js').PYQSubjectSection[]} */
const subjectSections = [
	{ subject: 'Physics', topics: physicsTopics },
	{ subject: 'Chemistry', topics: chemistryTopics },
	{ subject: 'Mathematics', topics: mathsTopics },
];

export const pyqData = {
	yearCards,
	subjectSections,
	examTypes: ['All', 'JEE Mains', 'JEE Advanced'],
	availableYears: [2025, 2024, 2023, 2022, 2021, 2020],
};

export { physicsTopics, chemistryTopics, mathsTopics, yearCards, subjectSections };
