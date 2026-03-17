<script>
	
	let {
		icon: Icon,
		ariaLabel,
		variant = 'outline',
		size = 'lg',
		shape = 'squircle',
		disabled = false,
		active = false,
		type = 'button',
		class: className = '',
		...rest
	} = $props();

	const sizeClasses = {
		sm: 'size-8 [&_svg]:size-4',
		md: 'size-9 [&_svg]:size-[18px]',
		lg: 'size-10 [&_svg]:size-5'
	};

	const shapeClasses = {
		square: 'rounded-md',
		squircle: 'rounded-xl'
	};

	const variantClasses = {
		ghost: 'text-fg hover:bg-canvas hover:text-primary focus:text-primary',
		'ghost-subtle': 'text-fg-muted hover:bg-canvas hover:text-fg hover:text-primary focus:text-primary',
		outline:
			'border border-stroke bg-surface-card text-fg hover:border-primary/50 hover:bg-canvas hover:text-primary focus:border-primary focus:ring-1 focus:ring-primary focus:text-primary'
	};

	const activeClasses = {
		outline: 'border-primary ring-1 ring-primary text-primary',
		ghost: 'bg-canvas text-primary',
		'ghost-subtle': 'bg-canvas text-primary'
	};
</script>

<button
	{type}
	{disabled}
	aria-label={ariaLabel}
	class="
		flex shrink-0 items-center justify-center
		transition duration-(--motion-fast) ease-(--ease-standard)
		disabled:cursor-not-allowed disabled:opacity-60
		{sizeClasses[size]}
		{shapeClasses[shape]}
		{variantClasses[variant]}
		{active ? activeClasses[variant] : ''}
		{className}
	"
	{...rest}
>
	{#if Icon}
		<Icon />
	{/if}
</button>
