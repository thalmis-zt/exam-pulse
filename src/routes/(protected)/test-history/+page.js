import {
	getTestHistory,
	getTestStats,
	getProTips
} from '$lib/test-history/mock/test-history.service.js';

const PAGE_SIZE = 10;

// Change and add response status checks when integrating with real API

export async function load({ fetch, url, parent }) {
	const loadTestHistory = async () => {
		try {
			const data = await getTestHistory(1, PAGE_SIZE, {});
			return data;
		} catch (error) {
			console.error('Error loading test history:', error);
			return {
				data: [],
				totalCount: 0,
				page: 1,
				pageSize: PAGE_SIZE,
				hasMore: false,
				error: error.message || 'Failed to load test history'
			};
		}
	};

	const loadStats = async () => {
		try {
			const data = await getTestStats();
			return data;
		} catch (error) {
			console.error('Error loading stats:', error);
			return {
				error: error.message || 'Failed to load statistics'
			};
		}
	};

	const loadProTips = async () => {
		try {
			const data = await getProTips();
			return data;
		} catch (error) {
			console.error('Error loading pro tips:', error);
			return {
				error: error.message || 'Failed to load pro tips'
			};
		}
	};

	return {
		testHistory: await loadTestHistory(),
		stats: await loadStats(),
		proTips: await loadProTips()
	};
}
