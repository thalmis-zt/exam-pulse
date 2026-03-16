<script>
	import { Filter as FilterIcon, X } from '@lucide/svelte';
	import Searchable from '$lib/components/Searchable.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';

	let {
		filters = [],
		value = $bindable({}),
		dependencies = {},
		loading = false,
		onApply
	} = $props();

	let isExpanded = $state(false);
	let filterRef = $state(null);
	let tempFilters = $state({});

	function getOptionLabel(option) {
		return option?.name ?? option?.title ?? String(option ?? '');
	}

	function shouldShowFilter(filterKey) {
		const parent = dependencies[filterKey];
		if (!parent) return true;
		return !!tempFilters[parent];
	}

	function findAllDependentFilters(parentKey) {
		const result = [];
		for (const [dependent, parent] of Object.entries(dependencies)) {
			if (parent === parentKey) {
				result.push(dependent);
				result.push(...findAllDependentFilters(dependent));
			}
		}
		return result;
	}

	function clearDependentFilters(category) {
		const dependents = findAllDependentFilters(category);
		for (const dep of dependents) {
			delete tempFilters[dep];
		}
		tempFilters = { ...tempFilters };
	}

	function handleFilterSelect(key, detail) {
		const option = detail?.selectedOption;
		if (tempFilters[key] && option && tempFilters[key]?.id === option?.id) {
			delete tempFilters[key];
			clearDependentFilters(key);
		} else {
			if (tempFilters[key]) clearDependentFilters(key);
			tempFilters[key] = option ?? null;
			if (!option) delete tempFilters[key];
		}
		tempFilters = { ...tempFilters };
	}

	function handleFilterClear(key) {
		delete tempFilters[key];
		clearDependentFilters(key);
		tempFilters = { ...tempFilters };
	}

	function handleClearChip(e, key) {
		e?.stopPropagation?.();
		handleFilterClear(key);
	}

	function handleClearAll() {
		tempFilters = {};
	}

	function handleApply() {
		value = { ...tempFilters };
		isExpanded = false;
		onApply?.(value);
	}

	function toggleExpand() {
		isExpanded = !isExpanded;
		if (isExpanded) {
			tempFilters = { ...value };
		}
	}

	function handleClickOutside(event) {
		// Use composedPath() — child Searchable/Dropdown removes the clicked option from DOM
		// before the event bubbles, so filterRef.contains(target) would be false
		const path = event.composedPath?.() ?? [event.target];
		const clickedInside = filterRef && path.includes(filterRef);
		if (filterRef && !clickedInside && isExpanded) {
			tempFilters = { ...value };
			isExpanded = false;
		}
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative inline-block" bind:this={filterRef}>
	<!-- Trigger: squircle button with filter icon -->
	<button
		type="button"
		class="
			flex size-10 shrink-0 items-center justify-center
			rounded-xl border border-stroke
			bg-surface-card
			text-fg
			transition duration-(--motion-fast) ease-(--ease-standard)
			hover:border-primary/50 hover:bg-canvas
			focus:border-primary focus:ring-1 focus:ring-primary
			disabled:cursor-not-allowed disabled:opacity-60
			{isExpanded ? 'border-primary ring-1 ring-primary' : ''}
		"
		aria-label="Filter"
		aria-expanded={isExpanded}
		onclick={toggleExpand}
	>
		<FilterIcon size={20} />
	</button>

	{#if isExpanded}
		<div
			class="
				absolute right-0 top-full z-50 mt-2 w-72
				rounded-xl border border-stroke
				bg-surface-card p-4 shadow-lg
			"
		>
			{#if Object.keys(tempFilters).length > 0}
				<div class="mb-4 flex flex-wrap gap-2">
					{#each Object.entries(tempFilters) as [key, opt]}
						{#if opt}
							{@const label = filters.find((f) => f.key === key)?.label ?? key}
							<span
								class="bg-primary-light text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
							>
								{label}: {getOptionLabel(opt)}
								<button
									type="button"
									class="hover:text-primary-hover cursor-pointer rounded p-0.5"
									aria-label="Remove {label}"
									onclick={(e) => handleClearChip(e, key)}
								>
									<X size={12} />
								</button>
							</span>
						{/if}
					{/each}
				</div>
			{/if}

			{#if filters?.length > 0}
				<div class="space-y-4">
					{#each filters as filter (filter.key)}
						{#if shouldShowFilter(filter.key)}
							{#if filter.type === 'dropdown'}
								<Dropdown
									options={filter.options ?? []}
									value={tempFilters[filter.key] ?? null}
									title={filter.label}
									placeholder="Select {filter.label}"
									onSelect={(d) => handleFilterSelect(filter.key, d)}
									onClear={() => handleFilterClear(filter.key)}
								/>
							{:else}
								<Searchable
									options={filter.options ?? []}
									value={tempFilters[filter.key] ?? null}
									title={filter.label}
									placeholder="Search or select {filter.label}"
									onSelect={(d) => handleFilterSelect(filter.key, d)}
									onClear={() => handleFilterClear(filter.key)}
								/>
							{/if}
						{/if}
					{/each}
				</div>
			{:else}
				<p class="text-fg-muted py-4 text-center text-sm italic">No filters available</p>
			{/if}

			<div class="mt-4 flex items-center justify-between">
				<button
					type="button"
					class="text-fg-muted hover:text-fg text-sm transition"
					onclick={handleClearAll}
				>
					Clear All
				</button>
				<button
					type="button"
					class="bg-primary text-canvas-base-fixed hover:bg-primary-hover rounded-full px-4 py-2 text-sm font-medium transition disabled:opacity-60"
					disabled={loading}
					onclick={handleApply}
				>
					{#if loading}
						<span
							class="mr-2 inline-block size-4 animate-spin rounded-full border-2 border-white border-t-transparent"
						></span>
					{/if}
					Apply
				</button>
			</div>
		</div>
	{/if}
</div>
