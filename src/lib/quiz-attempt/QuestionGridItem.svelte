<script>
	import { Bookmark } from '@lucide/svelte';

	let { number, status, isCurrent = false, showBookmark = false, onclick } = $props();

	const statusClasses = {
		current: 'border-stroke bg-canvas text-fg',
		answered: 'border-secondary bg-secondary-light text-secondary',
		marked: 'border-flagged bg-flagged-surface text-flagged',
		wrong: 'border-danger bg-danger-surface text-danger',
		'not-visited': 'border-stroke bg-stroke/30 text-fg-muted'
	};

	const classes = $derived(statusClasses[status] ?? statusClasses['not-visited']);

	const selectionRing = $derived(
		isCurrent
			? status === 'answered'
				? 'ring-2 ring-inset ring-secondary'
				: status === 'wrong'
					? 'ring-2 ring-inset ring-danger'
					: status === 'marked'
						? 'ring-2 ring-inset ring-flagged'
						: 'ring-2 ring-inset ring-primary'
			: ''
	);
</script>

<button
	type="button"
	class="relative flex size-9 shrink-0 items-center justify-center rounded-md border text-sm font-semibold transition duration-motion-fast ease-ease-standard hover:opacity-90 {classes} {selectionRing}"
	aria-label={showBookmark
		? `Question ${number} (${status}), saved for later`
		: `Question ${number} (${status})`}
	aria-current={isCurrent ? 'true' : undefined}
	onclick={onclick}
>
	{#if showBookmark}
		<Bookmark
			size={11}
			strokeWidth={2.5}
			class="pointer-events-none absolute right-0.5 top-0.5 text-flagged"
			aria-hidden="true"
		/>
	{/if}
	<span class="tabular-nums">{number}</span>
</button>
