/**
 * Mock service for registration / profile completion flow.
 */

export const STEPS = [
	{ id: 'basic', label: 'Basic Information' },
	{ id: 'academic', label: 'Academic Context' },
	{ id: 'preferences', label: 'Preferences & Goals' },
	{ id: 'review', label: 'Review & Submit' }
];

export const INFO_CARD = {
	title: 'Why complete this?',
	description:
		'Students who complete their profile see a 40% increase in learning efficiency. We use this information to personalize your study plan and recommend the right resources.'
};

export const BOARD_OPTIONS = [
	{ id: 'cbse', name: 'CBSE' },
	{ id: 'icse', name: 'ICSE' },
	{ id: 'state', name: 'State Board' }
];

export const EXAM_OPTIONS = [
	{ id: 'jee', name: 'JEE' },
	{ id: 'neet', name: 'NEET' },
	{ id: 'cuet', name: 'CUET' }
];

export const YEAR_OPTIONS = [
	{ id: '2025', name: '2025' },
	{ id: '2026', name: '2026' },
	{ id: '2027', name: '2027' }
];

export const SUBJECT_OPTIONS = [
	{ id: 'math', label: 'Mathematics' },
	{ id: 'physics', label: 'Physics' },
	{ id: 'chemistry', label: 'Chemistry' },
	{ id: 'biology', label: 'Biology' },
	{ id: 'cs', label: 'Computer Science' },
	{ id: 'english', label: 'English Literature' },
	{ id: 'history', label: 'History' },
	{ id: 'economics', label: 'Economics' }
];

export const LEARNING_GOAL_OPTIONS = [
	{
		id: 'practice',
		title: 'Practice Regularly',
		subtitle: 'Daily micro-learning sessions to stay consistent.'
	},
	{
		id: 'weak',
		title: 'Improve Weak Areas',
		subtitle: 'Focused exercises on topics you find challenging.'
	}
];

export const PRACTICE_QUESTIONS_OPTIONS = [
	{ value: 10, label: '10' },
	{ value: 20, label: '20' },
	{ value: 30, label: '30' },
	{ value: 50, label: '50' }
];

export const STUDY_DURATION_OPTIONS = [
	{ value: 1, label: '1' },
	{ value: 2, label: '2' },
	{ value: 4, label: '4' },
	{ value: 6, label: '6+' }
];

export async function getRegistrationOptions() {
	return {
		boards: BOARD_OPTIONS,
		exams: EXAM_OPTIONS,
		years: YEAR_OPTIONS,
		subjects: SUBJECT_OPTIONS,
		learningGoals: LEARNING_GOAL_OPTIONS,
		practiceQuestions: PRACTICE_QUESTIONS_OPTIONS,
		studyDurations: STUDY_DURATION_OPTIONS
	};
}

export async function submitProfile(data) {
	// Simulate API call
	await new Promise((r) => setTimeout(r, 500));
	return { success: true };
}
