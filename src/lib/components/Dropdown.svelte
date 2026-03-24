<script>
	import { ChevronDown, X, Check } from '@lucide/svelte';

	let {
		options = [],
		value = $bindable(null),
		title = '',
		placeholder = 'Select',
		disabled = false,
		required = false,
		loading = false,
		validationErrors = '',
		type = '',
		icon,
		onSelect,
		onClear
	} = $props();

	let showDropdown = $state(false);
	let dropDownRef = $state(null);

	function getOptionLabel(option) {
		return option?.name ?? option?.title ?? String(option ?? '');
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

	function handleSelect(option) {
		value = option;
		showDropdown = false;
		onSelect?.({
			selectedOption: option,
			selectedItemId: option?.id,
			selectedItemName: getOptionLabel(option),
			selectedItemUuid: option?.id,
			type
		});
	}

	function handleClear(e) {
		e?.preventDefault?.();
		e?.stopPropagation?.();
		value = null;
		showDropdown = false;
		onClear?.();
	}
</script>

<div class="w-full">
	{#if title}
		<p class="text-fg mb-2 block text-sm font-medium leading-5">
			{title}{#if required}<span class="text-danger ml-0.5">*</span>{/if}
		</p>
	{/if}

	<div class="relative inline-block w-full text-left" bind:this={dropDownRef}>
		<div>
			<button
				type="button"
				class="
					flex w-full items-center justify-between gap-2
					border border-stroke rounded-lg
					bg-surface-card px-3 py-2.5
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
				onclick={() => !disabled && (showDropdown = !showDropdown)}
			>
				<span class="flex min-w-0 flex-1 items-center gap-2">
					{#if icon}
						<span class="shrink-0 text-fg-muted [&_svg]:size-4">{@render icon()}</span>
					{/if}
					<span class="min-w-0 truncate">
						{value ? getOptionLabel(value) : placeholder}
					</span>
				</span>

				<!-- Right side: loading | clear | chevron -->
				<span class="pointer-events-none ml-2 flex shrink-0 items-center">
					{#if loading}
						<span
							class="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
							aria-hidden="true"
						></span>
					{:else if showDropdown && value}
						<span
							role="button"
							tabindex="0"
							class="pointer-events-auto -mr-1 cursor-pointer rounded p-0.5 text-fg-muted hover:bg-canvas hover:text-fg"
							onclick={(e) => { e.stopPropagation(); handleClear(e); }}
							onkeydown={(e) => { e.stopPropagation(); e.key === 'Enter' && handleClear(e); }}
							aria-label="Clear selection"
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

		{#if showDropdown}
		<div
			class="
				absolute right-0 z-40 mt-2 max-h-52 w-full
				origin-top-right overflow-y-auto
				rounded-xl border border-stroke
				bg-surface-card shadow-sm
				focus:outline-none
			"
			role="listbox"
			aria-labelledby="select-button"
			tabindex="-1"
		>
			<div class="py-1" role="group">
					{#if loading}
						<div class="text-fg-muted px-4 py-3 text-sm italic">
							Loading...
						</div>
					{:else if options?.length > 0}
						{#each options as option, index (option?.id ?? index)}
							{@const isSelected = value && (value === option || value?.id === option?.id || getOptionLabel(value) === getOptionLabel(option))}
							<button
								type="button"
								role="option"
								aria-selected={isSelected}
								class="
									text-fg hover:bg-canvas flex w-full items-center justify-between gap-2 px-4 py-2 text-left text-sm
									transition duration-(--motion-fast) ease-(--ease-standard)
									{isSelected ? 'bg-primary-light text-primary font-medium' : ''}
								"
								onclick={() => handleSelect(option)}
							>
								<span>{getOptionLabel(option)}</span>
								{#if isSelected}
									<Check size={16} class="shrink-0" />
								{/if}
							</button>
						{/each}
					{:else}
						<div class="text-fg-muted px-4 py-3 text-sm italic">
							No options available
						</div>
					{/if}
				</div>
		</div>
		{/if}
	</div>
</div>
