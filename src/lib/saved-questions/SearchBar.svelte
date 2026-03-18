<script>
	import { Search, Filter } from '@lucide/svelte';

	let { value = '', onSearch, onFilterClick } = $props();

	let debouncedTimeout;

	function handleInput(e) {
		const query = e.target.value;
		value = query;

		// Debounce search by 300ms
		clearTimeout(debouncedTimeout);
		debouncedTimeout = setTimeout(() => {
			if (onSearch) {
				onSearch(query);
			}
		}, 300);
	}
</script>

<div class="flex items-center gap-3 w-full rounded-lg  transition-all duration-fast ease-standard">
	<div class="border border-stroke py-1 rounded-md flex items-center gap-2 flex-1">
	<!-- Search Icon -->
	 <div class="px-2">
	<Search size={14} class="text-fg-muted flex-shrink-0" />
	</div>
	<!-- Search Input -->
	<input
		type="text"
		placeholder="Search by topic or text..."
		{value}
		onInput={handleInput}
		class="flex-1 bg-transparent text-sm text-fg font-poppins outline-none border-none ring-0 focus:ring-0 focus:border-none placeholder:text-fg-muted"
	/>
	</div>

	<!-- Filter Button -->
	<button
		class="flex items-center justify-center p-1.5 text-fg-muted hover:text-fg transition-colors duration-fast ease-standard flex-shrink-0"
		onclick={onFilterClick}
		title="Advanced filters"
	>
		<Filter size={14} />
	</button>
</div>

<style>
	input::placeholder {
		opacity: 1;
	}
</style>
