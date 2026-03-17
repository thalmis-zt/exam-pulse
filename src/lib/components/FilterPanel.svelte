<script>
	import { Filter as FilterIcon } from '@lucide/svelte';

	let {
		filters = [],
		value = $bindable({}),
		onchange,
		prefix
	} = $props();

	let collapsed = $state(false);

	function getOptionLabel(opt) {
		return opt?.name ?? opt?.title ?? String(opt ?? '');
	}

	function isSelected(key, opt) {
		const selected = value[key];
		if (!selected || !opt) return false;
		return selected?.id === opt?.id || selected === opt;
	}

	function handleSelect(key, opt) {
		const selected = value[key];
		const alreadySelected = selected && (selected?.id === opt?.id || selected === opt);
		const next = { ...value };
		if (alreadySelected) {
			delete next[key];
		} else {
			next[key] = opt;
		}
		value = next;
		onchange?.(next);
	}

	function handleClearAll() {
		value = {};
		onchange?.({});
	}

	const hasAnySelection = $derived(Object.keys(value ?? {}).some((k) => value[k]));

	const styles = $derived.by(() => ({
		container: 'space-y-4',
		topRow: 'flex gap-3 items-center',
		prefixWrapper: 'flex-1 min-w-0',
		toggleButton:
			'text-canvas-base-fixed bg-primary hover:bg-primary-hover shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition duration-(--motion-fast)',
		filterCard: 'border-stroke rounded-xl border bg-surface-card p-5 space-y-5',
		filterLabel: 'text-fg-muted mb-2 text-xs font-semibold uppercase tracking-wide',
		pillsRow: 'flex flex-wrap gap-2',
		pill: (selected) =>
			`rounded-full border px-4 py-2 text-sm font-medium transition duration-(--motion-fast) ${
				selected
					? 'bg-primary text-canvas-base-fixed border-transparent'
					: 'bg-surface-card text-fg border-stroke hover:border-primary/50'
			}`,
		clearSection: 'border-stroke border-t pt-4',
		clearButton: 'text-fg-muted hover:text-fg text-center text-sm transition'
	}));
</script>

<div class={styles.container}>
	<div class={styles.topRow}>
		{#if prefix}
			<div class={styles.prefixWrapper}>{@render prefix()}</div>
		{/if}
		<button
			type="button"
			class={styles.toggleButton}
			onclick={() => (collapsed = !collapsed)}
			aria-expanded={!collapsed}
		>
			<FilterIcon class="size-4" />
			{collapsed ? 'Show Filters' : 'Hide Filters'}
		</button>
	</div>

	{#if !collapsed}
		<div class={styles.filterCard}>
			{#each filters as filter (filter.key)}
				<div>
					<p class={styles.filterLabel}>{filter.label}</p>
					<div class={styles.pillsRow}>
						{#each filter.options ?? [] as opt, i (opt?.id ?? `${filter.key}-${i}`)}
							{@const selected = isSelected(filter.key, opt)}
							<button
								type="button"
								class={styles.pill(selected)}
								onclick={() => handleSelect(filter.key, opt)}
							>
								{getOptionLabel(opt)}
							</button>
						{/each}
					</div>
				</div>
			{/each}

			{#if hasAnySelection}
				<div class={styles.clearSection}>
					<button type="button" class={styles.clearButton} onclick={handleClearAll}>
						Clear all filters
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
