<script>
	let { label, icon, variant = 'primary', shape = 'circle', size = 'md', class: className = '' } = $props();

	const variantClasses = {
		primary: 'bg-primary-light text-primary',
		secondary: 'bg-secondary-light text-secondary',
		danger: 'bg-danger-surface text-danger',
		warning: 'bg-warning-surface text-warning'
	};

	const shapeClasses = {
		circle: 'rounded-full',
		square: 'rounded-xl'
	};

	const sizeConfig = {
		sm: { container: 'size-10', text: 'text-xs', iconClass: '[&_svg]:size-5' },
		md: { container: 'size-12', text: 'text-sm', iconClass: '[&_svg]:size-6' },
		lg: { container: 'size-14', text: 'text-base', iconClass: '[&_svg]:size-7' }
	};

	const config = $derived(sizeConfig[size] ?? sizeConfig.md);
</script>

<div class="flex flex-col items-center gap-2 min-w-0">
	<!-- Icon container -->
	<div
		class="flex items-center justify-center shrink-0 {config.container} {shapeClasses[shape]} {variantClasses[variant] ?? variantClasses.primary} {className}"
	>
		{#if icon}
			<span class="shrink-0 {config.iconClass}">{@render icon()}</span>
		{/if}
	</div>

	<!-- Label -->
	<p class="text-center font-medium text-fg {config.text} leading-tight truncate max-w-full">
		{label}
	</p>
</div>
