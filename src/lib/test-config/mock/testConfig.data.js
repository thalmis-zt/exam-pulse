/**
 * Test Configuration Mock Data
 * ============================
 * Contains sample test configuration data objects for UI development.
 * Replace with real API calls in the service layer later.
 */

/**
 * Available subjects for test configuration
 * @type {import('./testConfig.schema.js').Subject[]}
 */
export const subjects = [
	{
		id: 'mathematics',
		name: 'Mathematics',
		icon: 'Calculator',
		color: 'bg-blue-500'
	},
	{
		id: 'physics',
		name: 'Physics',
		icon: 'Zap',
		color: 'bg-purple-500'
	},
	{
		id: 'chemistry',
		name: 'Chemistry',
		icon: 'Beaker',
		color: 'bg-pink-500'
	},
	{
		id: 'biology',
		name: 'Biology',
		icon: 'Leaf',
		color: 'bg-green-500'
	},
	{
		id: 'english',
		name: 'English',
		icon: 'BookOpen',
		color: 'bg-red-500'
	}
];

/**
 * Available topics organized by subject
 * @type {import('./testConfig.schema.js').Topic[]}
 */
export const topics = [
	// Mathematics topics
	{
		id: 'calculus_basics',
		name: 'Calculus Basics',
		subjectId: 'mathematics',
		description: 'Limits, derivatives, and integrals'
	},
	{
		id: 'algebra_advanced',
		name: 'Advanced Algebra',
		subjectId: 'mathematics',
		description: 'Polynomials, equations, and sequences'
	},
	{
		id: 'geometry_trigonometry',
		name: 'Geometry & Trigonometry',
		subjectId: 'mathematics',
		description: 'Shapes, angles, and trigonometric functions'
	},
	{
		id: 'probability_statistics',
		name: 'Probability & Statistics',
		subjectId: 'mathematics',
		description: 'Probability theory and statistical analysis'
	},
	{
		id: 'vector_matrices',
		name: 'Vectors & Matrices',
		subjectId: 'mathematics',
		description: 'Vector algebra and matrix operations'
	},

	// Physics topics
	{
		id: 'mechanics',
		name: 'Mechanics',
		subjectId: 'physics',
		description: 'Force, motion, work, and energy'
	},
	{
		id: 'thermodynamics',
		name: 'Thermodynamics',
		subjectId: 'physics',
		description: 'Heat, temperature, and thermodynamic laws'
	},
	{
		id: 'electricity_magnetism',
		name: 'Electricity & Magnetism',
		subjectId: 'physics',
		description: 'Electric fields, circuits, and magnetic forces'
	},
	{
		id: 'optics_waves',
		name: 'Optics & Waves',
		subjectId: 'physics',
		description: 'Light, sound, and wave phenomena'
	},
	{
		id: 'modern_physics',
		name: 'Modern Physics',
		subjectId: 'physics',
		description: 'Atoms, nuclei, and quantum mechanics'
	},

	// Chemistry topics
	{
		id: 'organic_chemistry',
		name: 'Organic Chemistry',
		subjectId: 'chemistry',
		description: 'Carbon compounds and reactions'
	},
	{
		id: 'inorganic_chemistry',
		name: 'Inorganic Chemistry',
		subjectId: 'chemistry',
		description: 'Periodic table, metals, and salts'
	},
	{
		id: 'physical_chemistry',
		name: 'Physical Chemistry',
		subjectId: 'chemistry',
		description: 'Bonding, kinetics, and equilibrium'
	},
	{
		id: 'analytical_chemistry',
		name: 'Analytical Chemistry',
		subjectId: 'chemistry',
		description: 'Quantitative and qualitative analysis'
	},
	{
		id: 'biochemistry',
		name: 'Biochemistry',
		subjectId: 'chemistry',
		description: 'Proteins, carbohydrates, and lipids'
	},

	// Biology topics
	{
		id: 'cell_biology',
		name: 'Cell Biology',
		subjectId: 'biology',
		description: 'Cell structure and functions'
	},
	{
		id: 'genetics_evolution',
		name: 'Genetics & Evolution',
		subjectId: 'biology',
		description: 'Heredity, mutations, and evolution'
	},
	{
		id: 'ecology_environment',
		name: 'Ecology & Environment',
		subjectId: 'biology',
		description: 'Ecosystems, biodiversity, and conservation'
	},
	{
		id: 'human_physiology',
		name: 'Human Physiology',
		subjectId: 'biology',
		description: 'Body systems and functions'
	},
	{
		id: 'plant_biology',
		name: 'Plant Biology',
		subjectId: 'biology',
		description: 'Plant structure and functions'
	},

	// English topics
	{
		id: 'reading_comprehension',
		name: 'Reading Comprehension',
		subjectId: 'english',
		description: 'Passage analysis and question answering'
	},
	{
		id: 'writing_expression',
		name: 'Writing & Expression',
		subjectId: 'english',
		description: 'Grammar, vocabulary, and composition'
	},
	{
		id: 'literature_analysis',
		name: 'Literature Analysis',
		subjectId: 'english',
		description: 'Poems, plays, and prose analysis'
	},
	{
		id: 'verbal_reasoning',
		name: 'Verbal Reasoning',
		subjectId: 'english',
		description: 'Logic, analogies, and critical thinking'
	}
];

/**
 * Available difficulty levels
 * @type {import('./testConfig.schema.js').DifficultyLevel[]}
 */
export const difficultyLevels = [
	{
		id: 'easy',
		label: 'Easy',
		description: 'Basic concepts and standard problems'
	},
	{
		id: 'medium',
		label: 'Medium',
		description: 'Intermediate concepts and mixed difficulty'
	},
	{
		id: 'hard',
		label: 'Hard',
		description: 'Advanced problems and challenging concepts'
	}
];

/**
 * Exam guidelines and rules
 * @type {import('./testConfig.schema.js').ExamGuideline[]}
 */
export const examGuidelines = [
	{
		id: 'standard_scoring',
		title: 'Standard Scoring',
		description:
			'Each correct answer awards standard points. Unanswered questions carry no penalty. Incorrect answers may carry negative marks.',
		icon: 'CheckCircle2'
	},
	{
		id: 'full_navigation',
		title: 'Full Navigation',
		description:
			'You can move freely between questions and review any question at any time before submitting your answer.',
		icon: 'Navigation2'
	},
	{
		id: 'auto_submission',
		title: 'Auto Submission',
		description:
			'Your test will automatically submit when the time limit ends. No manual submission required.',
		icon: 'Clock'
	}
];

export default {
	subjects,
	topics,
	difficultyLevels,
	examGuidelines
};
