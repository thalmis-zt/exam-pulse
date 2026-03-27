<script>
	import { onMount } from 'svelte';
	import {
		getTestHistory,
		getTestStats,
		getProTips
	} from '$lib/test-history/mock/test-history.service.js';

	import OverviewStats from '$lib/test-history/OverviewStats.svelte';
	import SearchAndFilters from '$lib/test-history/SearchAndFilters.svelte';
	import QuizCard from '$lib/test-history/QuizCard.svelte';
	import ProTip from '$lib/test-history/ProTip.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	// Loading & Error
	let isInitialLoading = $state(true);
	let isLoading = $state(false);
	let isLoadingMore = $state(false);
	let hasError = $state(false);
	let errorMessage = $state('');

	let stats = $state({});
	let proTips = $state([]);

	let tests = $state([]);
	let totalCount = $state(0);
	let currentPage = $state(1);
	let hasMore = $state(false);

	let searchQuery = $state('');
	let selectedSubject = $state(null); 
	let selectedDifficulty = $state(null); 
	let selectedTimeRange = $state(null); 

	let actionLoadingId = $state(null);
	let searchTimeout = $state(null);

	const PAGE_SIZE = 10;
	const SEARCH_DEBOUNCE_MS = 300;

	const filterOptions = {
		subjects: ['Physics', 'Chemistry', 'Biology', 'Maths'].map(s => ({ label: s, value: s })),
		difficulties: ['Easy', 'Medium', 'Hard'].map(d => ({ label: d, value: d.toLowerCase() })),
		timeRanges: [
			{ value: '1month', label: '1 Month' },
			{ value: '3months', label: '3 Months' },
			{ value: '6months', label: '6 Months' },
			{ value: '9months', label: '9 Months' },
			{ value: 'all', label: 'All Time' }
		]
	};

	// ----------------------- Unified API Call with Query Params -------------------------

	async function fetchTestsPage(page = 1, resetPagination = false) {
		if (resetPagination) {
			page = 1;
			currentPage = 1;
		}

		const isLoadingMoreCall = page > 1;
		if (isLoadingMoreCall) {
			isLoadingMore = true;
		} else {
			isLoading = true;
		}

		try {
			const filters = {
				subject: selectedSubject?.value ?? null,
				difficulty: selectedDifficulty?.value ?? null,
				timeRange: selectedTimeRange?.value ?? null,
				searchQuery: searchQuery.trim() || undefined
			};

			// API call
			const response = await getTestHistory(page, PAGE_SIZE, filters);

			if (page === 1) {
				// First page - replace data
				tests = response.data;
			} else {
				// Load more - append data
				tests = [...tests, ...response.data];
			}

			currentPage = response.page;
			totalCount = response.totalCount;
			hasMore = response.hasMore;
			hasError = false;
			errorMessage = '';

			// Handle empty results
			if (tests.length === 0 && totalCount === 0) {
				if (searchQuery.trim() || selectedSubject || selectedDifficulty) {
					errorMessage = 'No tests found for your criteria.';
				} else {
					errorMessage = 'No tests available.';
				}
				hasError = true;
			}
		} catch (error) {
			console.error('Fetch tests error:', error);
			errorMessage = error.message || 'Failed to load tests. Please try again.';
			hasError = true;

			if (page === 1) {
				tests = [];
				currentPage = 1;
				totalCount = 0;
				hasMore = false;
			}
		} finally {
			isLoading = false;
			isLoadingMore = false;
		}
	}

	// -------------------- Fetch individual data (for error cases) ----------------------

	async function fetchStats() {
		try {
			const response = await getTestStats();
			stats = response;
		} catch (error) {
			console.error('Fetch stats error:', error);
		}
	}

	async function fetchProTips() {
		try {
			const response = await getProTips();
			proTips = response;
		} catch (error) {
			console.error('Fetch pro tips error:', error);
		}
	}

	// Retry all data sources that need refetching
	async function retryFetchAll() {
		hasError = false;
		errorMessage = '';
		currentPage = 1;

		await fetchTestsPage(1, true);
		await fetchStats();
		await fetchProTips();
	}

	// ---------------------- Filter & Search Event Handlers -------------------------

	function clearSearchAndRefetch() {
		// Clear any pending search
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}
		// Fetch with filters reset to page 1
		fetchTestsPage(1, true);
	}

	function handleSearch(query) {
		searchQuery = query;

		// Clear existing timeout
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Debounce search API call
		searchTimeout = setTimeout(() => {
			fetchTestsPage(1, true); // Reset to page 1 on new search
		}, SEARCH_DEBOUNCE_MS);
	}

	function handleFilterChange(filters) {
		// Filters come as full option objects from FilterPanel
		if (filters.subject !== undefined) {
			selectedSubject = filters.subject;
		}
		if (filters.difficulty !== undefined) {
			selectedDifficulty = filters.difficulty;
		}
		if (filters.timeRange !== undefined) {
			selectedTimeRange = filters.timeRange;
		}
		clearSearchAndRefetch();
	}

	// ---------------------------- Pagination --------------------------------

	function loadMore() {
		fetchTestsPage(currentPage + 1);
	}

	// ---------------------------- Test Actions ----------------------------
	async function handleReview(testId) {
		console.log('Review test:', testId);
		goto(`/tests/${testId}/result`); // Navigate to review page
	}

	async function handleRetry(testId) {
		console.log('Retry test:', testId);
		// TODO: Navigate to retry test page
	}

	function handleStartTest() {
		console.log('Starting new test...');
		// TODO: Navigate to quiz/test selection page
	}

	// ---------------------------- Lifecycle --------------------------------------
	onMount(async () => {
		if(!browser) return; // Ensure this runs only in the browser
		
		await fetchTestsPage(1, true);
		await fetchStats();
		await fetchProTips();

		isInitialLoading = false;
	});
