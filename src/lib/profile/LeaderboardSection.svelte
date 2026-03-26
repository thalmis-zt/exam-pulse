<script>
	import LeaderboardItem from '$lib/profile/LeaderboardItem.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let { leaderboard, period = 'Weekly' } = $props();
</script>

<div class="bg-surface-card flex flex-col gap-3 rounded-md p-4">
	<!-- Header -->

	<SectionHeader title="Leaderboard" subtitle="({period})" variant="sm" />

	<!-- Entries -->
	<div class="flex flex-col gap-2">
		{#each leaderboard as entry (entry.rank)}
			<LeaderboardItem {entry} />
		{/each}
	</div>
</div>
