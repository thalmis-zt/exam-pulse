<script>
	let {
		options = [],
		selected = $bindable(null),
		label = '',
		class: className = ''
	} = $props();

	const styles = $derived.by(() => {
		const base = 'relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition duration-(--motion-fast) ease-(--ease-standard)';
		return {
			container: `flex flex-col gap-4 ${className}`.trim(),
			label: 'text-xs font-medium text-fg',
			card: (isActive) => `${base} ${isActive ? 'border-primary bg-primary-light/50' : 'border-stroke bg-surface-card hover:border-primary/50'}`,
			checkmark: 'absolute right-3 top-3 flex size-6 items-center justify-center rounded-full bg-primary text-white',
			icon: 'text-primary [&_svg]:size-6'
		};
	});
</script>

<div class={styles.container}>
	{#if label}
		<span class={styles.label}>{label}</span>
	{/if}

	<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
		{#each options as option (option.id)}
			{@const isActive = selected === option.id}
			<button
				type="button"
				onclick={() => (selected = option.id)}
				class={styles.card(isActive)}
				aria-pressed={isActive}
			>
				{#if isActive}
					<span class={styles.checkmark} aria-hidden="true">
						<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
						</svg>
					</span>
				{/if}

				{#if option.icon}
					<span class={styles.icon}>{@render option.icon()}</span>
				{/if}
				<div>
					<p class="font-semibold text-fg">{option.title}</p>
					{#if option.subtitle}
						<p class="mt-0.5 text-sm text-fg-muted">{option.subtitle}</p>
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>
