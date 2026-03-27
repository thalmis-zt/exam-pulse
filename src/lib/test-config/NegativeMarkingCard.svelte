<script>
	import { Minus } from '@lucide/svelte';
	import Toggle from '$lib/components/Toggle.svelte';

	let {
		isEnabled = $bindable(false),
		deductionAmount = $bindable(0.25),
		onToggle = () => {}
	} = $props();

	function handleInputChange(e) {
		const value = parseFloat(e.target.value);
		deductionAmount = isNaN(value) ? 0 : value;
	}
</script>

<div class="space-y-2">
	<div
		class="bg-surface-card border-stroke flex items-center justify-between gap-4 rounded-md border p-4"
	>
		<div class="flex items-center gap-3">
			<div class="bg-danger-surface text-danger rounded-full p-2">
				<Minus size={12} />
			</div>
			<div>
				<span class="text-fg mb-2 block text-xs font-medium leading-5">Negative Marking</span>

				<!-- <p class="text-fg text-sm font-semibold">Deduct Marks</p> -->
				<div class="flex items-center gap-1">
					<span class="text-fg-muted text-xs">-</span>
					<input
						type="number"
						step="0.25"
						min="0"
						value={deductionAmount}
						oninput={handleInputChange}
						class="text-fg-muted focus:ring-primary border-stroke hover:border-fg-muted w-12 rounded border-b bg-transparent px-0.5 text-xs font-medium transition-colors focus:ring-1 focus:outline-none"
					/>
					<span class="text-fg-muted text-xs">per wrong answer</span>
				</div>
			</div>
		</div>

		<Toggle
			bind:checked={isEnabled}
			onToggle={onToggle}
			size="md"
			variant="primary"
			ariaLabel="Enable negative marking"
		/>
	</div>
</div>
