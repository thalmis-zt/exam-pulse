<script>
	import { onMount } from 'svelte';
	import {
		fetchMistakeLogs,
		deleteMistake,
		getSubjectStats
	} from '$lib/mistake-logs/mock/mistakeLogs.service.js';

	import { Atom, Beaker, BarChart3 } from '@lucide/svelte';

	import StatsCard from '$lib/saved-questions/StatsCard.svelte';
	import QuestionCard from '$lib/saved-questions/QuestionCard.svelte';
	import MistakePracticeCard from '$lib/mistake-logs/MistakePracticeCard.svelte';
	import LoaderUI from '$lib/saved-questions/LoaderUI.svelte';
	import ErrorUI from '$lib/saved-questions/ErrorUI.svelte';
	import SearchBar from '$lib/saved-questions/SearchBar.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import { browser } from '$app/environment';

	// Pre-loaded data from +page.js (optional)
	let data = $props();

	// ===== STATE =====

	// Loading & Error
	let isInitialLoading = $state(true);
	let isLoading = $state(false);
	let isLoadingMore = $state(false);
	let hasError = $state(false);
	let errorMessage = $state('');

	// Mistakes & Pagination
	let mistakes = $state([]);
	let totalCount = $state(0);
	let currentPage = $state(1);
	let hasMore = $state(false);

	// Filters & Search
	let selectedSubject = $state(null);
	let subjectStats = $state([]);
	let searchQuery = $state('');

	let searchTimeout = $state(null);
	let actionLoadingId = $state(null);

	const PAGE_SIZE = 10;
	const SEARCH_DEBOUNCE_MS = 300;

	// Derived: Check if any filters are applied
	const hasAppliedFilters = $derived(searchQuery.trim() !== '' || selectedSubject !== null);

	// Computed values - map stats to display format
	const displayedStats = $derived(
		subjectStats.map((stat) => ({
			subject: stat.subject,
			icon: stat.subject === 'Physics' ? Atom : stat.subject === 'Chemistry' ? Beaker : BarChart3,
			count: stat.count,
			backgroundColor:
				stat.subject === 'Physics' ? 'info' : stat.subject === 'Chemistry' ? 'danger' : 'success',
			active: selectedSubject === stat.subject
		}))
	);

	// ----------------------- Unified API Call with Query Params -------------------------

	async function fetchMistakesPage(page = 1, resetPagination = false) {
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
			// Build filters object
			const filters = {
				subject: selectedSubject,
				query: searchQuery.trim() || undefined
			};

			// API call
			const response = await fetchMistakeLogs(page, PAGE_SIZE, filters);

			if (page === 1) {
				// First page - replace data
				mistakes = response.mistakes;
			} else {
				// Load more - append data
				mistakes = [...mistakes, ...response.mistakes];
			}

			currentPage = response.currentPage;
			totalCount = response.totalCount;
			hasMore = response.hasMore;
			hasError = false;
			errorMessage = '';

			// Handle empty results
			if (mistakes.length === 0 && totalCount === 0) {
				if (hasAppliedFilters) {
					errorMessage = 'No mistakes found for your criteria.';
				} else {
					errorMessage = 'No mistakes logged yet.';
				}
				hasError = true;
			}
		} catch (error) {
			console.error('Fetch mistakes error:', error);
			errorMessage = error.message || 'Failed to load mistakes. Please try again.';
			hasError = true;

			if (page === 1) {
				mistakes = [];
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
			const stats = await getSubjectStats();
			subjectStats = stats;
		} catch (error) {
			console.error('Fetch stats error:', error);
		}
	}

	// Retry all data sources
	async function retryFetchAll() {
		hasError = false;
		errorMessage = '';
		currentPage = 1;

		await Promise.all([fetchMistakesPage(1, true), fetchStats()]);
	}

	// ----------------------------- Filter & Search Handlers --------------------------------

	function handleFilterBySubject(subject) {
		// Toggle subject filter
		if (selectedSubject === subject) {
			selectedSubject = null;
		} else {
			selectedSubject = subject;
		}

		// Clear search on filter change
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Reset to page 1 and fetch
		fetchMistakesPage(1, true);
	}

	function handleSearch(query) {
		searchQuery = query;

		// Clear existing timeout
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Debounce search API call
		searchTimeout = setTimeout(() => {
			fetchMistakesPage(1, true); // Reset to page 1 on new search
		}, SEARCH_DEBOUNCE_MS);
	}

	function handleFilterClick() {
		console.log('Opening advanced filters...');
		// TODO: Show advanced filters modal
	}

	// ----------------------------- Pagination --------------------------------

	function loadMore() {
		fetchMistakesPage(currentPage + 1);
	}

	// ----------------------------- Deletion --------------------------------

	async function handleDeleteMistake(mistakeId) {
		actionLoadingId = mistakeId;
		try {
			await deleteMistake(mistakeId);

			// Remove from local list
			mistakes = mistakes.filter((m) => m.id !== mistakeId);
			totalCount = Math.max(0, totalCount - 1);
		} catch (error) {
			console.error('Delete error:', error);
			errorMessage = error.message || 'Failed to delete mistake log. Please try again.';
		} finally {
			actionLoadingId = null;
		}
	}

	// ----------------------------- Lifecycle --------------------------------

	onMount(async () => {
		if (!browser) return;

		// Check if pre-loaded data exists and is valid
		const hasPreloadedData = data?.mistakes && !data.mistakes.error;

		// Load pre-loaded data or fetch
		if (hasPreloadedData) {
			mistakes = data.mistakes.mistakes || [];
			totalCount = data.mistakes.totalCount || 0;
			currentPage = data.mistakes.currentPage || 1;
			hasMore = data.mistakes.hasMore || false;
		} else {
			// Fetch if no pre-loaded data
			await fetchMistakesPage(1, true);
		}

		// Load stats - use pre-loaded or fetch separately
		const hasPreloadedStats = data?.stats && !data.stats.error;
		if (hasPreloadedStats) {
			subjectStats = data.stats || [];
		} else {
			// Fetch stats separately if no pre-loaded data
			await fetchStats();
		}

		// Set initial loading state to false
		isInitialLoading = false;
	});

