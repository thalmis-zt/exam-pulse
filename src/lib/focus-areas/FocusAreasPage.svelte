<script>
	import { onMount } from 'svelte';
	import { getFocusAreasData } from '$lib/focus-areas/mock/focusAreas.service.js';
	import QuestionsSolvedSummary from '$lib/focus-areas/QuestionsSolvedSummary.svelte';
	import ScoreBoosters from '$lib/focus-areas/ScoreBoosters.svelte';
	import KnowledgeGaps from '$lib/focus-areas/KnowledgeGaps.svelte';
	import MistakeLog from '$lib/focus-areas/MistakeLog.svelte';
	import LearningTip from '$lib/focus-areas/LearningTip.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let data = $state(null);

	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	onMount(async () => {
		try {
			data = await getFocusAreasData();
			isLoading = false;
		} catch (error) {
			console.error('Failed to load focus areas:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load focus areas. Please try again.';
			isLoading = false;
		}
	});
</script>

<!-- Page shell with bottom-nav clearance -->
<div class="bg-canvas min-h-screen transition duration-motion-normal ease-ease-standard">
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Focus Areas" subtitle="Personalized insights to boost your exam prep" />

		{#if isLoading}
			<!-- Loading state / Replace when universal laoder is available -->
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<div class="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
				<p class="text-fg-muted text-sm">Loading focus areas...</p>
			</div>
		{:else if hasError}
			<!-- Error state / replace when universal error component is available -->
			<div
				class="flex flex-col items-center justify-center gap-3 py-12 p-4 rounded-lg bg-surface-card border border-border"
			>
				<p class="text-fg font-semibold">Something went wrong</p>
				<p class="text-fg-muted text-sm text-center">{errorMessage}</p>
			</div>
		{:else if data}
			<!-- Content sections -->
			
			<!-- Questions Solved Summary -->
			<QuestionsSolvedSummary
				solvedCount={data.summary.totalSolved}
				totalQuestions={data.summary.totalQuestions}
				weekPercentage={data.summary.weekPercentage}
			/>

			<!-- Score Boosters -->
			{#if data.scoreBoosters && data.scoreBoosters.length > 0}
				<ScoreBoosters boosters={data.scoreBoosters} />
			{/if}

			<!-- Two-column layout (desktop) - Knowledge Gaps, Mistake Log, Learning Tips -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<!-- Left column: Knowledge Gaps (takes 2/3 width) -->
				<div class="lg:col-span-2">
					{#if data.knowledgeGaps && data.knowledgeGaps.length > 0}
						<KnowledgeGaps gaps={data.knowledgeGaps} />
					{/if}
				</div>

				<!-- Right column: Mistake Log and Learning Tips (takes 1/3 width, stacked) -->
				<div class="flex flex-col gap-6 lg:mt-10">
					<!-- Mistake Log -->
					<MistakeLog onclick={() => console.log('Navigate to mistake log')} />

					<!-- Learning Tip -->
					<LearningTip tips={data.learningTips} />
				</div>
			</div>
		{:else}
			<!-- Empty state -->
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<p class="text-fg-muted">No data available</p>
			</div>
		{/if}
	</div>
</div>
