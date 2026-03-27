<script>
	
	let { label, variant = 'default', size = 'md', icon, hasBorder = true, onclick, isActive = false } = $props();

	const variantClasses = {
		default:
			'bg-surface-card text-fg border-stroke',
		primary:
			'bg-primary-light text-primary border-primary',
		success:
			'bg-secondary-light text-secondary border-secondary',
		danger:
			'bg-danger-surface text-danger border-danger',
		warning:
			'bg-warning-surface text-warning border-warning'
	};

	const sizeClasses = {
		sm: 'px-2.5 py-1 text-xs gap-1.5',
		md: 'px-3 py-1.5 text-sm gap-2',
		lg: 'px-4 py-2 text-base gap-2.5'
	};

	// Interactive styles when used as a clickable button
	const interactiveClasses = $derived(onclick ? 'cursor-pointer transition-all' : '');
	const buttonClasses = $derived(
		isActive
			? 'bg-primary text-white shadow-md border border-primary'
			: 'bg-surface-card text-fg border border-stroke hover:bg-fg-muted/10'
	);
	const baseClasses = $derived(
		`inline-flex items-center rounded-full ${hasBorder ? 'border' : ''} font-medium whitespace-nowrap ${sizeClasses[size] ?? sizeClasses.md}`
	);


</script>

{#if onclick}
	<button
		type="button"
		{onclick}
		class="{baseClasses} {buttonClasses} {interactiveClasses}"
	>
		{#if icon}
			<span class="shrink-0 [&_svg]:size-[1em]">{@render icon()}</span>
		{/if}
		{label}
	</button>
{:else}
	<span
		class="{baseClasses} {variantClasses[variant] ?? variantClasses.default}"
	>
		{#if icon}
			<span class="shrink-0 [&_svg]:size-[1em]">{@render icon()}</span>
		{/if}
		{label}
	</span>
{/if}
