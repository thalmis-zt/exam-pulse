<script>
	let {
		options = [],
		selected = $bindable([]),
		maxSelection,
		singleSelect = false,
		compact = false,
		label = '',
		hint = '',
		class: className = ''
	} = $props();

	function toggle(id) {
		if (singleSelect) {
			const idx = selected.indexOf(id);
			if (idx >= 0) {
				selected = selected.filter((s) => s !== id);
			} else {
				selected = [id];
			}
			return;
		}
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
		const base = compact
			? 'inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition duration-(--motion-fast) ease-(--ease-standard) sm:px-3 sm:py-1.5 sm:text-sm'
			: 'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition duration-(--motion-fast) ease-(--ease-standard)';
		return {
			container: `flex flex-col ${compact ? 'gap-0' : 'gap-4'} ${className}`.trim(),
			label: 'text-xs font-medium text-fg',
			chip: (isActive) => `${base} ${isActive ? 'border-primary bg-primary-light text-primary' : 'border-stroke bg-surface-card text-fg hover:border-primary/50'}`,
			hint: 'text-xs text-fg-muted',
			row: compact
				? 'flex flex-nowrap items-center gap-1.5 sm:gap-2'
				: 'flex flex-wrap gap-3',
			checkIcon: compact ? 'size-3 sm:size-3.5' : 'size-3.5'
		};
	});
</script>

<div class={styles.container}>
	{#if label}
		<span class={styles.label}>{label}</span>
	{/if}

	<div class={styles.row}>
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
					<svg class={styles.checkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
