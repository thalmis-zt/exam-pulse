<script>
	let {
		options = [],
		value = $bindable(),
		label = '',
		suffix = '',
		class: className = ''
	} = $props();

	const id = `segmented-${crypto.randomUUID()}`;

	function select(opt) {
		value = opt.value;
	}

	function getDisplayLabel(opt) {
		return suffix ? `${opt.label} ${suffix}` : opt.label;
	}

	const styles = $derived.by(() => {
		const base = 'rounded-full px-4 py-2 text-sm font-medium transition duration-(--motion-fast) ease-(--ease-standard)';
		return {
			container: `flex flex-col gap-3 ${className}`.trim(),
			label: 'text-sm font-medium text-fg',
			button: (isActive) => `${base} ${isActive ? 'bg-primary text-white' : 'bg-stroke/80 text-fg-muted hover:bg-stroke hover:text-fg'}`,
			suffix: 'text-xs text-fg-muted'
		};
	});
</script>

<div class={styles.container} role="group" aria-labelledby={label ? `${id}-label` : undefined}>
	{#if label}
		<span class={styles.label} id="{id}-label">{label}</span>
	{/if}

	<div class="flex flex-wrap gap-3">
		{#each options as option (option.value)}
			{@const isActive = value === option.value}
			<button
				type="button"
				onclick={() => select(option)}
				class={styles.button(isActive)}
				aria-pressed={isActive}
			>
				{option.label}
			</button>
		{/each}
	</div>

	{#if suffix && value !== undefined && value !== null}
		<p class={styles.suffix}>
			{getDisplayLabel(options.find((o) => o.value === value) ?? { label: String(value) })}
		</p>
	{/if}
</div>
