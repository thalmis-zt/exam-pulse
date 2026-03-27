<script>

	import { Minus, Plus } from '@lucide/svelte';

	let {
		value = $bindable(0),
		min = 0,
		max = 99,
		step = 1,
		title = '',
		required = false,
		label = '',
		unit = '',
		disabled = false,
		onChange,
		class: className = ''
	} = $props();

	const titleId = `stepper-label-${crypto.randomUUID()}`;
	const headingText = $derived((title || label).trim());

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
	<p class="text-fg mb-2 block text-xs font-medium leading-5">
			{label}{#if required}<span class="text-danger ml-0.5">*</span>{/if}
		</p>
	{/if}

	<div
		role="group"
		aria-labelledby={headingText ? titleId : undefined}
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
					text-fg w-14 border-none bg-transparent p-0 text-center text-sm font-semibold
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
