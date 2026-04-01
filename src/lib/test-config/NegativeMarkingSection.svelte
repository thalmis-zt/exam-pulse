<script>
	import { CircleMinus } from '@lucide/svelte';
	import Toggle from '$lib/components/Toggle.svelte';

	let {
		enableNegativeMarking = $bindable(false),
		negativeMarkingDeduction = $bindable(0.00)
	} = $props();

	const DEDUCTION_MIN = 0.00;
	const DEDUCTION_MAX = 4.0;
	const DEDUCTION_STEP = 0.25;
</script>

<section class="px-6 py-6 md:px-8">
	<div class="mb-5 flex items-center gap-2">
		<CircleMinus size={15} class="text-fg-muted" />
		<span class="text-fg text-sm font-semibold">Negative Marking</span>
	</div>
	<div class="flex items-center gap-2.5">
		<Toggle
			bind:checked={enableNegativeMarking}
			size="sm"
			variant="primary"
			ariaLabel="Enable negative marking"
		/>
		<span class="text-fg-muted text-xs">Deduct marks for wrong answers</span>
		{#if enableNegativeMarking}
			<div class="border-stroke flex items-center overflow-hidden rounded-lg border">
				<button
					type="button"
					disabled={negativeMarkingDeduction <= DEDUCTION_MIN}
					onclick={() => (negativeMarkingDeduction = Math.max(DEDUCTION_MIN, +(negativeMarkingDeduction - DEDUCTION_STEP).toFixed(2)))}
					class="text-fg-muted hover:bg-surface-hover hover:text-fg disabled:opacity-30 px-3 py-1 text-sm font-semibold transition-colors"
				>−</button>
				<span class="text-fg border-stroke min-w-12 border-x py-1 text-center text-sm font-semibold tabular-nums">
					{negativeMarkingDeduction.toFixed(2)}
				</span>
				<button
					type="button"
					disabled={negativeMarkingDeduction >= DEDUCTION_MAX}
					onclick={() => (negativeMarkingDeduction = Math.min(DEDUCTION_MAX, +(negativeMarkingDeduction + DEDUCTION_STEP).toFixed(2)))}
					class="text-fg-muted hover:bg-surface-hover hover:text-fg disabled:opacity-30 px-3 py-1 text-sm font-semibold transition-colors"
				>+</button>
			</div>
		{/if}
	</div>
</section>
