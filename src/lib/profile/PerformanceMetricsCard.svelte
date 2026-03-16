<script>
	import { TrendingUp } from '@lucide/svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';

	/** @type {{ metrics: import('./mock/profile.schema.js').PerformanceMetrics }} */
	let { metrics } = $props();
</script>

<div class="bg-surface-card rounded-md border border-stroke p-4 flex flex-col gap-4">
	<!-- Section label -->
	<div class="flex items-center gap-2">
		<TrendingUp size={16} class="text-primary shrink-0" />
		<span class="text-sm font-semibold text-fg">Performance Metrics</span>
	</div>

	<!-- Best Subject / Weakest Topic -->
	<div class="grid grid-cols-2 gap-3">
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-fg-muted uppercase tracking-wide">Best Subject</span>
			<span class="text-sm font-bold text-fg">{metrics.bestSubject}</span>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-fg-muted uppercase tracking-wide">Weakest Topic</span>
			<span class="text-sm font-bold text-fg">{metrics.weakestTopic}</span>
		</div>
	</div>

	<!-- Daily Goal -->
	<div class="flex flex-col gap-2">
		<ProgressBar
			current={metrics.dailyGoal.current}
			total={metrics.dailyGoal.total}
			target={metrics.dailyGoal.targetPercent}
			size="md"
			ariaLabel="Daily goal progress"
		>
			{#snippet labelLeft()}
				<span class="font-medium text-fg">
					{metrics.dailyGoal.current} / {metrics.dailyGoal.total} Questions
				</span>
			{/snippet}
			{#snippet labelRight()}
				<span class="text-primary font-semibold">{metrics.dailyGoal.targetPercent}% Goal</span>
			{/snippet}
		</ProgressBar>
	</div>
</div>
