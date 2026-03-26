<script>
	import Button from '$lib/components/Button.svelte';

	let {
		filters = [],
		value = $bindable({}),
		onApply,
		onClear,
		loading = false,
		prefix
	} = $props();

	function getOptionLabel(opt) {
		return opt?.label ?? opt?.name ?? opt?.title ?? String(opt ?? '');
	}

	function optionMatches(selected, opt) {
		if (!selected || !opt) return false;
		if (selected === opt) return true;
		if (selected?.id != null && opt?.id != null && selected.id === opt.id) return true;
		if (selected?.value != null && opt?.value != null && selected.value === opt.value) return true;
		return false;
	}

	function isSelected(key, opt) {
		return optionMatches(value[key], opt);
	}

	function handleSelect(key, opt) {
		const selected = value[key];
		const alreadySelected = optionMatches(selected, opt);
		const next = { ...value };
		if (alreadySelected) {
			delete next[key];
		} else {
			next[key] = opt;
		}
		value = next;
	}

	function handleClearAll() {
		value = {};
		onClear?.();
	}

	function handleApply() {
		onApply?.(value);
	}

	const styles = $derived.by(() => ({
		container: 'space-y-4',
		prefixWrapper: 'min-w-0',
		filterCard: 'border-stroke rounded-xl border bg-surface-card p-5 space-y-5',
		filterLabel: 'text-fg-muted mb-2 text-xs font-semibold uppercase tracking-wide',
		pillsRow: 'flex flex-wrap gap-2',
		pill: (selected) =>
			`rounded-full border px-4 py-2 text-sm font-medium transition duration-(--motion-fast) ${
				selected
					? 'bg-primary text-canvas-base-fixed border-transparent'
					: 'bg-surface-card text-fg border-stroke hover:border-primary/50'
			}`,
		actionsRow: 'border-stroke flex flex-wrap items-center justify-between gap-2 border-t pt-4'
	}));
</script>

<div class={styles.container}>
	{#if prefix}
		<div class={styles.prefixWrapper}>{@render prefix()}</div>
	{/if}

	<div class={styles.filterCard}>
		{#each filters as filter (filter.key)}
			<div>
				<p class={styles.filterLabel}>{filter.label}</p>
				<div class={styles.pillsRow}>
					{#each filter.options ?? [] as opt, i (opt?.id ?? opt?.value ?? `${filter.key}-${i}`)}
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

		<div class={styles.actionsRow}>
			<Button btnType="neutral" type="button" onclick={handleClearAll}>Clear All</Button>
			<Button btnType="primary" type="button" disabled={loading} onclick={handleApply}>
				{#if loading}
					<span
						class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent"
					></span>
				{/if}
				Apply Filters
			</Button>
		</div>
	</div>
</div>
