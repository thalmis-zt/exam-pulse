<script>
	/**
	 * StepperInput: quantity selector with minus/plus buttons and editable value.
	 * Pill-shaped container. Value + unit in center. Minus/plus buttons in primary color.
	 *
	 * @typedef {Object} Props
	 * @property {number} [value] - Current value (bindable)
	 * @property {number} [min] - Minimum value
	 * @property {number} [max] - Maximum value
	 * @property {number} [step] - Increment/decrement step
	 * @property {string} [label] - Label above (e.g. "Number of Questions")
	 * @property {string} [unit] - Unit after value (e.g. "Items", "Questions")
	 * @property {boolean} [disabled]
	 * @property {(value: number) => void} [onChange]
	 */

	import { Minus, Plus } from '@lucide/svelte';

	/** @type {Props} */
	let {
		value = $bindable(0),
		min = 0,
		max = 99,
		step = 1,
		label = '',
		unit = '',
		disabled = false,
		onChange
	} = $props();

	let inputStr = $state('');
	let isFocused = $state(false);

	const displayValue = $derived(isFocused ? inputStr : String(value));
	const canDecrement = $derived(!disabled && value > min);
	const canIncrement = $derived(!disabled && value < max);

	function clamp(v) {
		return Math.min(max, Math.max(min, v));
	}

	function handleDecrement() {
		if (!canDecrement) return;
		const next = clamp(value - step);
		value = next;
		onChange?.(next);
	}

	function handleIncrement() {
		if (!canIncrement) return;
		const next = clamp(value + step);
		value = next;
		onChange?.(next);
	}

	function handleInputBlur() {
		const parsed = parseInt(inputStr || String(value), 10);
		if (!Number.isNaN(parsed)) {
			value = clamp(parsed);
			onChange?.(value);
		}
		inputStr = '';
		isFocused = false;
	}

	function handleInputKeydown(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleInputBlur();
			e.target?.blur?.();
		}
	}

	function handleInput(e) {
		const raw = e.target?.value ?? '';
		if (raw === '' || /^\d+$/.test(raw)) {
			inputStr = raw;
		}
	}

	function handleFocus() {
		isFocused = true;
		inputStr = String(value);
	}
</script>

<div class="w-full">
	{#if label}
		<p class="text-fg mb-1 block text-xs font-medium capitalize leading-5 sm:text-xs">
			{label}
		</p>
	{/if}

	<div
		class="
			flex items-center
			rounded-full border border-stroke
			bg-surface-card
			overflow-hidden
			transition duration-(--motion-fast) ease-(--ease-standard)
			focus-within:border-primary focus-within:ring-1 focus-within:ring-primary
			{disabled ? 'opacity-60' : ''}
		"
	>
		<!-- Minus -->
		<button
			type="button"
			class="
				text-primary hover:bg-primary-light flex size-10 shrink-0 items-center justify-center
				transition duration-(--motion-fast) ease-(--ease-standard)
				disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent
			"
			aria-label="Decrease"
			disabled={!canDecrement}
			onclick={handleDecrement}
		>
			<Minus size={20} />
		</button>

		<!-- Value + unit (editable) -->
		<div class="text-fg flex flex-1 items-center justify-center gap-1 py-2">
			<input
				type="text"
				inputmode="numeric"
				pattern="[0-9]*"
				class="
					text-fg w-14 border-none bg-transparent p-0 text-center text-base font-semibold
					outline-none focus:outline-none focus:ring-0 focus:border-none focus:shadow-none
					[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
				"
				value={displayValue}
				{disabled}
				oninput={handleInput}
				onfocus={handleFocus}
				onblur={handleInputBlur}
				onkeydown={handleInputKeydown}
			/>
			{#if unit}
				<span class="text-fg-muted text-sm font-normal">{unit}</span>
			{/if}
		</div>

		<!-- Plus -->
		<button
			type="button"
			class="
				text-primary hover:bg-primary-light flex size-10 shrink-0 items-center justify-center
				transition duration-(--motion-fast) ease-(--ease-standard)
				disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent
			"
			aria-label="Increase"
			disabled={!canIncrement}
			onclick={handleIncrement}
		>
			<Plus size={20} />
		</button>
	</div>
</div>
