<script>
	import { History } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {{ stats: import('./mock/profile.schema.js').ProfileStats }} */
	let { stats } = $props();
</script>

<div class="bg-surface-card rounded-xl border border-stroke p-4 grid grid-cols-2 gap-3">
	<!-- Avg Score -->
	<div class="flex flex-col gap-0.5 p-3 rounded-lg bg-canvas">
		<span class="text-2xl font-bold text-fg">{stats.avgScore}%</span>
		<span class="text-xs text-fg-muted uppercase tracking-wide">Avg. Score</span>
	</div>

	<!-- Accuracy -->
	<div class="flex flex-col gap-0.5 p-3 rounded-lg bg-canvas">
		<span class="text-2xl font-bold text-fg">{stats.accuracy}%</span>
		<span class="text-xs text-fg-muted uppercase tracking-wide">Accuracy</span>
	</div>

	<!-- Total Quizzes — spans full width with History button -->
	<div class="col-span-2 flex items-center justify-between p-3 rounded-lg bg-canvas">
		<div class="flex items-center gap-2">
			<span class="text-2xl font-bold text-fg">{stats.totalQuizzes}</span>
			<span class="text-xs text-fg-muted uppercase tracking-wide self-end mb-1">Total Quizzes</span>
		</div>
		<Button btnType="primaryLight" onclick={() => {}}>
			<History size={14} />
			History
		</Button>
	</div>
</div>
