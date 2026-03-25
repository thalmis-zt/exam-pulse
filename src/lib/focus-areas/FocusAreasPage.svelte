<script>
	import { onMount } from 'svelte';
	import { getFocusAreasData } from '$lib/focus-areas/mock/focusAreas.service.js';
	import QuestionsSolvedSummary from '$lib/focus-areas/QuestionsSolvedSummary.svelte';
	import ScoreBoosters from '$lib/focus-areas/ScoreBoosters.svelte';
	import KnowledgeGaps from '$lib/focus-areas/KnowledgeGaps.svelte';
	import MistakeLog from '$lib/focus-areas/MistakeLog.svelte';
	import LearningTip from '$lib/focus-areas/LearningTip.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let data = $state(null);

	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	const loadFocusAreas = async () => {
		isLoading = true;
		hasError = false;
		errorMessage = '';
		try {
			data = await getFocusAreasData();
			isLoading = false;
		} catch (error) {
			console.error('Failed to load focus areas:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load focus areas. Please try again.';
			isLoading = false;
		}
	};

	onMount(loadFocusAreas);
</script>

<!-- Page shell with bottom-nav clearance -->
<div>
	<div class="flex flex-col gap-6">
		<!-- Header -->
		<SectionHeader title="Focus Areas" subtitle="Personalized insights to boost your exam prep" />

		{#if isLoading}
			<!-- Loading state / Replace when universal loader is available -->
			<div class="flex flex-col items-center justify-center gap-3 py-12">
				<Spinner message="Loading focus areas..." />
			</div>
		{:else if hasError}
			<!-- Error state using StateDisplay -->
			<StateDisplay
				title="Failed to load focus areas data"
				message={errorMessage}
				buttonLabel="Retry"
				onButtonClick={loadFocusAreas}
				variant="error"
			/>
		{:else if data}

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
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<!-- Left column: Knowledge Gaps (takes 2/3 width) -->
				<div class="md:col-span-2">
					{#if data.knowledgeGaps && data.knowledgeGaps.length > 0}
						<KnowledgeGaps gaps={data.knowledgeGaps} />
					{/if}
				</div>

				<!-- Right column: Mistake Log and Learning Tips (takes 1/3 width, stacked) -->
				<div class="flex flex-col gap-6 md:mt-10">
					<!-- Mistake Log -->
					<MistakeLog onclick={() => console.log('Navigate to mistake log')} />

					<!-- Learning Tip -->
					 <!-- {#if data.learningTips && data.learningTips.length > 0} -->
					<LearningTip tips={data.learningTips} />
					<!-- {/if} -->
				</div>
			</div>
		{:else}
			<!-- Empty state -->
			<StateDisplay
				title="No data available"
				message="There's no focus area data to display right now."
				variant="info"
			/>
		{/if}
	</div>
</div>