</script>

<!-- Main Container -->
<div class="duration-motion-normal ease-ease-standard transition">
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Test History" subtitle="Review and analyze your test performance" />

		<!-- Initial Loading State -->
		{#if isInitialLoading}
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<Spinner message="Loading test history..." />
			</div>
		{:else}
			<!-- Stats Cards -->
			<OverviewStats {stats} />

			<!-- Main Content (Two Column on Desktop, Single on Mobile) -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
				<!-- Main Feed (Desktop: 3 columns, Mobile: full width) -->
				<div class="flex flex-col gap-4 lg:col-span-3">
					<SectionHeader title="Recent Tests" subtitle="Review your test performance" variant="md" />

					<!-- Search Bar -->
					<SearchAndFilters
						{selectedSubject}
						{selectedDifficulty}
						{selectedTimeRange}
						subjects={filterOptions.subjects}
						difficulties={filterOptions.difficulties}
						timeRanges={filterOptions.timeRanges}
						onSearch={handleSearch}
						onFilterChange={handleFilterChange}
					/>

					<!-- Loading State (Filter/Search) -->
					{#if isLoading}
						<div class="flex flex-col items-center justify-center gap-3 py-12">
							<Spinner message="Loading tests..." />
						</div>
					{:else if hasError}
						<!-- Error State -->
						<StateDisplay
							title="No Results Found"
							message={errorMessage}
							buttonLabel="Retry"
							onButtonClick={retryFetchAll}
							variant="error"
						/>
					{:else}
						<!-- Check for empty results -->
						{#if tests.length === 0}
							<StateDisplay
								title="No test history yet"
								message="Start a new test to see your performance history here."
								buttonLabel="Start Test"
								onButtonClick={handleStartTest}
								variant="empty"
							/>
						{:else}
							<!-- Tests List -->
							<div class="flex flex-col gap-4">
								{#each tests as test (test.id)}
									<QuizCard
										{test}
										isLoading={actionLoadingId === test.id}
										onReview={handleReview}
										onRetry={handleRetry}
									/>
								{/each}
							</div>

							<!-- Load More Button -->
							{#if hasMore}
								<Button btnType="primaryLight" onclick={loadMore} disabled={isLoadingMore}>
									{#if isLoadingMore}
										Loading...
									{:else}
										Load More Tests ({tests.length} of {totalCount})
									{/if}
								</Button>
							{/if}

							<!-- Results Info -->
							<p class="text-fg-muted font-poppins text-center text-xs md:text-sm">
								Showing {tests.length} of {totalCount} quizzes
							</p>
						{/if}
					{/if}
				</div>

				<!-- Right Panel (Desktop Only) -->
				<div class="flex flex-col gap-4 md:gap-6">
					{#each proTips as tip (tip.id)}
						<ProTip title={tip.title} subtitle={tip.subtitle} icon={tip.icon} />
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
