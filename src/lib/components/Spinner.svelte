<script>
	let {
		size = 'md',
		variant = 'primary',
		message = '',
		class: className = '',
		ariaLabel = 'Loading'
	} = $props();

	const sizeClasses = {
		sm: 'size-4',
		md: 'size-8',
		lg: 'size-16'
	};

	const variantClasses = {
		primary: 'text-primary',
		custom: ''
	};

	const styles = $derived.by(() => {
		const sizeClass = sizeClasses[size] ?? sizeClasses.md;
		const colorClass = variantClasses[variant] ?? variantClasses.primary;
		return {
			container: `inline-flex flex-col items-center gap-2 ${className}`,
			svg: `shrink-0 animate-spin ${sizeClass} ${colorClass}`,
			message: `text-sm ${variant === 'custom' ? 'text-current' : colorClass}`
		};
	});
</script>

<span role="status" aria-label={ariaLabel} class={styles.container}>
	<svg class={styles.svg} fill="none" viewBox="0 0 24 24" aria-hidden="true">
		<circle
			class="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			stroke-width="4"
		></circle>
		<path
			class="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		></path>
	</svg>
	{#if message}
		<span class={styles.message}>{message}</span>
	{/if}
</span>
