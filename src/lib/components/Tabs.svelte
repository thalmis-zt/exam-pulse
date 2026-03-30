<script>
	let {
		options = [],
		selected,
		onSelect,
		size = 'md',
		title = '',
		required = false,
		ariaLabel = '',
		variant = 'default',
		class: className = ''
	} = $props();

	const titleId = `tabs-label-${crypto.randomUUID()}`;

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

	const tablistClasses = $derived(
		variant === 'segmented'
			? 'inline-flex w-auto max-w-full min-w-0 items-stretch gap-0 overflow-hidden rounded-lg border border-stroke bg-surface-card shadow-sm divide-x divide-stroke p-0'
			: 'flex w-full min-w-0 items-center gap-1 rounded-lg bg-stroke px-3 py-1 sm:px-6'
	);

	/**
	 * @param {boolean} isSelected
	 */
	function tabButtonClasses(isSelected) {
		const base =
			'min-w-0 font-medium whitespace-nowrap transition duration-(--motion-fast) ease-(--ease-standard) flex items-center justify-center gap-2 normal-case';
		if (variant === 'segmented') {
			const state = isSelected
				? 'bg-primary text-canvas-base-fixed hover:bg-primary-hover'
				: 'bg-canvas text-fg hover:bg-stroke/80';
			return `${base} ${sizeClasses[size] ?? sizeClasses.md} flex-1 sm:min-w-[7.5rem] rounded-none border-0 shadow-none ${state}`;
		}
		return [
			'min-w-0 flex-1 text-center rounded-md',
			sizeClasses[size] ?? sizeClasses.md,
			isSelected
				? 'bg-surface-card text-primary shadow-sm'
				: 'bg-transparent text-fg-muted hover:text-fg'
		].join(' ');
	}
</script>

<div class="min-w-0 {variant === 'segmented' ? 'w-auto' : 'w-full'} {className}">
	{#if title}
		<p id={titleId} class="text-fg mb-2 block text-sm font-medium leading-5">
			{title}{#if required}<span class="text-danger ml-0.5">*</span>{/if}
		</p>
	{/if}

	<div
		role="tablist"
		aria-label={ariaLabel || (title ? undefined : 'Tabs')}
		aria-labelledby={title ? titleId : undefined}
		tabindex="0"
		class="{tablistClasses}"
		onkeydown={handleKeydown}
	>
		{#each options as option, i}
			{@const Icon = option.icon}
			<button
				role="tab"
				type="button"
				tabindex={selectedIndex === i ? 0 : -1}
				aria-selected={selected === option.value}
				aria-controls="tabpanel-{option.value}"
				id="tab-{option.value}"
				class={tabButtonClasses(selected === option.value)}
				onclick={() => onSelect?.(option.value)}
				onfocus={() => (focusedIndex = i)}
			>
				{#if Icon}
					<Icon size={16} class="shrink-0" aria-hidden="true" />
				{/if}
				{option.label}
			</button>
		{/each}
	</div>
</div>
