<script>
	import { Filter, X } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterPanel from '$lib/components/FilterPanel.svelte';

	let {
		selectedSubject = null,
		selectedDifficulty = null,
		selectedTimeRange = null,
		subjects = [],
		difficulties = [],
		timeRanges = [],
		onSearch = () => {},
		onFilterChange = () => {}
	} = $props();

	let searchValue = $state('');
	let showFilters = $state(false);
	let filterPanelMutableValue = $state({});

		const filterPanelFilters = $derived([
		{
			key: 'subject',
			label: 'Subject',
			options: subjects 
		},
		{
			key: 'difficulty',
			label: 'Difficulty',
			options: difficulties 
		},
		{
			key: 'timeRange',
			label: 'Time Range',
			options: timeRanges
		}
	]);

	$effect(() => {
		if (showFilters) {
			filterPanelMutableValue = {
				subject: selectedSubject,
				difficulty: selectedDifficulty,
				timeRange: selectedTimeRange
			};
		}
	});

// --------------------------- Filter Handlers ----------------------------

	function handleApplyFilters(filters) {
		onFilterChange(filters);
		showFilters = false;
	}

	function handleClearFilters() {
		const clearedFilters = {
			subject: null,
			difficulty: null,
			timeRange: null
		};
		filterPanelMutableValue = clearedFilters;
		onFilterChange(clearedFilters);
		showFilters = false;
	}

	function removeFilter(filterType) {
		const updatedFilters = {
			subject: filterType === 'subject' ? null : selectedSubject,
			difficulty: filterType === 'difficulty' ? null : selectedDifficulty,
			timeRange: filterType === 'timeRange' ? null : selectedTimeRange
		};
		onFilterChange(updatedFilters);
	}

	function getAppliedFilters() {
		const filters = [];
		if (selectedSubject) {
			filters.push({ type: 'subject', label: selectedSubject.label });
		}
		if (selectedDifficulty) {
			filters.push({ type: 'difficulty', label: selectedDifficulty.label });
		}
		if (selectedTimeRange) {
			filters.push({ type: 'timeRange', label: selectedTimeRange.label });
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
		<div class="flex-1">
			<SearchBar
				bind:value={searchValue}
				onSearch={onSearch}
				placeholder="Search by quiz name or topic"
				variant="md"
			/>
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
						title={`Remove ${filter.type} filter`}
					>
						<X size={14} />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<!-- Filters Section (Modal/Popover style) -->
	{#if showFilters}
		<FilterPanel
			filters={filterPanelFilters}
			bind:value={filterPanelMutableValue}
			onApply={handleApplyFilters}
			onClear={handleClearFilters}
		/>
	{/if}
</div>
