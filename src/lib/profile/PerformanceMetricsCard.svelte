<script>
	import { TrendingUp, History } from '@lucide/svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import StatTile from '$lib/profile/StatTile.svelte';
	import Button from '$lib/components/Button.svelte';

	/**
	 * @type {{
	 *   stats: import('./mock/profile.schema.js').ProfileStats,
	 *   metrics: import('./mock/profile.schema.js').PerformanceMetrics
	 * }}
	 */
	let { stats, metrics } = $props();
</script>

<div class="bg-surface-card flex flex-col gap-4 rounded-md p-4">
	<!-- Stats row -->
	 <h3 class="text-sm font-bold text-fg mb-2">Preformance Metrics</h3>
	<div class="grid grid-cols-2 gap-3">
		<StatTile value="{stats.avgScore}%" label="Avg. Score" />
		<StatTile value="{stats.accuracy}%" label="Accuracy" />
		<StatTile value={stats.totalQuizzes} label="Total Quizzes" />
		<div class="flex items-end pb-1">
			<Button btnType="primaryLight" onclick={() => {}}>
				<History size={14} />
				History
			</Button>
		</div>
	</div>

	<div class="border-stroke border-t"></div>

	<!-- Best Subject / Weakest Topic -->
	<div class="grid grid-cols-2 gap-3">
		<div class="flex flex-col gap-0.5">
			<span class="text-fg-muted text-xs tracking-wide uppercase">Best Subject</span>
			<span class="text-fg text-sm font-bold">{metrics.bestSubject}</span>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-fg-muted text-xs tracking-wide uppercase">Weakest Topic</span>
			<span class="text-fg text-sm font-bold">{metrics.weakestTopic}</span>
		</div>
	</div>

	<!-- Daily Goal -->
	<ProgressBar
		current={metrics.dailyGoal.current}
		total={metrics.dailyGoal.total}
		target={metrics.dailyGoal.targetPercent}
		size="md"
		ariaLabel="Daily goal progress"
	>
		{#snippet labelLeft()}
			<span class="text-fg font-medium">
				{metrics.dailyGoal.current} / {metrics.dailyGoal.total} Questions
			</span>
		{/snippet}
		{#snippet labelRight()}
			<span class="text-primary font-semibold">{metrics.dailyGoal.targetPercent}% Goal</span>
		{/snippet}
	</ProgressBar>
</div>
