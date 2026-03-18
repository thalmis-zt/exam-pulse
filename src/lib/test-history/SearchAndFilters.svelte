<script>
	import { Search, Filter, X } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	let {
		searchValue = '',
		selectedSubject = null,
		selectedDifficulty = null,
		selectedTimeRange = null,
		subjects = [],
		difficulties = [],
		timeRanges = [],
		onSearch = () => {},
		onFilterChange = () => {}
	} = $props();

	let showFilters = $state(false);
	let pendingSubject = $state(null);
	let pendingDifficulty = $state(null);
	let pendingTimeRange = $state(null);

	// Sync pending values when props change
	$effect(() => {
		pendingSubject = selectedSubject;
		pendingDifficulty = selectedDifficulty;
		pendingTimeRange = selectedTimeRange;
	});

	function handleFilterSelect(filterKey, value, isToggle = false) {
		if (filterKey === 'subject') {
			pendingSubject = isToggle && pendingSubject === value ? null : value;
		} else if (filterKey === 'difficulty') {
			pendingDifficulty = isToggle && pendingDifficulty === value ? null : value;
		} else if (filterKey === 'timeRange') {
			pendingTimeRange = isToggle && pendingTimeRange === value ? null : value;
		}
	}

	const filterGroups = $derived([
		{
			title: 'Subject',
			key: 'subject',
			items: subjects.map((s) => ({ display: s, value: s })),
			getPending: () => pendingSubject,
			isSelected: (item) => pendingSubject === item.value,
			onSelect: (item) => handleFilterSelect('subject', item.value, true)
		},
		{
			title: 'Difficulty',
			key: 'difficulty',
			items: difficulties.map((d) => ({ display: d, value: d.toLowerCase() })),
			getPending: () => pendingDifficulty,
			isSelected: (item) => pendingDifficulty === item.value,
			onSelect: (item) => handleFilterSelect('difficulty', item.value, true)
		},
		{
			title: 'Time Range',
			key: 'timeRange',
			items: timeRanges.map((t) => ({ display: t.label, value: t.value })),
			getPending: () => pendingTimeRange,
			isSelected: (item) => pendingTimeRange === item.value,
			onSelect: (item) => handleFilterSelect('timeRange', item.value, true)
		}
	]);

	function applyFilters() {
		onFilterChange({
			subject: pendingSubject,
			difficulty: pendingDifficulty,
			timeRange: pendingTimeRange
		});
		showFilters = false;
	}

	function clearAllFilters() {
		pendingSubject = null;
		pendingDifficulty = null;
		pendingTimeRange = null;
		onFilterChange({
			subject: null,
			difficulty: null,
			timeRange: null
		});
	}

	function removeFilter(filterType) {
		const updatedFilters = {
			subject: selectedSubject,
			difficulty: selectedDifficulty,
			timeRange: selectedTimeRange
		};
		
		// Reset the specific filter being removed
		if (filterType === 'subject') {
			updatedFilters.subject = null;
		} else if (filterType === 'difficulty') {
			updatedFilters.difficulty = null;
		} else if (filterType === 'timeRange') {
			updatedFilters.timeRange = null;
		}
		
		onFilterChange(updatedFilters);
	}

	function getTimeRangeLabel(value) {
		return timeRanges.find((tr) => tr.value === value)?.label || value;
	}

	function getAppliedFilters() {
		const filters = [];
		if (selectedSubject) {
			filters.push({ type: 'subject', label: selectedSubject });
		}
		if (selectedDifficulty) {
			filters.push({ type: 'difficulty', label: selectedDifficulty });
		}
		if (selectedTimeRange !== null) {
			filters.push({ type: 'timeRange', label: getTimeRangeLabel(selectedTimeRange) });
		}
		return filters;
	}

	const appliedFilters = $derived(getAppliedFilters());

</script>

<!-- Search and Filters Container -->
<div class="flex flex-col gap-3 sm:gap-4">
	<!-- Search Bar & Filter Button Row -->
	<div class="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center justify-between">
		<!-- Search Bar (Left) -->
		<div class="flex items-center gap-3 rounded-lg transition-all duration-fast ease-standard flex-1">
			<div class="border border-stroke rounded-md flex items-center gap-2 flex-1">
				<!-- Search Icon -->
				<div class="px-2">
					<Search size={14} class="text-fg-muted shrink-0" />
				</div>
				<!-- Search Input -->
				<input
					type="text"
					value={searchValue}
					onchange={(e) => onSearch(e.target.value)}
					placeholder="Search by quiz name or topic..."
					class="flex-1 bg-transparent text-xs sm:text-sm text-fg font-poppins outline-none border-none ring-0 focus:ring-0 focus:border-none placeholder:text-fg-muted"
				/>
			</div>
		</div>

		<!-- Filter Toggle Button -->
		<Button
			btnType="primaryLight"
			onclick={() => (showFilters = !showFilters)}
			title="Toggle Filters"
		>
			<Filter class="h-4 w-4" />
			<span>{showFilters ? 'Hide' : 'Show'} Filters</span>
		</Button>
	</div>

	<!-- Applied Filters Display -->
	{#if appliedFilters.length > 0}
		<div class="flex flex-wrap gap-2 items-center">
			<span class="text-2xs sm:text-xs text-fg-muted font-poppins font-semibold">Filters applied:</span>
			{#each appliedFilters as filter (filter.type)}
				<div class="flex items-center gap-1 px-3 py-1 rounded-full bg-primary-light border border-primary text-xs">
					<span>{filter.label}</span>
					<button
						onclick={() => removeFilter(filter.type)}
						class="ml-1 hover:opacity-70 transition-opacity"
						title="Remove {filter.type} filter"
					>
						<X size={14} />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Filters Section (Inline) -->
	{#if showFilters}
		<div class="border border-stroke rounded-md bg-surface-card p-4 space-y-4">
			{#each filterGroups as group (group.key)}
				<div>
					<p class="text-fg-muted font-poppins text-2xs sm:text-xs font-semibold uppercase tracking-wide mb-2">
						{group.title}
					</p>
					<div class="flex flex-wrap gap-2">
						{#each group.items as item (item.value)}
							<button
								onclick={() => group.onSelect(item)}
								class="px-3 py-1 rounded-full text-2xs sm:text-xs font-medium border transition-all duration-motion-fast ease-ease-standard {group.isSelected(item)
									? 'bg-primary text-white border-primary'
									: 'bg-canvas border-stroke text-fg hover:bg-surface-card'}"
							>
								{item.display}
							</button>
						{/each}
					</div>
				</div>
			{/each}

			<!-- Buttons Row -->
			<div class="border-t border-stroke pt-3 flex gap-2">
				<Button
					btnType="dangerLight"
					onclick={clearAllFilters}
				>
					Clear All
				</Button>
				<Button
					btnType="primary"
					onclick={applyFilters}
				>
					Apply Filters
				</Button>
			</div>
		</div>
	{/if}
</div>
