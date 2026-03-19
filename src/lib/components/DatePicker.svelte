<script>

	let {
		mode = 'single',
		label = '',
		value = $bindable(''),
		startDate = $bindable(''),
		endDate = $bindable(''),
		startLabel = 'Start date',
		endLabel = 'End date',
		min = '',
		max = '',
		disabled = false,
		error: externalError = '',
		required = false,
		class: className = '',
	} = $props();

	let internalError = $state('');

	$effect(() => {
		if (mode !== 'range') return;
		if (!startDate || !endDate) {
			internalError = '';
			return;
		}
		const start = new Date(startDate);
		const end = new Date(endDate);
		if (start > end) {
			internalError = 'Start date cannot be after end date';
		} else {
			internalError = '';
		}
	});

	const hasError = $derived(!!(externalError || internalError));
	const displayError = $derived(externalError || internalError);

	const fallbackId = `datepicker-${crypto.randomUUID()}`;
	const startId = $derived(`${fallbackId}-start`);
	const endId = $derived(`${fallbackId}-end`);
	const singleId = $derived(`${fallbackId}-single`);

	const styles = $derived.by(() => {
		const base = 'w-full rounded-lg border bg-transparent px-3 py-2.5 text-sm text-fg font-poppins transition duration-(--motion-fast) ease-(--ease-standard) outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50';
		const state = hasError
			? 'border-danger focus:ring-danger/20 focus:border-danger'
			: 'border-stroke focus:ring-primary/20 focus:border-primary';
		return {
			input: `${base} ${state}`.trim(),
			label: 'text-sm font-medium text-fg',
			subLabel: 'text-xs text-fg-muted font-poppins',
			error: 'text-xs text-danger font-poppins',
		};
	});
</script>

<div class="flex flex-col gap-3 {className}">
	{#if label}
		<label for={mode === 'single' ? singleId : undefined} class={styles.label}>
			{label}
			{#if required}<span class="text-danger" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	{#if mode === 'single'}
		<div class="flex flex-col gap-1.5">
			<input
				id={singleId}
				type="date"
				bind:value
				{min}
				{max}
				{required}
				{disabled}
				aria-invalid={hasError || undefined}
				aria-required={required || undefined}
				aria-describedby={displayError ? `${fallbackId}-error` : undefined}
				class={styles.input}
			/>
		</div>
	{:else}
		<div class="flex flex-row gap-3">
			<div class="flex flex-1 flex-col gap-1.5 min-w-0">
				<label for={startId} class={styles.subLabel}>{startLabel}{#if required}<span class="text-danger" aria-hidden="true">*</span>{/if}</label>
				<input
					id={startId}
					type="date"
					bind:value={startDate}
					{min}
					max={endDate || max}
					{required}
					{disabled}
					aria-invalid={hasError || undefined}
					aria-required={required || undefined}
					class={styles.input}
				/>
			</div>
			<div class="flex flex-1 flex-col gap-1.5 min-w-0">
				<label for={endId} class={styles.subLabel}>{endLabel}{#if required}<span class="text-danger" aria-hidden="true">*</span>{/if}</label>
				<input
					id={endId}
					type="date"
					bind:value={endDate}
					min={startDate || min}
					{max}
					{required}
					{disabled}
					aria-invalid={hasError || undefined}
					aria-required={required || undefined}
					class={styles.input}
				/>
			</div>
		</div>
	{/if}

	{#if displayError}
		<p id="{fallbackId}-error" class={styles.error} role="alert">
			{displayError}
		</p>
	{/if}
</div>
