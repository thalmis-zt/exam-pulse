<script>
	import { onMount } from 'svelte';
	import { getQuizSummaryData } from '$lib/quiz-summary/mock/quiz-summary.service.js';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import QuizResultsBanner from '$lib/quiz-summary/QuizResultsBanner.svelte';
	import PerformanceOverview from '$lib/quiz-summary/PerformanceOverview.svelte';
	import TimeBreakdown from '$lib/quiz-summary/TimeBreakdown.svelte';
	import SubjectDeepDive from '$lib/quiz-summary/SubjectDeepDive.svelte';
	import RecommendedMocksSection from '$lib/quiz-summary/RecommendedMocksSection.svelte';
	import RankProgressBanner from '$lib/quiz-summary/RankProgressBanner.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';

	let { testId } = $props();
	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	async function loadQuizSummary() {
		isLoading = true;
		hasError = false;
		errorMessage = '';
		try {
			data = await getQuizSummaryData(testId);
		} catch (error) {
			console.error('Failed to load quiz summary:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load quiz summary. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadQuizSummary();
	});
</script>

<div class="bg-canvas min-h-screen transition duration-motion-normal ease-ease-standard">
	<div class="flex flex-col gap-6">
		<SectionHeader title="Quiz Results" subtitle="Review your performance and insights" />

		{#if isLoading}
			<div class="flex min-h-[200px] flex-col items-center justify-center gap-3 py-12">
				<Spinner message="Loading quiz summary..." />
			</div>
		{:else if hasError}
			<StateDisplay
				title="Failed to load quiz results"
				message={errorMessage}
				buttonLabel="Retry"
				onButtonClick={loadQuizSummary}
				variant="error"
			/>
		{:else if data}
			<QuizResultsBanner
				quizTitle={data.quizResult.quizTitle}
				message={data.quizResult.message}
				xpEarned={data.quizResult.xpEarned}
			/>
			<PerformanceOverview metrics={data.performanceMetrics} />
			<TimeBreakdown metrics={data.timeBreakdownMetrics} />
			<SubjectDeepDive subjects={data.subjectDeepDive} />
			<RecommendedMocksSection mocks={data.recommendedMocks} />
			<!-- Rank progress banner - hidden on mobile -->
			<div class="hidden sm:block">
				<RankProgressBanner />
			</div>
		{:else}
			<StateDisplay
				title="No quiz summary available"
				message="This result could not be found or has no data yet."
				buttonLabel="Retry"
				onButtonClick={loadQuizSummary}
				variant="info"
			/>
		{/if}
	</div>
</div>
