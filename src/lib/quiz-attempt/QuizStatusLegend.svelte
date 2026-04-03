<script>
	import Badge from '$lib/components/Badge.svelte';

	/** @type {{ label: string, status: string, dotClass: string }[]} */
	const ATTEMPT_ITEMS = [
		{ label: 'Current', status: 'current', dotClass: 'bg-primary' },
		{ label: 'Answered', status: 'answered', dotClass: 'bg-secondary' },
		{ label: 'Marked', status: 'marked', dotClass: 'bg-flagged' },
		{ label: 'Not Visited', status: 'not-visited', dotClass: 'bg-stroke' }
	];

	/**
	 * @typedef {{ total?: number, correct: number, wrong: number, unanswered: number }} ReviewCounts
	 * `total` defaults to correct + wrong + unanswered when omitted.
	 */

	let {
		variant = 'attempt',
		/** When `variant` is `review`, shows Total / Correct / Wrong / Unanswered as badges. */
		reviewCounts = null
	} = $props();

	const items = $derived(ATTEMPT_ITEMS);

	const rc = $derived.by(() => {
		const r = reviewCounts ?? { correct: 0, wrong: 0, unanswered: 0 };
		const total =
			typeof r.total === 'number'
				? r.total
				: r.correct + r.wrong + r.unanswered;
		return { correct: r.correct, wrong: r.wrong, unanswered: r.unanswered, total };
	});
</script>

{#if variant === 'review'}
	<div
		class="flex min-w-0 flex-wrap items-center gap-2"
		role="list"
		aria-label="Result summary: total, correct, wrong, and unanswered counts"
	>
		<div role="listitem" class="min-w-0">
			<Badge variant="primary" size="sm" label={`Total ${rc.total}`}>
				{#snippet icon()}
					<span class="h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
				{/snippet}
			</Badge>
		</div>
		<div role="listitem" class="min-w-0">
			<Badge variant="success" size="sm" label={`Correct ${rc.correct}`}>
				{#snippet icon()}
					<span class="h-2 w-2 shrink-0 rounded-full bg-secondary" aria-hidden="true"></span>
				{/snippet}
			</Badge>
		</div>
		<div role="listitem" class="min-w-0">
			<Badge variant="danger" size="sm" label={`Wrong ${rc.wrong}`}>
				{#snippet icon()}
					<span class="h-2 w-2 shrink-0 rounded-full bg-danger" aria-hidden="true"></span>
				{/snippet}
			</Badge>
		</div>
		<div role="listitem" class="min-w-0">
			<Badge variant="default" size="sm" label={`Unanswered ${rc.unanswered}`} hasBorder={true}>
				{#snippet icon()}
					<span class="h-2 w-2 shrink-0 rounded-full bg-stroke" aria-hidden="true"></span>
				{/snippet}
			</Badge>
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
