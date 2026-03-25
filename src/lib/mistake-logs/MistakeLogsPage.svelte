<script>
	import { onMount } from 'svelte';
	import {
		fetchMistakeLogs,
		deleteMistake,
		getSubjectStats
	} from '$lib/mistake-logs/mock/mistakeLogs.service.js';

	import { Atom, Beaker, BarChart3, Bookmark } from '@lucide/svelte';

	import StatsCard from '$lib/saved-questions/StatsCard.svelte';
	import QuestionCard from '$lib/saved-questions/QuestionCard.svelte';
	import MistakePracticeCard from '$lib/mistake-logs/MistakePracticeCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Toast from '$lib/components/Toast.svelte';

	// Loading & Error
	let isLoading = $state(true);
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
	let searchQuery = $state('');
	let subjectStats = $state({ physics: 0, chemistry: 0, maths: 0, total: 0 });

	let searchTimeout = $state(null);

	const PAGE_SIZE = 10;
	const SEARCH_DEBOUNCE_MS = 300;

	// Toast state
	let toastMessage = $state('');
	let toastVariant = $state('success');
	let showToast = $state(false);

	const displayedStats = $derived([
		{ subject: 'Physics', icon: Atom, count: subjectStats.physics, backgroundColor: 'info' },
		{
			subject: 'Chemistry',
			icon: Beaker,
			count: subjectStats.chemistry,
			backgroundColor: 'danger'
		},
		{ subject: 'Maths', icon: BarChart3, count: subjectStats.maths, backgroundColor: 'success' }
	]);

	// Track if any filters are applied
	const hasAppliedFilters = $derived(searchQuery.trim() !== '' || selectedSubject !== null);

	// -------------------------------- Lifecycle Hooks ------------------------------------

	onMount(async () => {
		await loadInitialData();
	});

	// -------------------------------- Initial Data Load --------------------------------

	async function loadInitialData() {
		await fetchMistakesPage(1, true);
		// Fetch stats separately
		try {
			subjectStats = await getSubjectStats();
		} catch (error) {
			console.error('Fetch stats error:', error);
		}
	}

	// ------------------------------ Mistakes Fetch API --------------------------------

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

			if (mistakes.length === 0 && totalCount === 0 && hasAppliedFilters) {
				errorMessage = 'No mistakes found matching your criteria.';
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

	// --------------------------------	Filters & Search Handlers --------------------------------
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

	// -------------------------- Pagination --------------------------------

	function loadMore() {
		fetchMistakesPage(currentPage + 1);
	}

	// ----------------------------- Deletion --------------------------------

	async function handleDeleteMistake(mistakeId) {
		try {
			await deleteMistake(mistakeId);

			// Remove from local list
			mistakes = mistakes.filter((m) => m.id !== mistakeId);
			totalCount = Math.max(0, totalCount - 1);

			// Show success toast
			toastMessage = 'Mistake deleted successfully';
			toastVariant = 'success';
			showToast = true;
		} catch (error) {
			console.error('Delete error:', error);
		}
	}


</script>

<!-- Main Container -->
<div class="duration-motion-normal ease-ease-standard transition">
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Mistake Logs" subtitle="Review your mistakes and learn from them" />
		<!-- Stats Cards -->
		<div class="450px:grid-cols-3 grid grid-cols-2 gap-3">
			{#each displayedStats as stat (stat.subject)}
				<StatsCard
					label={stat.subject}
					icon={stat.icon}
					value={stat.count}
					variant={stat.backgroundColor}
				/>
			{/each}
		</div>

		<!-- Main Content (Two Column on Desktop, Single on Mobile) -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
			<!-- Main Feed (Desktop: 3 columns, Mobile: full width) -->
			<div class="flex flex-col gap-4 lg:col-span-3">
				<SectionHeader
					title="Your Mistakes"
					subtitle="Review mistakes and learn from them"
					variant="md"
				/>

				<!-- Search Bar -->
				<SearchBar
					bind:value={searchQuery}
					onSearch={handleSearch}
					placeholder="Search mistakes..."
					variant="md"
				/>

				<!-- Subject Filter Badges -->
				<div class="flex flex-wrap gap-2">
					{#each displayedStats as stat (stat.subject)}
						<Badge
							label={stat.subject}
							size="sm"
							onclick={() => handleFilterBySubject(stat.subject)}
							isActive={selectedSubject === stat.subject}
							hasBorder={true}
						/>
					{/each}
				</div>

				<!-- Loading State -->
				{#if isLoading}
					<div class="flex flex-col items-center justify-center gap-3 py-12">
						<Spinner message="Loading mistakes..." />
					</div>
				{:else if hasError}
					<!-- Error State -->
					<StateDisplay
						title="No Results Found"
						message={errorMessage}
						variant="error"
						buttonLabel="Retry"
						onButtonClick={loadInitialData}
					/>
				{:else}
					<!-- Check for empty results -->
					{#if mistakes.length === 0}
						<StateDisplay
							title="No mistakes logged yet"
							message="Take some practice tests to start tracking your mistakes."
							buttonLabel="Go to Practice"
							onButtonClick={() => console.log('Navigate to practice')}
							icon={Bookmark}
							variant="info"
						/>
					{:else}
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
									Load More Mistakes ({mistakes.length} of {totalCount})
								{/if}
							</Button>
						{/if}

						<!-- Results Info -->
						<p class="text-fg-muted font-poppins text-center text-xs md:text-sm">
							Showing {mistakes.length} of {totalCount} mistakes
						</p>
					{/if}
				{/if}
			</div>

			<!-- Right Panel (Desktop Only) -->
			<div class="flex flex-col gap-4 md:gap-6">
				<MistakePracticeCard
					onStartPractice={() => console.log('Starting practice from mistakes...')}
				/>
			</div>
		</div>
	</div>
</div>

<!-- Success Toast -->
{#if showToast}
	<div class="fixed right-4 bottom-4 z-50">
		<Toast
			variant={toastVariant}
			title="Success"
			message={toastMessage}
			onclose={() => (showToast = false)}
		/>
	</div>
{/if}
