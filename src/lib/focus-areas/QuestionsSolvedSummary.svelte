<script>
	import { TrendingUp, TrendingDown, ClipboardCheck } from '@lucide/svelte';

	let { solvedCount, totalQuestions, weekPercentage } = $props();

	const completionPercent = $derived(Math.round((solvedCount / totalQuestions) * 100));
	const moodMessage = $derived(
		completionPercent >= 80 ? "You're crushing it!" :
		completionPercent >= 60 ? "You're catching up!" :
		completionPercent >= 40 ? "Great progress!" :
		"Keep going!"
	);
</script>

<section class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-6 bg-surface-card-subtle p-4 md:p-6 rounded-md shadow-sm">
	<!-- Left content -->
	<div class="flex flex-col gap-2">
		<h2 class="text-base font-bold text-fg font-Inter">Questions Solved</h2>
		<p class="text-sm text-fg-muted font-Poppins">Good Work, {moodMessage}</p>
		<div class="flex items-center gap-1 md:gap-2">
			{#if weekPercentage >= 0}
				<TrendingUp size={14} class="text-info" />
			{:else}
				<TrendingDown size={14} class="text-danger" />
			{/if}
			<span class="text-xs font-semibold font-Inter {weekPercentage>=0 ? 'text-info' : 'text-danger'}">{Math.abs(weekPercentage)}% from last week</span>
		</div>
	</div>

	<!-- Right icon badge (desktop only) -->
	<div class="hidden md:flex flex-shrink-0">
		<ClipboardCheck size={80} class="text-info-surface" />
	</div>
</section>
