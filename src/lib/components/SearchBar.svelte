<script>
	import { Search } from '@lucide/svelte';

	let {
		placeholder = 'Search...',
		variant = 'sm',
		className = '',
		inputClass = '',
		value = $bindable(''),
		debounceMs = 300,
		onSearch
	} = $props();

	const containerClasses = {
		sm: 'min-h-9 gap-1 px-2 py-1',
		md: 'min-h-10 gap-1.5 px-2.5 py-1.5',
		lg: 'min-h-12 gap-2 px-3 py-2'
	};
	const iconSizes = { sm: 'size-3', md: 'size-4', lg: 'size-5' };
	const inputSizes = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

	const baseClasses =
		'border border-stroke bg-surface-card rounded-md shadow-sm transition duration-(--motion-fast) ease-(--ease-standard) focus-within:border-primary focus-within:ring-1 focus-within:ring-primary';
	const variantClass = $derived(containerClasses[variant] ?? containerClasses.md);

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
		flex w-full items-center
		{baseClasses} {variantClass}
		{className}
	"
>
	<Search class="{iconSizes[variant] ?? iconSizes.md} shrink-0 text-fg-muted ml-2" />

	<input
		type="text"
		{value}
		oninput={handleInput}
		{placeholder}
		class="
			flex-1 min-w-0 outline-none border-none bg-transparent text-fg
			{inputSizes[variant] ?? inputSizes.md}
			placeholder:text-fg-muted
			focus:outline-none focus:ring-0
			{inputClass}
		"
		aria-label={placeholder}
	/>
</div>
