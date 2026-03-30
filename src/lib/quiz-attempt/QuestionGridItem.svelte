<script>
	

	let { number, status, isCurrent = false, onclick } = $props();

	const statusClasses = {
		current: 'border-primary bg-primary text-canvas-base-fixed',
		answered: 'border-secondary bg-secondary text-fg',
		marked: 'border-flagged bg-flagged text-fg',
		/** Incorrect answer (e.g. exam review) */
		wrong: 'border-danger bg-danger text-canvas-base-fixed',
		'not-visited': 'border-stroke bg-stroke/30 text-fg-muted'
	};

	const classes = $derived(statusClasses[status] ?? statusClasses['not-visited']);
</script>

<button
	type="button"
	class="flex size-9 shrink-0 items-center justify-center rounded-md border text-sm font-semibold transition duration-motion-fast ease-ease-standard hover:opacity-90 {classes}"
	aria-label="Question {number} ({status})"
	aria-current={isCurrent ? 'true' : undefined}
	onclick={onclick}
>
	{number}
</button>
