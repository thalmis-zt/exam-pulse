<script>
	import { History } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import StatTile from '$lib/profile/StatTile.svelte';

	/** @type {{ stats: import('./mock/profile.schema.js').ProfileStats }} */
	let { stats } = $props();
</script>

<div class="bg-surface-card rounded-md border border-stroke p-4 grid grid-cols-2 gap-3">
	<StatTile value="{stats.avgScore}%" label="Avg. Score" />
	<StatTile value="{stats.accuracy}%" label="Accuracy" />

    <StatTile value={stats.totalQuizzes} label="Total Quizzes" />
    <Button btnType="primaryLight" onclick={() => {}}>
        <History size={14} />
        History
    </Button>
	<!-- Total Quizzes — spans full width with History button -->
	<!-- <div class="col-span-2 flex items-center justify-between p-3 rounded-lg bg-canvas">
	</div> -->
</div>
