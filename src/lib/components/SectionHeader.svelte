<script>
	let {
		title,
		subtitle = '',
		showAll = false,
		onViewAll,
		variant = 'lg',
		/** Optional row below the title (e.g. metadata); keeps vertical rhythm tight vs a sibling block. */
		meta
	} = $props();

	// use lg for page headers, md for section headers
	const variantClasses = {
		sm: {
			title: 'text-sm font-semibold text-fg',
			subtitle: 'text-xs text-fg-muted',
			button: 'text-xs font-medium'
		},
		md: {
			title: 'text-sm sm:text-base font-bold text-fg',
			subtitle: 'text-sm text-fg-muted',
			button: 'text-sm font-medium'
		},
		lg: {
			title: 'text-base sm:text-lg font-bold text-fg',
			subtitle: 'text-sm text-fg-muted',
			button: 'text-sm font-medium'
		}
	};

	const classes = $derived(variantClasses[variant] || variantClasses.lg);
</script>

<div class="flex min-w-0 flex-col gap-1">
	<div class="flex min-w-0 items-center justify-between">
		<h2 class="{classes.title} min-w-0">{title}</h2>
		{#if showAll}
			<button
				onclick={onViewAll}
				class="{classes.button} text-primary flex cursor-pointer items-center gap-1 border-none bg-transparent p-0"
			>
				All ›
			</button>
		{/if}
	</div>
	{#if meta}
		<div class="min-w-0">
			{@render meta()}
		</div>
	{/if}
	{#if subtitle}
		<p class="{classes.subtitle} m-0">{subtitle}</p>
	{/if}
</div>
