<script>
	/** @type {{ label: string, status: string, dotClass: string }[]} */
	const ATTEMPT_ITEMS = [
		{ label: 'Current', status: 'current', dotClass: 'bg-primary' },
		{ label: 'Answered', status: 'answered', dotClass: 'bg-secondary' },
		{ label: 'Marked', status: 'marked', dotClass: 'bg-flagged' },
		{ label: 'Not Visited', status: 'not-visited', dotClass: 'bg-stroke' }
	];

	/**
	 * @typedef {{ correct: number, wrong: number, unanswered: number }} ReviewCounts
	 */

	let {
		variant = 'attempt',
		/** When `variant` is `review`, shows Correct / Wrong / Unanswered with counts and matching colors */
		reviewCounts = null
	} = $props();

	const items = $derived(ATTEMPT_ITEMS);

	const rc = $derived(
		reviewCounts ?? { correct: 0, wrong: 0, unanswered: 0 }
	);
</script>

{#if variant === 'review'}
	<div
		class="flex min-w-0 flex-col gap-2.5"
		role="list"
		aria-label="Result summary: correct, wrong, and unanswered counts"
	>
		<div class="flex min-w-0 items-center justify-between gap-2" role="listitem">
			<div class="flex min-w-0 items-center gap-2">
				<span class="h-2.5 w-2.5 shrink-0 rounded-full bg-secondary" aria-hidden="true"></span>
				<span class="truncate text-xs font-medium text-secondary">Correct</span>
			</div>
			<span class="shrink-0 text-sm font-bold tabular-nums text-secondary">{rc.correct}</span>
		</div>
		<div class="flex min-w-0 items-center justify-between gap-2" role="listitem">
			<div class="flex min-w-0 items-center gap-2">
				<span class="h-2.5 w-2.5 shrink-0 rounded-full bg-danger" aria-hidden="true"></span>
				<span class="truncate text-xs font-medium text-danger">Wrong</span>
			</div>
			<span class="shrink-0 text-sm font-bold tabular-nums text-danger">{rc.wrong}</span>
		</div>
		<div class="flex min-w-0 items-center justify-between gap-2" role="listitem">
			<div class="flex min-w-0 items-center gap-2">
				<span class="h-2.5 w-2.5 shrink-0 rounded-full bg-stroke" aria-hidden="true"></span>
				<span class="truncate text-xs font-medium text-fg-muted">Unanswered</span>
			</div>
			<span class="shrink-0 text-sm font-bold tabular-nums text-fg-muted">{rc.unanswered}</span>
		</div>
	</div>
{:else}
	<div class="flex flex-wrap items-center gap-x-4 gap-y-2">
		{#each items as item (item.status)}
			<div class="flex items-center gap-2">
				<span
					class="h-2.5 w-2.5 shrink-0 rounded-full {item.dotClass}"
					aria-hidden="true"
				></span>
				<span class="text-xs font-medium text-fg-muted">{item.label}</span>
			</div>
		{/each}
	</div>
{/if}
