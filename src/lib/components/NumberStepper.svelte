<script>


	let {
		value = 25,
		min = 1,
		max = 100,
		step = 1,
		label = '',
		suffix = '',
		disabled = false,
		onchange = () => {}
	} = $props();


	function clampValue(val) {
		return Math.max(min, Math.min(max, val));
	}

	function handleDecrement() {
		if (disabled || value <= min) return;
		const newValue = clampValue(value - step);
		value = newValue;
		onchange(newValue);
	}

	/**
	 * Handle increment button
	 */
	function handleIncrement() {
		if (disabled || value >= max) return;
		const newValue = clampValue(value + step);
		value = newValue;
		onchange(newValue);
	}

	/**
	 * Handle manual input changes
	 */
	function handleInputChange(e) {
		const inputValue = parseInt(e.target.value, 10);
		if (!isNaN(inputValue)) {
			const newValue = clampValue(inputValue);
			value = newValue;
			onchange(newValue);
		}
	}
</script>

<div class="space-y-2">
	{#if label}
		<div class="text-fg block text-2xs font-medium tracking-wider">
			{label}
		</div>
	{/if}

	<div
		class="border-stroke bg-surface-popover flex items-center justify-between gap-2 rounded-full border px-3 py-1"
	>
		<!-- Decrement Button -->
		<button
			type="button"
			onclick={handleDecrement}
			disabled={disabled || value <= min}
			class="text-primary text-lg font-medium disabled:opacity-40"
			aria-label="Decrease value"
		>
			−
		</button>

		<!-- Numeric Input -->
		<div class="flex items-center gap-1">
			<input
				type="number"
				{value}
				onchange={handleInputChange}
				{min}
				{max}
				{disabled}
				class="text-fg appearance-none border-0 bg-transparent w-10 py-1 text-center text-sm font-semibold outline-none focus:outline-none focus:border-0 focus:ring-0"
			/>
			{#if suffix}
				<span class="text-fg-muted text-xs">{suffix}</span>
			{/if}
		</div>

		<!-- Increment Button -->
		<button
			type="button"
			onclick={handleIncrement}
			disabled={disabled || value >= max}
			class="text-primary text-lg font-medium disabled:opacity-40"
			aria-label="Increase value"
		>
			+
		</button>
	</div>
</div>

<style>
	/* Remove default number input spinners (webkit browsers) */
	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Remove default number input spinners (Firefox) */
	input[type='number'] {
		appearance: textfield;
		-moz-appearance: textfield;
	}
</style>
