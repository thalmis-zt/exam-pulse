<script>
	let {
		options = [],
		selected = $bindable([]),
		maxSelection,
		label = '',
		hint = '',
		class: className = ''
	} = $props();

	function toggle(id) {
		const idx = selected.indexOf(id);
		if (idx >= 0) {
			selected = selected.filter((s) => s !== id);
		} else if (!maxSelection || selected.length < maxSelection) {
			selected = [...selected, id];
		}
	}

	function isSelected(id) {
		return selected.includes(id);
	}

	const styles = $derived.by(() => {
		const base = 'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition duration-(--motion-fast) ease-(--ease-standard)';
		return {
			container: `flex flex-col gap-4 ${className}`.trim(),
			label: 'text-sm font-medium text-fg',
			chip: (isActive) => `${base} ${isActive ? 'border-primary bg-primary-light text-primary' : 'border-stroke bg-surface-card text-fg hover:border-primary/50'}`,
			hint: 'text-xs text-fg-muted'
		};
	});
</script>

<div class={styles.container}>
	{#if label}
		<span class={styles.label}>{label}</span>
	{/if}

	<div class="flex flex-wrap gap-3">
		{#each options as option (option.id)}
			{@const isActive = isSelected(option.id)}
			<button
				type="button"
				onclick={() => toggle(option.id)}
				class={styles.chip(isActive)}
				aria-pressed={isActive}
			>
				{option.label}
				{#if isActive}
					<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{/if}
			</button>
		{/each}
	</div>

	{#if hint}
		<p class={styles.hint}>{hint}</p>
	{/if}
</div>
