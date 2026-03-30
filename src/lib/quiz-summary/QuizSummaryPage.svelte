<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getQuizSummaryData } from '$lib/quiz-summary/mock/quiz-summary.service.js';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import QuizResultsBanner from '$lib/quiz-summary/QuizResultsBanner.svelte';
	import PerformanceOverview from '$lib/quiz-summary/PerformanceOverview.svelte';
	import TimeBreakdown from '$lib/quiz-summary/TimeBreakdown.svelte';
	import SubjectDeepDive from '$lib/quiz-summary/SubjectDeepDive.svelte';
	import RecommendedMocksSection from '$lib/quiz-summary/RecommendedMocksSection.svelte';
	import RankProgressBanner from '$lib/quiz-summary/RankProgressBanner.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Error from '$lib/components/Error.svelte';

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
			<div class="flex min-h-[200px] flex-col items-center justify-center py-12">
				<Spinner message="Loading quiz summary..." />
			</div>
		{:else if hasError}
			<div class="w-full px-4 sm:px-6">
				<Error
					title="Something went wrong"
					subtitle={errorMessage}
					showClose={false}
					action={{ text: 'Retry', handler: loadQuizSummary }}
					class="w-full"
				/>
			</div>
		{:else if data}
			<QuizResultsBanner
				quizTitle={data.quizResult.quizTitle}
				message={data.quizResult.message}
				xpEarned={data.quizResult.xpEarned}
				onReview={() => goto(`/tests/${testId}/review`)}
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
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<p class="text-fg-muted">No data available</p>
			</div>
		{/if}
	</div>
</div>
