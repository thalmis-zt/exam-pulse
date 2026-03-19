<script>
	let {
		options = [],
		selected = $bindable([]),
		maxSelection,
		singleSelect = false,
		label = '',
		hint = '',
		variant = 'default',
		class: className = ''
	} = $props();

	function toggle(id) {
		if (singleSelect) {
			selected = [id];
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
		const base = 'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition duration-(--motion-fast) ease-(--ease-standard)';
		const activeStyles = variant === 'filter'
			? 'border-primary bg-primary text-canvas-base-fixed'
			: 'border-primary bg-primary-light text-primary';
		const inactiveStyles = 'border-stroke bg-surface-card text-fg hover:border-primary/50';
		return {
			container: `${label || hint ? 'flex flex-col gap-4' : 'flex flex-wrap items-center gap-2'} ${className}`.trim(),
			label: 'text-sm font-medium text-fg',
			chip: (isActive) => `${base} ${isActive ? activeStyles : inactiveStyles}`,
			hint: 'text-xs text-fg-muted',
			showClearIcon: !singleSelect && variant === 'default'
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
				{#if isActive && styles.showClearIcon}
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
