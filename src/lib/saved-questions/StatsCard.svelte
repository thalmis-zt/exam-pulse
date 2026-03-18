<script>
	let {
		label = '',
		icon: Icon,
		value = 0,
		variant = 'default', // default | info | success | danger
		size = 'md', // sm | md | lg
		active = false,
		disabled = false,
		onClick = () => {},
		children
	} = $props();

	const variantStyles = {
		default: 'bg-surface-card',
		info: 'bg-info-surface',
		success: 'bg-success-surface/50',
		danger: 'bg-danger-surface/50'
	};

	const sizeStyles = {
		sm: {
			container: 'p-3 gap-2',
			icon: 'w-8 h-8',
			value: 'text-sm'
		},
		md: {
			container: 'p-4 gap-2',
			icon: 'w-10 h-10',
			value: 'text-base'
		},
		lg: {
			container: 'p-5 gap-3',
			icon: 'w-12 h-12',
			value: 'text-lg'
		}
	};

	const variantClass = $derived(variantStyles[variant] ?? variantStyles.default);
	const sizeClass = $derived(sizeStyles[size] ?? sizeStyles.md);
</script>

<button
	type="button"
	class="
		flex flex-col md:flex-row md:items-center md:gap-3
		{sizeClass.container}
		rounded-md
		{variantClass}
		shadow-sm
		transition-all duration-fast ease-standard
		{disabled ? 'opacity-50 cursor-not-allowed' : ''}
	"
	onclick={!disabled ? onClick : undefined}
	aria-pressed={active}
>
	<!-- Icon -->
	{#if Icon}
		<div class="shrink-0 text-primary bg-canvas-base/80 {sizeClass.icon} rounded-md flex items-center justify-center">
			<Icon size={16} strokeWidth={1.5} />
		</div>
	{/if}

	<!-- Content -->
	<div class="flex flex-col items-start">
		<!-- Label -->
		<span class="text-2xs font-semibold text-fg-muted font-inter uppercase tracking-wide">
			{label}
		</span>

		<!-- Value -->
		<span class="{sizeClass.value} font-bold text-fg font-inter">
			{value}
		</span>

		<!-- Optional Slot -->
		{@render children?.()}
	</div>
</button>