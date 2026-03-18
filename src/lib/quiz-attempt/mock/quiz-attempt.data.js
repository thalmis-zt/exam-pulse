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
