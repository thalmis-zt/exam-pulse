<script>
	import { onMount } from 'svelte';
	import {
		getSavedQuestions,
		deleteSavedQuestion,
		getSubjectStats
	} from '$lib/saved-questions/mock/saved-questions.service.js';

	import { Atom, Beaker, BarChart3, Bookmark } from '@lucide/svelte';

	import StatsCard from '$lib/saved-questions/StatsCard.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import QuestionCard from '$lib/saved-questions/QuestionCard.svelte';
	import QuickPracticeCard from '$lib/saved-questions/QuickPracticeCard.svelte';
	import StudyRecommendationCard from '$lib/saved-questions/StudyRecommendationCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Badge from '$lib/components/Badge.svelte';

	// Loading & Error
	let isLoading = $state(true);
	let isLoadingMore = $state(false);
	let hasError = $state(false);
	let errorMessage = $state('');

	// Questions & Pagination
	let questions = $state([]);
	let totalCount = $state(0);
	let currentPage = $state(1);
	let hasMore = $state(false);

	// Filters & Search
	let selectedSubject = $state(null);
	let searchQuery = $state('');
	let subjectStats = $state({ physics: 0, chemistry: 0, maths: 0, total: 0 });

	// Delete state
	let deleteErrors = $state({});

	let searchTimeout = $state(null);

	// Toast state
	let toastMessage = $state('');
	let toastVariant = $state('success');
	let showToast = $state(false);

	const PAGE_SIZE = 10;
	const SEARCH_DEBOUNCE_MS = 300;

	// Computed values - use $derived to reactively track subjectStats changes
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

	// ------------------------ Lifecycle Hooks------------------------------------

	onMount(async () => {
		await loadInitialData();
	});

	// ----------------------------------- Initial Data Load ----------------------------------

	async function loadInitialData() {
		await fetchQuestionsPage(1, true);
		// Fetch stats separately
		try {
			subjectStats = await getSubjectStats();
		} catch (error) {
			console.error('Fetch stats error:', error);
		}
	}

	// --------------------------------- Questions Fetch API ------------------------

	async function fetchQuestionsPage(page = 1, resetPagination = false) {
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
			const response = await getSavedQuestions(page, PAGE_SIZE, filters);

			if (page === 1) {
				// First page - replace data
				questions = response.questions;
			} else {
				// Load more - append data
				questions = [...questions, ...response.questions];
			}

			currentPage = response.page || page;
			totalCount = response.totalCount;
			hasMore = response.hasMore;
			hasError = false;
			errorMessage = '';

			// Handle empty results
			if (questions.length === 0 && totalCount === 0) {
				errorMessage = 'No questions found matching your criteria.';
				hasError = true;
			}
		} catch (error) {
			console.error('Fetch questions error:', error);
			errorMessage = error.message || 'Failed to load questions. Please try again.';
			hasError = true;

			if (page === 1) {
				questions = [];
				currentPage = 1;
				totalCount = 0;
				hasMore = false;
			}
		} finally {
			isLoading = false;
			isLoadingMore = false;
		}
	}

	// ------------------------------- Search and Filter ---------------------
	function handleSearch(query) {
		searchQuery = query;

		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		searchTimeout = setTimeout(() => {
			fetchQuestionsPage(1, true); // Reset to page 1 on new search
		}, SEARCH_DEBOUNCE_MS);
	}

	function handleFilterBySubject(subject) {
		// Toggle subject filter
		if (selectedSubject === subject) {
			selectedSubject = null;
		} else {
			selectedSubject = subject;
		}

		fetchQuestionsPage(1, true);
	}

	// -------------------------- Pagination --------------------------------
	function loadMore() {
		fetchQuestionsPage(currentPage + 1);
	}

	// ------------------------------- Delete Question ---------------------
	async function handleDeleteQuestion(questionId) {
		try {
			await deleteSavedQuestion(questionId);

			// Remove from local list
			questions = questions.filter((q) => q.id !== questionId);
			totalCount = Math.max(0, totalCount - 1);

			// Show success toast
			toastMessage = 'Question deleted successfully';
			toastVariant = 'success';
			showToast = true;
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
</script>

<!-- Main Container -->
<div class="duration-motion-normal ease-ease-standard transition">
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Saved Questions" subtitle="Review and practice your saved questions" />
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
					title="Questions"
					subtitle="Practice the saved questions for better results"
					variant="md"
				/>

				<!-- Search Bar -->
				<SearchBar
					bind:value={searchQuery}
					onSearch={handleSearch}
					placeholder="Search questions..."
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
						<Spinner message="Loading questions..." />
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
				{:else if totalCount === 0 && !hasError}
					<!-- Empty State -->
					<StateDisplay
						title="No saved questions yet"
						message="Start saving questions during practice to review them later."
						buttonLabel="Go to Practice"
						onButtonClick={() => console.log('Navigate to practice')}
						icon={Bookmark}
						variant="info"
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
						<Button btnType="primaryLight" onclick={loadMore} disabled={isLoadingMore}>
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
