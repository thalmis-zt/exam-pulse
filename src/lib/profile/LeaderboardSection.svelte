<script>
	import LeaderboardItem from './LeaderboardItem.svelte';

	/**
	 * @type {{
	 *   leaderboard: import('./mock/profile.schema.js').LeaderboardEntry[],
	 *   period?: string
	 * }}
	 */
	let { leaderboard, period = 'Weekly' } = $props();
</script>

<div class="bg-surface-card rounded-md border border-stroke p-4 flex flex-col gap-3">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<h3 class="text-sm font-bold text-fg">Leaderboard ({period})</h3>
	</div>

	<!-- Entries -->
	<div class="flex flex-col gap-2">
		{#each leaderboard as entry (entry.rank)}
			<LeaderboardItem {entry} />
		{/each}
	</div>
</div>
