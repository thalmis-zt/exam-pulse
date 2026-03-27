<script>

	let {
		value: valueProp,
		current,
		total,
		target,
		variant: variantOverride,
		size = 'md',
		ariaLabel = 'Progress',
		labelLeft,
		labelRight
	} = $props();

	// Compute percentage: prefer current/total when both provided
	const value = $derived(
		current != null && total != null && total > 0
			? Math.min(100, Math.max(0, (current / total) * 100))
			: Math.min(100, Math.max(0, valueProp ?? 0))
	);

	//  variant: below target → danger, else primary (unless variantOverride set)
	const variant = $derived(
		variantOverride ??
			(target != null && value < target
				? 'danger'
				: 'primary')
	);

	const fillVariantClasses = {
		primary: 'bg-primary',
		danger: 'bg-danger',
		success: 'bg-secondary'
	};

	const sizeClasses = {
		xs: 'h-1',
		sm: 'h-2',
		md: 'h-3',
		lg: 'h-4'
	};
</script>

<div class="flex flex-col gap-2 w-full min-w-0">
	<!-- Label row -->
	{#if labelLeft || labelRight}
		<div class="flex items-center justify-between gap-4 text-xs uppercase tracking-wide text-fg-muted">
			<div class="min-w-0 shrink">
				{#if labelLeft}
					{@render labelLeft()}
				{/if}
			</div>
			<div class="shrink-0">
				{#if labelRight}
					{@render labelRight()}
				{/if}
			</div>
		</div>
	{/if}

	<!-- Progress bar track -->
	<div
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={100}
		aria-label={ariaLabel}
		class="w-full overflow-hidden rounded-full bg-stroke {sizeClasses[size]}"
	>
		<!-- Fill -->
		<div
			class="h-full rounded-full transition-[width] duration-(--motion-normal) ease-(--ease-standard) {fillVariantClasses[variant] ?? fillVariantClasses.primary}"
			style="width: {value}%"
		></div>
	</div>
</div>
