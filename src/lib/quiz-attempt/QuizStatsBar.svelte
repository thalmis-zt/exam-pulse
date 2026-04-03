<script>
	import { LayoutGrid } from '@lucide/svelte';
	import TimerBadge from '$lib/components/TimerBadge.svelte';
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

<div class="flex flex-col gap-2 sm:gap-3">
	<!-- One row on all breakpoints: question (+ desktop stats) | time badge | grid (mobile only) -->
	<div class="flex w-full min-w-0 items-center justify-between gap-2">
		<div class="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
			<span
				class="truncate text-sm font-bold leading-tight text-fg sm:text-base lg:text-lg"
			>
				Question {currentQuestion} / {totalQuestions}
			</span>
			<div class="hidden shrink-0 items-center gap-4 text-sm text-fg-muted sm:flex">
				<span>Answered: {answered}</span>
				<span>Unanswered: {unanswered}</span>
			</div>
		</div>

		<div class="flex shrink-0 items-center gap-2">
			<div class="sm:hidden">
				<TimerBadge time={timeSpent} variant="default" size="sm" label="Time Spent" />
			</div>
			<div class="hidden sm:block">
				<TimerBadge time={timeSpent} variant="default" size="md" label="Time Spent" />
			</div>
			{#if onOpenGrid}
				<IconButton
					icon={LayoutGrid}
					ariaLabel="Open question navigation"
					variant="ghost-subtle"
					size="md"
					onclick={onOpenGrid}
					class="sm:hidden"
				/>
			{/if}
		</div>
	</div>

	<!-- Mobile: Answered / Unanswered -->
	<div class="flex items-center justify-between gap-2 text-xs text-fg-muted sm:hidden">
		<span>Answered: {answered}</span>
		<span>Unanswered: {unanswered}</span>
	</div>
</div>
