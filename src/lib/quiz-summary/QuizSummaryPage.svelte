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

	let { testId } = $props();
	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	onMount(async () => {
		try {
			data = await getQuizSummaryData(testId);
		} catch (error) {
			console.error('Failed to load quiz summary:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load quiz summary. Please try again.';
		} finally {
			isLoading = false;
		}
	});
</script>

<div class="bg-canvas min-h-screen transition duration-motion-normal ease-ease-standard">
	<div class="flex flex-col gap-6">
		<SectionHeader title="Quiz Results" subtitle="Review your performance and insights" />

		{#if isLoading}
			<div class="flex flex-col items-center justify-center gap-3 py-12 min-h-[200px]">
				<div
					class="border-stroke border-t-primary h-8 w-8 animate-spin rounded-full border-4"
				></div>
				<p class="text-fg-muted text-sm">Loading quiz summary...</p>
			</div>
		{:else if hasError}
			<div
				class="bg-surface-card border-stroke flex flex-col items-center justify-center gap-3 rounded-lg border p-4 py-12"
			>
				<p class="text-fg font-semibold">Something went wrong</p>
				<p class="text-fg-muted text-center text-sm">{errorMessage}</p>
			</div>
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
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<p class="text-fg-muted">No data available</p>
			</div>
		{/if}
	</div>
</div>
