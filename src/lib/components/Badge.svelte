<script>
	
	let { label, variant = 'default', size = 'md', icon } = $props();

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
</script>

<span
	class="
		inline-flex items-center
		rounded-full border font-medium whitespace-nowrap
		{variantClasses[variant] ?? variantClasses.default}
		{sizeClasses[size] ?? sizeClasses.md}
	"
>
	{#if icon}
		<span class="shrink-0 [&_svg]:size-[1em]">{@render icon()}</span>
	{/if}
	{label}
</span>
