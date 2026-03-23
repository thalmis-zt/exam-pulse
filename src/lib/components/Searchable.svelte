<script>

	import { Search, X, Check } from '@lucide/svelte';
	import { tick } from 'svelte';
	let {
		options = [],
		value = $bindable(null),
		title = '',
		placeholder = 'Search or select...',
		disabled = false,
		required = false,
		loading = false,
		validationErrors = '',
		onSelect,
		onClear
	} = $props();

	let showDropdown = $state(false);
	let dropDownRef = $state(null);
	let inputRef = $state(null);
	let listRef = $state(null);
	let searchValue = $state('');
	let isUserTyping = $state(false);
	let highlightedIndex = $state(-1);

	function getOptionLabel(option) {
		return option?.name ?? option?.title ?? String(option ?? '');
	}

	const filteredOptions = $derived(
		searchValue && isUserTyping
			? options.filter((opt) =>
					getOptionLabel(opt).toLowerCase().includes(searchValue.toLowerCase())
				)
			: options
	);

	const inputDisplayValue = $derived(
		isUserTyping ? searchValue : (value ? getOptionLabel(value) : '')
	);

	function handleClickOutside(event) {
		if (dropDownRef && !dropDownRef.contains(event.target)) {
			closeDropdown();
		}
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	$effect(() => {
		if (value) {
			searchValue = getOptionLabel(value);
		} else {
			searchValue = '';
		}
	});

	function handleSelect(option) {
		value = option;
		searchValue = getOptionLabel(option);
		isUserTyping = false;
		showDropdown = false;
		highlightedIndex = -1;
		onSelect?.({
			selectedOption: option,
			selectedItemId: option?.id,
			selectedItemName: getOptionLabel(option)
		});
	}

	function handleClear(e) {
		e?.preventDefault?.();
		e?.stopPropagation?.();
		value = null;
		searchValue = '';
		isUserTyping = true;
		showDropdown = true;
		highlightedIndex = -1;
		onClear?.();
		inputRef?.focus();
	}

	function closeDropdown() {
		showDropdown = false;
		highlightedIndex = -1;
		if (isUserTyping) {
			if (value) {
				searchValue = getOptionLabel(value);
			} else {
				searchValue = '';
			}
			isUserTyping = false;
		}
	}

	function handleInput(e) {
		const v = e.target?.value ?? '';
		searchValue = v;
		isUserTyping = true;
		if (!showDropdown) showDropdown = true;
		highlightedIndex = -1;
		if (!v.trim() && !value) {
			showDropdown = false;
			isUserTyping = false;
		}
	}

	function handleInputFocus() {
		showDropdown = true;
	}

	function handleInputBlur() {
		setTimeout(() => {
			if (dropDownRef && document.activeElement && !dropDownRef.contains(document.activeElement)) {
				closeDropdown();
			}
		}, 150);
	}

	function handleKeydown(e) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				navigateOptions(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				navigateOptions(-1);
				break;
			case 'Enter':
				e.preventDefault();
				if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
					handleSelect(filteredOptions[highlightedIndex]);
				} else if (highlightedIndex === -1) {
					showDropdown = true;
				}
				break;
			case 'Escape':
				e.preventDefault();
				closeDropdown();
				inputRef?.blur();
				break;
		}
	}

	async function navigateOptions(direction) {
		if (filteredOptions.length === 0) return;
		let next = highlightedIndex + direction;
		if (next < 0) next = filteredOptions.length - 1;
		else if (next >= filteredOptions.length) next = 0;
		highlightedIndex = next;
		await tick();
		if (listRef?.children?.[highlightedIndex]) {
			listRef.children[highlightedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
		}
	}

	function isOptionSelected(option) {
		return (
			value &&
			(value === option ||
				value?.id === option?.id ||
				getOptionLabel(value) === getOptionLabel(option))
		);
	}
</script>

<div class="w-full">
	{#if title}
		<p
			class="text-fg mb-1 block text-xs font-medium capitalize leading-5 sm:text-xs"
		>
			{title}{#if required}<span class="text-danger ml-0.5">*</span>{/if}
		</p>
	{/if}

	<div class="relative w-full" bind:this={dropDownRef}>
		<!-- Input container - SearchBar  -->
		<div
			class="
				flex items-center gap-1
				border border-stroke rounded-full
				bg-surface-card px-2 py-0.5
				shadow-sm
				transition duration-(--motion-fast) ease-(--ease-standard)
				text-sm text-fg
				hover:border-primary/50
				focus-within:border-primary focus-within:ring-1 focus-within:ring-primary
				disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60
				{showDropdown ? 'border-primary ring-1 ring-primary' : ''}
				{validationErrors ? 'border-danger ring-1 ring-danger' : ''}
			"
		>
			<Search class="size-4 ml-4 shrink-0 text-fg-muted" />

			<input
				bind:this={inputRef}
				type="text"
				role="combobox"
				aria-expanded={showDropdown}
				aria-haspopup="listbox"
				aria-controls="searchable-options"
				aria-autocomplete="list"
				aria-label={title || placeholder}
				{placeholder}
				value={inputDisplayValue}
				{disabled}
				class="
					flex-1 min-w-0 bg-transparent outline-none border-none
					placeholder:text-fg-muted
					focus:outline-none focus:ring-0
				"
				oninput={handleInput}
				onfocus={handleInputFocus}
				onblur={handleInputBlur}
				onkeydown={handleKeydown}
			/>

			<!-- Right: loading | clear | chevron -->
			<span class="flex shrink-0 items-center">
				{#if loading}
					<span
						class="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
						aria-hidden="true"
					></span>
				{:else if showDropdown && value}
					<span
						role="button"
						tabindex="0"
						class="cursor-pointer rounded p-0.5 text-fg-muted hover:bg-canvas hover:text-fg"
						onclick={(e) => { e.stopPropagation(); handleClear(e); }}
						onkeydown={(e) => { e.key === 'Enter' && handleClear(e); }}
						aria-label="Clear selection"
					>
						<X size={16} />
					</span>
				{/if}
			</span>
		</div>

		{#if validationErrors && !showDropdown}
			<p class="text-danger mt-1 text-xs">{validationErrors}</p>
		{/if}

		{#if showDropdown && !disabled}
			<ul
				bind:this={listRef}
				id="searchable-options"
				role="listbox"
				class="
					absolute left-0 right-0 z-40 mt-2 max-h-52 w-full
					list-none overflow-y-auto rounded-xl border border-stroke
					bg-surface-card py-1 shadow-sm
				"
			>
				{#if loading}
					<li class="text-fg-muted px-4 py-3 text-sm italic">Loading...</li>
				{:else if filteredOptions.length === 0}
					<li class="text-fg-muted px-4 py-3 text-sm italic">
						No options found
					</li>
				{:else}
					{#each filteredOptions as option, index (option?.id ?? index)}
						{@const isSelected = isOptionSelected(option)}
						<li role="option" aria-selected={isSelected}>
							<button
								type="button"
								class="
									text-fg hover:bg-canvas flex w-full cursor-pointer items-center justify-between gap-2 border-0 px-4 py-2 text-left text-sm
									transition duration-(--motion-fast) ease-(--ease-standard)
									{highlightedIndex === index && !isSelected ? 'bg-canvas' : ''}
									{isSelected ? 'bg-primary-light text-primary font-medium' : ''}
								"
								onclick={() => handleSelect(option)}
								onmouseenter={() => (highlightedIndex = index)}
							>
								<span class="min-w-0 truncate">{getOptionLabel(option)}</span>
								{#if isSelected}
									<Check size={16} class="shrink-0" />
								{/if}
							</button>
						</li>
					{/each}
				{/if}
			</ul>
		{/if}
	</div>
</div>
