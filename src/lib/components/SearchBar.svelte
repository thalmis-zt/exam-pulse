<script>
	import { Search } from '@lucide/svelte';

	let {
		placeholder = 'Search...',
		height = '40px',
		width = '100%',
		className = '',
		inputClass = '',
		value = $bindable(''),
		debounceMs = 300,
		onSearch
	} = $props();

	/** @type {ReturnType<typeof setTimeout> | null} */
	let debounceTimer = $state(null);

	function handleInput(e) {
		const v = e.currentTarget?.value ?? '';
		value = v;

		if (onSearch) {
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				onSearch(v);
				debounceTimer = null;
			}, debounceMs);
		}
	}
</script>

<div
	class="
		flex items-center gap-2
		border border-stroke rounded-full
		bg-surface-card px-3 py-2
		shadow-sm
		transition duration-(--motion-fast) ease-(--ease-standard)
		focus-within:border-primary focus-within:ring-1 focus-within:ring-primary
		{className}
	"
	style="width: {width === '1/2' ? '50%' : width}; height: {height};"
>
	<Search class="size-4 shrink-0 text-fg-muted" />

	<input
		type="text"
		{value}
		oninput={handleInput}
		{placeholder}
		class="
			flex-1 min-w-0 text-sm text-fg
			outline-none border-none bg-transparent
			placeholder:text-fg-muted
			focus:outline-none focus:ring-0
			{inputClass}
		"
		aria-label={placeholder}
	/>
</div>
