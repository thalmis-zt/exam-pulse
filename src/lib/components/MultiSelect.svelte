<script>
	
	import { ChevronDown, X, Check } from '@lucide/svelte';

	let {
		options = [],
		value = $bindable([]),
		title = '',
		placeholder = 'Select',
		disabled = false,
		required = false,
		loading = false,
		validationErrors = '',
		onChange
	} = $props();

	let showDropdown = $state(false);
	let dropDownRef = $state(null);

	function getOptionLabel(option) {
		return option?.name ?? option?.title ?? String(option ?? '');
	}

	function isOptionSelected(option) {
		return value?.some(
			(opt) =>
				opt === option ||
				opt?.id === option?.id ||
				getOptionLabel(opt) === getOptionLabel(option)
		);
	}

	function handleClickOutside(event) {
		if (dropDownRef && !dropDownRef.contains(event.target)) {
			showDropdown = false;
		}
	}

	$effect(() => {
		if (typeof window === 'undefined') return;
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});

	function handleOptionClick(option) {
		const selected = isOptionSelected(option);
		let next;
		if (selected) {
			next = value.filter(
				(opt) =>
					opt !== option &&
					opt?.id !== option?.id &&
					getOptionLabel(opt) !== getOptionLabel(option)
			);
		} else {
			next = [...(value ?? []), option];
		}
		value = next;
		onChange?.({ selectedOptions: next, selectedValues: next.map((o) => o?.id) });
	}

	function handleRemoveOption(e, option) {
		e?.preventDefault?.();
		e?.stopPropagation?.();
		const next = value.filter(
			(opt) =>
				opt !== option &&
				opt?.id !== option?.id &&
				getOptionLabel(opt) !== getOptionLabel(option)
		);
		value = next;
		showDropdown = false;
		onChange?.({ selectedOptions: next, selectedValues: next.map((o) => o?.id) });
	}

	function handleClearAll(e) {
		e?.preventDefault?.();
		e?.stopPropagation?.();
		value = [];
		showDropdown = false;
		onChange?.({ selectedOptions: [], selectedValues: [] });
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

	<div class="relative inline-block w-full text-left" bind:this={dropDownRef}>
		<div>
			<button
				type="button"
				class="
					flex min-h-[38px] w-full items-center justify-between gap-2
					border border-stroke rounded-full
					bg-surface-card px-3 py-2
					shadow-sm
					transition duration-(--motion-fast) ease-(--ease-standard)
					text-sm text-fg outline-none
					placeholder:text-fg-muted
					hover:border-primary/50
					focus:border-primary focus:ring-1 focus:ring-primary
					disabled:cursor-not-allowed disabled:bg-canvas disabled:opacity-60
					{showDropdown ? 'border-primary ring-1 ring-primary' : ''}
					{validationErrors ? 'border-danger ring-1 ring-danger' : ''}
				"
				aria-expanded={showDropdown}
				aria-haspopup="listbox"
				aria-label={title || placeholder}
				{disabled}
				onclick={() => !disabled && !loading && (showDropdown = !showDropdown)}
			>
				<div class="flex min-w-0 flex-1 flex-wrap gap-1">
					{#if !value?.length}
						<span class="text-fg-muted">{placeholder}</span>
					{:else}
						{#each value as option, i (option?.id ?? `${i}-${getOptionLabel(option)}`)}
							<span
								class="bg-primary-light text-primary inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
							>
								{getOptionLabel(option)}
								<span
									role="button"
									tabindex="0"
									class="hover:text-primary-hover cursor-pointer inline-flex"
									aria-label="Remove {getOptionLabel(option)}"
									onclick={(e) => handleRemoveOption(e, option)}
									onkeydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') handleRemoveOption(e, option);
									}}
								>
									<X size={12} />
								</span>
							</span>
						{/each}
					{/if}
				</div>

				<span class="pointer-events-none ml-2 flex shrink-0 items-center">
					{#if loading}
						<span
							class="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
							aria-hidden="true"
						></span>
					{:else if value?.length > 0}
						<span
							role="button"
							tabindex="0"
							class="pointer-events-auto cursor-pointer rounded p-0.5 text-fg-muted hover:bg-canvas hover:text-fg"
							aria-label="Clear all"
							onclick={(e) => { e.stopPropagation(); handleClearAll(e); }}
							onkeydown={(e) => {
								e.stopPropagation();
								if (e.key === 'Enter' || e.key === ' ') handleClearAll(e);
							}}
						>
							<X size={16} />
						</span>
					{:else if !validationErrors}
						<ChevronDown
							size={18}
							class="text-fg-muted transition-transform duration-(--motion-fast) {showDropdown ? 'rotate-180' : ''}"
						/>
					{/if}
				</span>
			</button>
		</div>

		{#if validationErrors && !showDropdown}
			<p class="text-danger mt-1 text-xs">{validationErrors}</p>
		{/if}

		<!-- Dropdown panel - only render when open -->
		{#if showDropdown}
			<div
				class="
					absolute right-0 z-40 mt-2 max-h-52 w-full
					origin-top-right overflow-y-auto rounded-xl
					border border-stroke bg-surface-card py-1 shadow-sm
				"
				role="listbox"
				aria-multiselectable="true"
				tabindex="-1"
			>
				{#if loading}
					<div class="text-fg-muted px-4 py-3 text-sm italic">
						Loading...
					</div>
				{:else if options?.length > 0}
					{#each options as option, index (option?.id ?? index)}
						{@const isSelected = isOptionSelected(option)}
						<button
							type="button"
							role="option"
							aria-selected={isSelected}
							class="
								text-fg hover:bg-canvas flex w-full items-center gap-2 px-4 py-2 text-left text-sm
								transition duration-(--motion-fast) ease-(--ease-standard)
								{isSelected ? 'bg-primary-light text-primary font-medium' : ''}
							"
							onclick={() => handleOptionClick(option)}
						>
							{#if isSelected}
								<Check size={16} class="shrink-0" />
							{:else}
								<span class="size-4 shrink-0" aria-hidden="true"></span>
							{/if}
							<span>{getOptionLabel(option)}</span>
						</button>
					{/each}
				{:else}
					<div class="text-fg-muted px-4 py-3 text-sm italic">
						No options available
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
