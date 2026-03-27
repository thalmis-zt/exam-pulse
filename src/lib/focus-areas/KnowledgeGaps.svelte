<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import GapCard from '$lib/focus-areas/GapCard.svelte';

	let { gaps } = $props();
</script>

<section class="flex flex-col gap-3 md:gap-4">
	<SectionHeader title="Knowledge Gaps" variant="md"/>

	<!-- 1 column mobile, 1 column tablet, 3 desktop -->
	{#if gaps.length > 0}
		<div class="grid grid-cols-1 gap-3 md:gap-4">
			{#each gaps as gap (gap.id)}
				<GapCard
					subject={gap.subject}
					masteryPercent={gap.masteryPercent}
					accuracy={Math.round((gap.questionsCorrect / gap.questionsAttempted) * 100)}
					avgSpeed={gap.avgSpeed}
					correctAttempts={gap.questionsCorrect}
					totalQuestions={gap.totalQuestions}
					targetMastery={gap.targetMastery}
					weakTopics={gap.weakTopics}
					onclick={() => console.log(`Starting practice for ${gap.subject}`)}
				/>
			{/each}
		</div>
	{:else}
		<p class="text-fg-muted text-sm py-4 px-4 rounded-lg bg-surface-card/50">No knowledge gaps</p>
	{/if}
</section>
