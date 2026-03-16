<script>
	import { onMount } from 'svelte';
	import {
		getSavedQuestions,
		deleteSavedQuestion,
		getSubjectStats
	} from '$lib/saved-questions/mock/saved-questions.service.js';

	import { Atom, Beaker, BarChart3 } from '@lucide/svelte';

	import StatsCard from '$lib/saved-questions/StatsCard.svelte';
	import SearchBar from '$lib/saved-questions/SearchBar.svelte';
	import QuestionCard from '$lib/saved-questions/QuestionCard.svelte';
	import QuickPracticeCard from '$lib/saved-questions/QuickPracticeCard.svelte';
	import StudyRecommendationCard from '$lib/saved-questions/StudyRecommendationCard.svelte';
	import LoaderUI from '$lib/saved-questions/LoaderUI.svelte';
	import ErrorUI from '$lib/saved-questions/ErrorUI.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Button from '$lib/components/Button.svelte';

	// ===== STATE =====

	// Loading & Error
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	// Questions & Pagination
	let questions = $state([]);
	let totalCount = $state(0);
	let currentPage = $state(1);
	let hasMore = $state(false);
	let isLoadingMore = $state(false);

	// Filters & Search
	let selectedSubject = $state(null);
	let searchQuery = $state('');
	let subjectStats = $state({ physics: 0, chemistry: 0, maths: 0, total: 0 });

	// Delete state
	let deleteErrors = $state({});

	const PAGE_SIZE = 10;

	// ===== LIFECYCLE =====

	onMount(async () => {
		await loadInitialData();
	});

	// ===== FUNCTIONS =====

	async function loadInitialData() {
		isLoading = true;
		hasError = false;
		errorMessage = '';
		currentPage = 1;

		try {
			// Fetch stats
			subjectStats = await getSubjectStats();

			// Fetch first page of questions
			const response = await getSavedQuestions(1, PAGE_SIZE);
			questions = response.questions;
			totalCount = response.totalCount;
			hasMore = response.hasMore;
		} catch (error) {
			console.error('Load error:', error);
			hasError = true;
			errorMessage = error.message || 'Failed to load saved questions. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	async function loadMoreQuestions() {
		isLoadingMore = true;
		try {
			const nextPage = currentPage + 1;
			const response = await getSavedQuestions(nextPage, PAGE_SIZE, {
				subject: selectedSubject
			});

			questions = [...questions, ...response.questions];
			currentPage = nextPage;
			totalCount = response.totalCount;
			hasMore = response.hasMore;
		} catch (error) {
			console.error('Load more error:', error);
			errorMessage = error.message || 'Failed to load more questions.';
		} finally {
			isLoadingMore = false;
		}
	}

	async function handleSearch(query) {
		searchQuery = query;
		currentPage = 1;
		hasError = false;
		errorMessage = '';

		try {
			const response = await getSavedQuestions(1, PAGE_SIZE, {
				subject: selectedSubject,
				query: query.trim() || undefined
			});
			questions = response.questions;
			totalCount = response.totalCount;
			hasMore = response.hasMore;
		} catch (error) {
			console.error('Search error:', error);
			hasError = true;
			errorMessage = error.message || 'Search failed.';
			questions = [];
		}
	}

	function handleFilterBySubject(subject) {
		// Toggle subject filter
		if (selectedSubject === subject) {
			selectedSubject = null;
		} else {
			selectedSubject = subject;
		}

		// Reset search and pagination
		searchQuery = '';
		currentPage = 1;
		hasError = false;
		errorMessage = '';

		// Reload questions
		loadInitialData();
	}

	async function handleDeleteQuestion(questionId) {
		try {
			await deleteSavedQuestion(questionId);

			// Remove from local list
			questions = questions.filter((q) => q.id !== questionId);
			totalCount = Math.max(0, totalCount - 1);
		} catch (error) {
			console.error('Delete error:', error);
			// Store error for modal display (to be handled by deletion confirmation modal)
			deleteErrors[questionId] = error.message || 'Failed to delete question. Please try again.';
			deleteErrors = deleteErrors; // Trigger reactivity
		}
	}

	function handleStartPractice() {
		console.log('Starting practice session...');
		// TODO: Navigate to practice page
	}

	function handleExploreContent() {
		console.log('Exploring content recommendations...');
		// TODO: Navigate to content exploration
	}

	function handleFilterClick() {
		console.log('Opening advanced filters...');
		// TODO: Show advanced filters modal
	}

	// Computed values - use $derived to reactively track subjectStats changes
	const displayedStats = $derived([
		{ subject: 'Physics', icon: Atom, count: subjectStats.physics, backgroundColor: 'blue' },
		{ subject: 'Chemistry', icon: Beaker, count: subjectStats.chemistry, backgroundColor: 'red' },
		{ subject: 'Maths', icon: BarChart3, count: subjectStats.maths, backgroundColor: 'green' }
	]);
</script>

<!-- Main Container -->
<div class="duration-motion-normal ease-ease-standard transition">
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Saved Questions" subtitle="Review and practice your saved questions" />
		<!-- Stats Cards -->
		<div class="grid grid-cols-3 gap-3">
			{#each displayedStats as stat (stat.subject)}
				<StatsCard
					subject={stat.subject}
					icon={stat.icon}
					count={stat.count}
					backgroundColor={stat.backgroundColor}
					isActive={selectedSubject === stat.subject}
					onclick={() => handleFilterBySubject(stat.subject)}
				/>
			{/each}
		</div>
		<!-- Loading State -->
		{#if isLoading}
			<LoaderUI message="Loading your saved questions..." />
		{:else if hasError && questions.length === 0}
			<!-- Error State (No Recovery) -->
			<div class="flex flex-col gap-4">
				<ErrorUI message={errorMessage} onRetry={loadInitialData} isDismissible={false} />
			</div>
		{:else if totalCount === 0}
			<!-- Empty State -->
			<div class="flex flex-col items-center justify-center gap-4 py-16">
				<div class="bg-info/10 flex h-16 w-16 items-center justify-center rounded-full">
					<svg class="text-info h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</div>
				<h3 class="text-fg font-inter text-base font-bold">No saved questions yet</h3>
				<p class="text-fg-muted font-poppins max-w-sm text-center text-sm ">
					Start saving questions during practice to review them later.
				</p>
				<button
					class="bg-primary font-inter hover:bg-primary-hover duration-fast ease-standard inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors md:text-base"
					onclick={() => console.log('Navigate to practice')}
				>
					Go to Practice
				</button>
			</div>
		{:else}
			<!-- Main Content (Two Column on Desktop, Single on Mobile) -->
			<div class="grid grid-cols-1 gap-6 lg:grid-cols-4">
				<!-- Main Feed (Desktop: 3 columns, Mobile: full width) -->
				<div class="flex flex-col gap-4 lg:col-span-3">
				<SectionHeader title="Questions" subtitle="Practice the saved questions for better results" />
					<!-- Search Bar -->
					<SearchBar
						value={searchQuery}
						onSearch={handleSearch}
						onFilterClick={handleFilterClick}
					/>

					<!-- Questions List or Error State -->
					{#if hasError && questions.length === 0}
						<!-- Search/Filter Error State -->
						<ErrorUI
							message={errorMessage}
							onRetry={loadInitialData}
							isDismissible={true}
							onDismiss={() => {
								hasError = false;
								errorMessage = '';
							}}
						/>
					{:else}
						<!-- Questions List -->
						<div class="flex flex-col gap-4">
							{#each questions as question (question.id)}
								<QuestionCard
									{question}
									onDelete={handleDeleteQuestion}
									onAttempt={(data) => console.log('Question attempted:', data)}
								/>
							{/each}
						</div>

						<!-- Load More Button -->
						{#if hasMore}
							<Button
								btnType="primaryLight"
								onclick={loadMoreQuestions}
								disabled={isLoadingMore}
							>
								{#if isLoadingMore}
									Loading...
								{:else}
									Load More Questions ({questions.length} of {totalCount})
								{/if}
							</Button>
						{/if}

						<!-- Results Info -->
						<p class="text-fg-muted font-poppins text-center text-xs md:text-sm">
							Showing {questions.length} of {totalCount} questions
						</p>
					{/if}
				</div>

				<!-- Right Panel (Desktop Only) -->
				<div class="flex flex-col gap-4 md:gap-6">
					<QuickPracticeCard onStartPractice={handleStartPractice} />
					<StudyRecommendationCard onExplore={handleExploreContent} />
				</div>
			</div>
		{/if}
	</div>
</div>