</script>

<!-- Main Container -->
<div class="duration-motion-normal ease-ease-standard transition">
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Mistake Logs" subtitle="Review your mistakes and learn from them" />

		<!-- Initial Loading State -->
		{#if isInitialLoading}
			<LoaderUI message="Loading your mistake logs..." />
		{:else if totalCount === 0 && !hasAppliedFilters}
			<!-- Empty State: Only show when truly no data and no filters applied -->
			<div class="flex flex-col items-center justify-center gap-4 py-16">
				<div class="bg-success/10 flex h-16 w-16 items-center justify-center rounded-full">
					<svg class="text-success h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-fg font-inter text-base font-bold">No mistakes logged yet</h3>
				<p class="text-fg-muted font-poppins max-w-sm text-center text-sm">
					No mistakes logged yet. Take some practice tests to start tracking your mistakes.
				</p>
				<button
					class="bg-primary font-inter hover:bg-primary-hover duration-fast ease-standard inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-canvas-base transition-colors md:text-base"
					onclick={() => console.log('Navigate to mock tests')}
				>
					Start Practice
				</button>
			</div>
		{:else}
			<!-- Stats Cards (Subject Filter) - Always Visible -->
			<div class="grid grid-cols-3 gap-3">
				{#each displayedStats as stat (stat.subject)}
					<StatsCard
						label={stat.subject}
						icon={stat.icon}
						value={stat.count}
						variant={stat.backgroundColor}
						active={stat.active}
						onClick={() => handleFilterBySubject(stat.subject)}
					/>
				{/each}
			</div>

			<!-- Main Content (Two Column on Desktop, Single on Mobile) -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
				<!-- Main Feed (Desktop: 3 columns, Mobile: full width) -->
				<div class="flex flex-col gap-4 lg:col-span-3">
					<SectionHeader title="Your Mistakes" subtitle="Click on an option to see the solution" />

					<!-- Search Bar -->
					<SearchBar
						value={searchQuery}
						onSearch={handleSearch}
						onFilterClick={handleFilterClick}
					/>

					<!-- Loading State (Filter/Search) -->
					{#if isLoading}
						<LoaderUI message="Loading mistakes..." />
					{:else}
						<!-- Error Alert (only when not loading) -->
						{#if hasError}
							<ErrorUI
								message={errorMessage}
								onRetry={retryFetchAll}
								isDismissible={true}
								onDismiss={() => {
									hasError = false;
									errorMessage = '';
								}}
							/>
						{/if}

						<!-- Mistakes List -->
						<div class="flex flex-col gap-4">
							{#each mistakes as mistake (mistake.id)}
								<QuestionCard
									question={mistake}
									onDelete={handleDeleteMistake}
									onAttempt={(data) => console.log('Mistake attempted:', data)}
								/>
							{/each}
						</div>

						<!-- Load More Button -->
						{#if hasMore}
							<Button btnType="primaryLight" onclick={loadMore} disabled={isLoadingMore}>
								{#if isLoadingMore}
									Loading...
								{:else}
									Load More ({mistakes.length} of {totalCount})
								{/if}
							</Button>
						{/if}

						<!-- Results Info -->
						<p class="text-fg-muted font-poppins text-center text-xs md:text-sm">
							Showing {mistakes.length} of {totalCount} mistakes
						</p>
					{/if}
				</div>

				<!-- Right Panel (Desktop Only) -->
				<div class="flex flex-col gap-4 md:gap-6">
					<MistakePracticeCard
						onStartPractice={() => console.log('Starting practice from mistakes...')}
					/>
				</div>
			</div>
		{/if}
	</div>
</div>
