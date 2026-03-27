<script>
	let {
		label = '',
		icon: Icon,
		value = 0,
		variant = 'default', // default | info | success | danger
		size = 'md', // sm | md | lg
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
			container: 'p-3 sm:p-4 gap-2',
			icon: 'w-8 h-8 sm:w-10 sm:h-10',
			value: 'text-sm sm:text-base'
		},
		lg: {
			container: 'p-4 sm:p-5 gap-3',
			icon: 'w-10 sm:w-12 h-10 sm:h-12',
			value: 'text-base sm:text-lg'
		}
	};

	const variantClass = $derived(variantStyles[variant] ?? variantStyles.default);
	const sizeClass = $derived(sizeStyles[size] ?? sizeStyles.md);
</script>

<div
	class="
		flex flex-col md:flex-row md:items-center md:gap-3
		{sizeClass.container}
		rounded-md
		{variantClass}
		shadow-sm
	"
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
		<span class="text-2xs font-semibold text-fg-muted font-inter uppercase tracking-wide break-word">
			{label}
		</span>

		<!-- Value -->
		<span class="{sizeClass.value} font-bold text-fg font-inter">
			{value}
		</span>

		<!-- Optional Slot -->
		{@render children?.()}
	</div>
</div>
