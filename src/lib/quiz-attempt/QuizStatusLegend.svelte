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

	const rc = $derived(reviewCounts ?? { correct: 0, wrong: 0, unanswered: 0 });
</script>

{#if variant === 'review'}
	<div
		class="grid min-w-0 grid-cols-3 gap-1 mb-2"
		role="list"
		aria-label="Result summary: correct, wrong, and unanswered counts"
	>
		<div
			class="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-stroke/70 border-t-[3px] border-t-secondary bg-secondary-light/50 px-1 py-1.5"
			role="listitem"
		>
			<span class="text-sm font-bold tabular-nums leading-none text-secondary sm:text-base">{rc.correct}</span>
			<span class="text-center text-2xs font-semibold leading-tight text-secondary">Correct</span>
		</div>
		<div
			class="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-stroke/70 border-t-[3px] border-t-danger bg-danger-surface/60 px-1 py-1.5"
			role="listitem"
		>
			<span class="text-sm font-bold tabular-nums leading-none text-danger sm:text-base">{rc.wrong}</span>
			<span class="text-center text-2xs font-semibold leading-tight text-danger">Wrong</span>
		</div>
		<div
			class="flex min-w-0 flex-col items-center justify-center gap-0.5 rounded-lg border border-stroke/70 border-t-[3px] border-t-stroke bg-stroke/15 px-1 py-1.5"
			role="listitem"
		>
			<span class="text-sm font-bold tabular-nums leading-none text-fg-muted sm:text-base">{rc.unanswered}</span>
			<span class="text-center text-2xs font-semibold leading-tight text-fg-muted">Unanswered</span>
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
