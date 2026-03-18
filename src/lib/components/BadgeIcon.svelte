<script>
	let { label, icon, variant = 'primary', shape = 'circle', size = 'md', class: className = '', showLabel = true } = $props();

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

	const styles = $derived.by(() => {
		const sizeSettings = sizeConfig[size] ?? sizeConfig.md;
		const variantStyle = variantClasses[variant] ?? variantClasses.primary;
		const shapeStyle = shapeClasses[shape] ?? shapeClasses.circle;

		return {
			container: `flex items-center justify-center shrink-0 ${sizeSettings.container} ${shapeStyle} ${variantStyle} ${className}`.trim(),
			iconWrapper: `shrink-0 ${sizeSettings.iconClass}`,
			label: `text-center font-medium text-fg ${sizeSettings.text} leading-tight truncate max-w-full`
		};
	});
</script>

<div class="flex flex-col items-center gap-2 min-w-0">
	<!-- Icon container -->
	<div class={styles.container}>
		{#if icon}
			<span class={styles.iconWrapper}>{@render icon()}</span>
		{/if}
	</div>

	<!-- Label -->
	{#if showLabel}
		<p class={styles.label}>
			{label}
		</p>
	{/if}
</div>
