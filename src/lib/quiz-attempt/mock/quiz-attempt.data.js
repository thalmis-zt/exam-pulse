/**
 * Quiz Attempt Mock Data
 * =====================
 * Sample data for the Quiz Attempt page.
 */

/** @type {import('./quiz-attempt.schema.js').Question[]} */
export const sampleQuestions = [
	{
		id: 'q1',
		index: 1,
		subject: 'Geometry',
		text: 'What is the sum of interior angles of a triangle?',
		options: [
			{ label: 'A', text: '90 degrees' },
			{ label: 'B', text: '180 degrees' },
			{ label: 'C', text: '270 degrees' },
			{ label: 'D', text: '360 degrees' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'q2',
		index: 2,
		subject: 'Geometry',
		text: 'In a right triangle, the hypotenuse is opposite to which angle?',
		options: [
			{ label: 'A', text: 'Acute angle' },
			{ label: 'B', text: 'Right angle' },
			{ label: 'C', text: 'Obtuse angle' },
			{ label: 'D', text: 'Reflex angle' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'q3',
		index: 3,
		subject: 'Geometry',
		text: 'What is the area of a circle with radius 7?',
		options: [
			{ label: 'A', text: '22π' },
			{ label: 'B', text: '49π' },
			{ label: 'C', text: '14π' },
			{ label: 'D', text: '7π' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'q4',
		index: 4,
		subject: 'Geometry',
		text: 'If a triangle has sides of length 3, 4, and 5, what is the measure of the angle opposite the side of length 5?',
		options: [
			{ label: 'A', text: '45 degrees' },
			{ label: 'B', text: '90 degrees' },
			{ label: 'C', text: '60 degrees' },
			{ label: 'D', text: '30 degrees' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'q5',
		index: 5,
		subject: 'Geometry',
		text: 'How many diagonals does a regular hexagon have?',
		options: [
			{ label: 'A', text: '6' },
			{ label: 'B', text: '9' },
			{ label: 'C', text: '12' },
			{ label: 'D', text: '18' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	}
];

/** @type {import('./quiz-attempt.schema.js').Question[]} */
export const geometryAssessmentQuestions = [
	...sampleQuestions,
	...Array.from({ length: 15 }, (_, i) => {
		const idx = i + 6;
		return {
			id: `q${idx}`,
			index: idx,
			subject: 'Geometry',
			text: `Sample geometry question ${idx}.`,
			options: [
				{ label: 'A', text: 'Option A' },
				{ label: 'B', text: 'Option B' },
				{ label: 'C', text: 'Option C' },
				{ label: 'D', text: 'Option D' }
			],
		positiveMarks: 4,
		negativeMarks: 1
		};
	})
];

/**
 * Multi-subject mock (JEE-style) — use attempt id containing `jee`, e.g. `/tests/jee-demo/review`.
 * @type {import('./quiz-attempt.schema.js').Question[]}
 */
export const jeeMockQuestions = [
	{
		id: 'jee-q1',
		index: 1,
		subject: 'Physics',
		text: 'A body moves with uniform acceleration. Which quantity remains constant?',
		options: [
			{ label: 'A', text: 'Velocity' },
			{ label: 'B', text: 'Acceleration' },
			{ label: 'C', text: 'Displacement per second' },
			{ label: 'D', text: 'Kinetic energy' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q2',
		index: 2,
		subject: 'Physics',
		text: 'The SI unit of power is:',
		options: [
			{ label: 'A', text: 'Joule' },
			{ label: 'B', text: 'Watt' },
			{ label: 'C', text: 'Newton' },
			{ label: 'D', text: 'Pascal' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q3',
		index: 3,
		subject: 'Physics',
		text: 'Which wave requires a material medium to propagate?',
		options: [
			{ label: 'A', text: 'Light' },
			{ label: 'B', text: 'Sound' },
			{ label: 'C', text: 'X-rays' },
			{ label: 'D', text: 'Radio (in vacuum)' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q4',
		index: 4,
		subject: 'Chemistry',
		text: 'The atomic number of carbon is:',
		options: [
			{ label: 'A', text: '4' },
			{ label: 'B', text: '6' },
			{ label: 'C', text: '8' },
			{ label: 'D', text: '12' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q5',
		index: 5,
		subject: 'Chemistry',
		text: 'Which bond is strongest in typical organic molecules?',
		options: [
			{ label: 'A', text: 'Hydrogen bond' },
			{ label: 'B', text: 'Ionic bond' },
			{ label: 'C', text: 'Covalent bond' },
			{ label: 'D', text: 'Van der Waals' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q6',
		index: 6,
		subject: 'Chemistry',
		text: 'pH of a neutral solution at 25°C is approximately:',
		options: [
			{ label: 'A', text: '0' },
			{ label: 'B', text: '7' },
			{ label: 'C', text: '14' },
			{ label: 'D', text: '1' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q7',
		index: 7,
		subject: 'Mathematics',
		text: 'The derivative of x² with respect to x is:',
		options: [
			{ label: 'A', text: 'x' },
			{ label: 'B', text: '2x' },
			{ label: 'C', text: 'x²' },
			{ label: 'D', text: '2' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q8',
		index: 8,
		subject: 'Mathematics',
		text: 'Sum of angles in a triangle (degrees):',
		options: [
			{ label: 'A', text: '90' },
			{ label: 'B', text: '180' },
			{ label: 'C', text: '270' },
			{ label: 'D', text: '360' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q9',
		index: 9,
		subject: 'Mathematics',
		text: 'If sin θ = 0.5, θ in first quadrant, θ equals:',
		options: [
			{ label: 'A', text: '15°' },
			{ label: 'B', text: '30°' },
			{ label: 'C', text: '45°' },
			{ label: 'D', text: '60°' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	},
	{
		id: 'jee-q10',
		index: 10,
		subject: 'Mathematics',
		text: 'The value of log₁₀(100) is:',
		options: [
			{ label: 'A', text: '1' },
			{ label: 'B', text: '2' },
			{ label: 'C', text: '10' },
			{ label: 'D', text: '100' }
		],
		positiveMarks: 4,
		negativeMarks: 1
	}
];
