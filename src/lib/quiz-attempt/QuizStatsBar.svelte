<script>
	import { Clock, LayoutGrid } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	let {
		answered = 0,
		unanswered = 0,
		timeSpent = '0:00',
		currentQuestion = 1,
		totalQuestions = 20,
		onOpenGrid
	} = $props();
</script>

<div
	class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-2"
>
	<!-- Left: Question number + desktop stats -->
	<div class="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
		<span class="text-base font-bold text-fg sm:text-lg">
			Question {currentQuestion} / {totalQuestions}
		</span>
		<div class="hidden items-center gap-4 text-sm text-fg-muted sm:flex">
			<span>Answered: {answered}</span>
			<span>Unanswered: {unanswered}</span>
		</div>
	</div>

	<!-- Right: Time spent + grid (own row on mobile so nothing crowds the title area) -->
	<div class="flex min-w-0 items-center justify-between gap-2 sm:justify-end">
		<Badge label="Time Spent: {timeSpent}" variant="default" size="md">
			{#snippet icon()}<Clock size={14} />{/snippet}
		</Badge>
		{#if onOpenGrid}
			<IconButton
				icon={LayoutGrid}
				ariaLabel="Open question navigation"
				variant="ghost-subtle"
				size="md"
				onclick={onOpenGrid}
				class="shrink-0 sm:hidden"
			/>
		{/if}
	</div>
</div>

<!-- Mobile: Stats row -->
<div class="flex items-center justify-between gap-2 text-xs text-fg-muted sm:hidden">
	<span>Answered: {answered}</span>
	<span>Unanswered: {unanswered}</span>
</div>
