/**
 * Mock Test History Data
 * Provides sample quiz/test attempts data
 */

export const mockTestHistory = [
	{
		id: 'test-1',
		name: 'Advanced Quantum Mechanics',
		subject: 'Physics',
		topic: 'Quantum Functions',
		status: 'completed',
		difficulty: 'hard',
		date: new Date('2024-10-24'),
		time: '45m 12s',
		totalQuestions: 50,
		questionsAttempted: 42,
		correct: 35,
		incorrect: 5,
		skipped: 7,
		score: 70,
		maxScore: 100
	},
	{
		id: 'test-2',
		name: 'Cell Biology Essentials',
		subject: 'Biology',
		topic: 'Metabolism',
		status: 'completed',
		difficulty: 'medium',
		date: new Date('2024-10-24'),
		time: '45m 12s',
		totalQuestions: 50,
		questionsAttempted: 42,
		correct: 35,
		incorrect: 5,
		skipped: 7,
		score: 70,
		maxScore: 100
	},
	{
		id: 'test-3',
		name: 'Organic Chemistry Midterm',
		subject: 'Chemistry',
		topic: 'Systhesis Reaction',
		status: 'completed',
		difficulty: 'hard',
		date: new Date('2024-10-24'),
		time: '45m 12s',
		totalQuestions: 50,
		questionsAttempted: 42,
		correct: 35,
		incorrect: 5,
		skipped: 7,
		score: 70,
		maxScore: 100
	},
	{
		id: 'test-4',
		name: 'Electromagnetism Basics',
		subject: 'Physics',
		topic: 'Electrostatics',
		status: 'completed',
		difficulty: 'medium',
		date: new Date('2024-10-23'),
		time: '35m 45s',
		totalQuestions: 40,
		questionsAttempted: 40,
		correct: 32,
		incorrect: 8,
		skipped: 0,
		score: 80,
		maxScore: 100
	},
	{
		id: 'test-5',
		name: 'Thermodynamics Advanced',
		subject: 'Physics',
		topic: 'Heat Transfer',
		status: 'completed',
		difficulty: 'hard',
		date: new Date('2024-10-20'),
		time: '52m 30s',
		totalQuestions: 60,
		questionsAttempted: 55,
		correct: 40,
		incorrect: 10,
		skipped: 5,
		score: 67,
		maxScore: 100
	}
];

export const mockStats = {
	totalAttempts: 124,
	averageScore: 76,
	bestScore: 98,
	accuracy: 82,
	totalTimeSpent: '125h 30m',
	averageTimePerTest: '45m 12s'
};

export const mockRecommendations = [
	{
		id: 'rec-1',
		title: 'Solve 3+ quizzes within 24 hours',
		subtitle: 'Increases learning retention by 60%',
		icon: 'star'
	},
	{
		id: 'rec-2',
		title: 'Review incorrect answers',
		subtitle: 'Focus on weak areas identified in recent tests',
		icon: 'target'
	}
];

export const mockProTips = [
	{
		id: 'tip-1',
		title: 'Study quizzes within 48 hours',
		subtitle: 'Studying quizzes within 48 hours increases long-term retention by up to 60%.',
		icon: 'lightbulb'
	}
];

export const mockDailyAccumulation = [
	{ date: '2024-10-18', attempts: 2, score: 75 },
	{ date: '2024-10-19', attempts: 3, score: 82 },
	{ date: '2024-10-20', attempts: 1, score: 67 },
	{ date: '2024-10-21', attempts: 2, score: 88 },
	{ date: '2024-10-22', attempts: 2, score: 79 },
	{ date: '2024-10-23', attempts: 3, score: 85 },
	{ date: '2024-10-24', attempts: 2, score: 76 }
];
