<script>

	const items = [
		{ label: 'Current', status: 'current', dotClass: 'bg-primary' },
		{ label: 'Answered', status: 'answered', dotClass: 'bg-secondary' },
		{ label: 'Marked', status: 'marked', dotClass: 'bg-flagged' },
		{ label: 'Not Visited', status: 'not-visited', dotClass: 'bg-stroke' }
	];
</script>

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
