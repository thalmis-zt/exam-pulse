/**
 * Profile Mock Data
 * =================
 * Sample data for UI development.
 * Replace with real API calls via profile.service.js when backend is ready.
 */

/** @type {import('./profile.schema.js').UserProfile} */
export const user = {
	name: 'Rahul Rajan',
	handle: '@johndoe_study',
	avatar: null,
	bio: '"Consistency is the key to mastering the complex."',
	grade: 'Grade 12',
	examTag: 'SAT/JEE',
	profileCompletion: 85,
	joinedDate: 'Jan 2024',
	rank: 1240,
	totalXP: 4800
};

/** @type {import('./profile.schema.js').ProfileStats} */
export const stats = {
	avgScore: 82.4,
	accuracy: 82.4,
	totalQuizzes: 142
};

/** @type {import('./profile.schema.js').Goal[]} */
export const goals = [
	{
		id: 'goal_1',
		isPrimary: true,
		title: 'IIT JEE - 2027',
		description: 'Practice mock tests and master IIT JEE concepts.',
		examsCount: 1140,
		topicsCount: 110,
		questionsCount: 2000
	},
	{
		id: 'goal_2',
		isPrimary: false,
		title: 'BITSAT - 2027',
		description: 'Cover all BITSAT syllabus with targeted practice.',
		examsCount: 480,
		topicsCount: 80,
		questionsCount: 1500
	}
];

/** @type {import('./profile.schema.js').PerformanceMetrics} */
export const performance = {
	bestSubject: 'Physics',
	weakestTopic: 'Integration',
	dailyGoal: { current: 45, total: 60, targetPercent: 75 }
};

/** @type {import('./profile.schema.js').SubjectItem[]} */
export const subjects = [
	{ id: 'subj_1', name: 'Mathematics', grade: 'Grade 12', lessons: 13,  },
	{ id: 'subj_2', name: 'Chemistry', grade: 'Grade 12', lessons: 9,  },
	{ id: 'subj_3', name: 'Physics', grade: 'Grade 12', lessons: 15,  },
	{ id: 'subj_4', name: 'Biology', grade: 'Grade 12', lessons: 15, },
	{ id: 'subj_5', name: 'Aptitude', grade: 'Grade 12', lessons: 15, },
];

/** @type {import('./profile.schema.js').RecentExam[]} */
export const recentExams = [
	{ id: 'exam_1', title: 'Calculus Basics', subject: 'Math', date: 'Oct 24', scorePercent: 95, status: 'completed' },
	{ id: 'exam_2', title: 'Newton Laws', subject: 'Physics', date: 'Oct 22', scorePercent: 88, status: 'completed' },
	{ id: 'exam_3', title: 'Periodic Table', subject: 'Chem', date: 'Oct 21', scorePercent: null, status: 'pending' }
];

/** @type {import('./profile.schema.js').Achievement[]} */
export const achievements = [
	{ id: 'ach_1', label: '7 Day Streak', icon: 'Zap', status: 'completed' },
	{ id: 'ach_2', label: 'Sharpshooter', icon: 'Target', status: 'completed' },
	{ id: 'ach_3', label: 'Century Club', icon: 'Star', status: 'in_progress' },
	{ id: 'ach_4', label: 'Top 10', icon: 'Trophy', status: 'in_progress' },
	{ id: 'ach_5', label: 'Speed Demon', icon: 'Zap', status: 'in_progress' },
	{ id: 'ach_6', label: 'Night Owl', icon: 'Moon', status: 'locked' }
];

/** @type {import('./profile.schema.js').LeaderboardEntry[]} */
export const leaderboard = [
	{ rank: 1, name: 'Alex Rivera', handle: '@alex_rivera', xp: 12840, avatar: null, isCurrentUser: false },
	{ rank: 2, name: 'Sarah Connor', handle: '@sarah_connor', xp: 11600, avatar: null, isCurrentUser: false },
	{ rank: 3, name: 'John Doe', handle: '@johndoe_study', xp: 9800, avatar: null, isCurrentUser: true },
	{ rank: 4, name: 'Emily Blunt', handle: '@emily_blunt', xp: 8460, avatar: null, isCurrentUser: false }
];

/** @type {import('./profile.schema.js').AccountInfo} */
export const account = {
	email: 'john.doe@example.com',
	emailVerified: true,
	phone: '+1 (555) 012-3456',
	smsVerified: true,
	subscription: 'Pro Plan',
	activeSessions: 3
};
