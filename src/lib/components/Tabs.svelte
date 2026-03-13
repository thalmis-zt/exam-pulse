<script>
	/**
	 * @typedef {Object} TabOption
	 * @property {string} value - Unique value for selection / routing
	 * @property {string} label - Display text
	 *
	 * @typedef {Object} Props
	 * @property {TabOption[]} options - Tab items
	 * @property {string} selected - Currently selected value
	 * @property {(value: string) => void} onSelect - Called when a tab is clicked
	 * @property {'sm'|'md'|'lg'} [size] - Tab padding / text size
	 */

	/** @type {Props} */
	let { options = [], selected, onSelect, size = 'md' } = $props();

	/** @type {number} */
	let focusedIndex = $state(0);

	const selectedIndex = $derived(
		Math.max(0, options.findIndex((o) => o.value === selected))
	);

	$effect(() => {
		focusedIndex = selectedIndex;
	});

	function handleKeydown(e) {
		if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			e.preventDefault();
			const next = Math.max(0, focusedIndex - 1);
			focusedIndex = next;
			onSelect?.(options[next].value);
		} else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			e.preventDefault();
			const next = Math.min(options.length - 1, focusedIndex + 1);
			focusedIndex = next;
			onSelect?.(options[next].value);
		} else if (e.key === 'Home') {
			e.preventDefault();
			focusedIndex = 0;
			onSelect?.(options[0].value);
		} else if (e.key === 'End') {
			e.preventDefault();
			focusedIndex = options.length - 1;
			onSelect?.(options[options.length - 1].value);
		}
	}

	const sizeClasses = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-5 py-2.5 text-base'
	};
</script>

<div
	role="tablist"
	aria-label="Tabs"
	tabindex="0"
	class="inline-flex items-center gap-1 p-1 rounded-lg bg-stroke"
	onkeydown={handleKeydown}
>
	{#each options as option, i}
		<button
			role="tab"
			type="button"
			tabindex={selectedIndex === i ? 0 : -1}
			aria-selected={selected === option.value}
			aria-controls="tabpanel-{option.value}"
			id="tab-{option.value}"
			class="
				rounded-md font-medium whitespace-nowrap
				transition duration-(--motion-fast) ease-(--ease-standard)
				{sizeClasses[size]}
				{selected === option.value
					? 'bg-surface-card text-primary shadow-sm'
					: 'bg-transparent text-fg-muted hover:text-fg'}
			"
			onclick={() => onSelect?.(option.value)}
			onfocus={() => (focusedIndex = i)}
		>
			{option.label}
		</button>
	{/each}
</div>
