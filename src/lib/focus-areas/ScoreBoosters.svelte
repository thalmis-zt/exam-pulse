<script>
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import BoosterCard from '$lib/focus-areas/BoosterCard.svelte';

	let { boosters } = $props();
	let showAll = $state(true);
</script>

<section class="flex flex-col gap-3 md:gap-4">
	<!-- Desktop header with View All button (only if more than 3 boosters) -->
	<div class="hidden md:block">
		<SectionHeader title="Score Boosters" subtitle="Master your strong topics" showAll={boosters.length > 3} onViewAll={() => (showAll = !showAll)} />
	</div>

	<!-- Mobile header (no View All button) -->
	<div class="md:hidden">
		<SectionHeader title="Score Boosters" subtitle="Master your strong topics" />
	</div>

	<!-- Mobile: Horizontal scrollable container (all boosters) -->
	{#if boosters.length > 0}
		<div class="md:hidden">
			<div class="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
				{#each boosters as booster (booster.id)}
					<div class="flex-shrink-0 w-74 snap-center">
						<BoosterCard
							subject={booster.subject}
							accuracy={booster.accuracy}
							timePerQuestion={booster.timePerQuestion}
							correctCount={booster.questionsCorrect}
							lastPracticed={booster.lastPracticed}
							description={booster.description}
							onclick={() => console.log(`Opening practice for ${booster.subject}`)}
						/>
					</div>
				{/each}
			</div>
		</div>

		<!-- Desktop: Grid layout (toggle with View All) -->
		<div class="hidden md:block">
			{#if showAll}
				<div class="grid grid-cols-3 lg:grid-cols-4 gap-2">
					{#each boosters as booster (booster.id)}
						<BoosterCard
							subject={booster.subject}
							accuracy={booster.accuracy}
							timePerQuestion={booster.timePerQuestion}
							correctCount={booster.questionsCorrect}
							lastPracticed={booster.lastPracticed}
							description={booster.description}
							onclick={() => console.log(`Opening practice for ${booster.subject}`)}
						/>
					{/each}
				</div>
			{:else}
				<div class="grid grid-cols-3 lg:grid-cols-4 gap-4">
					{#each boosters.slice(0, 4) as booster (booster.id)}
						<BoosterCard
							subject={booster.subject}
							accuracy={booster.accuracy}
							timePerQuestion={booster.timePerQuestion}
							correctCount={booster.questionsCorrect}
							lastPracticed={booster.lastPracticed}
							description={booster.description}
							onclick={() => console.log(`Opening practice for ${booster.subject}`)}
						/>
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<p class="text-fg-muted text-sm py-4">No boosters available</p>
	{/if}
</section>
