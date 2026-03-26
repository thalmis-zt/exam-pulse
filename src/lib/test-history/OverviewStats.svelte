<script>
	import { BarChart3, Zap, Trophy, TrendingUp } from '@lucide/svelte';
	import StatsCard from '$lib/saved-questions/StatsCard.svelte';

	let { stats = {} } = $props();

	const statsDisplay = $derived([
		{
			label: 'Total Attempts',
			value: stats?.totalAttempts || 'N/A',
			icon: BarChart3
		},
		{
			label: 'Avg. Score',
			value:
				stats?.averageScore !== undefined && stats?.averageScore !== null
					? `${stats.averageScore}%`
					: 'N/A',
			icon: Zap
		},
		{
			label: 'Best Score',
			value: stats?.bestScore || 'N/A',
			icon: Trophy
		},
		{
			label: 'Accuracy',
			value: stats?.accuracy !== undefined && stats?.accuracy !== null ? `${stats.accuracy}%` : 'N/A',
			icon: TrendingUp
		}
	]);
</script>

<!-- Stats Cards Grid -->
<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
	{#each statsDisplay as stat (stat.label)}
		<StatsCard label={stat.label} icon={stat.icon} value={stat.value} variant="info" />
	{/each}
</div>
