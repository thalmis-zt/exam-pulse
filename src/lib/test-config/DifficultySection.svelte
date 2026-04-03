<script>
	import { Layers, LayoutList } from '@lucide/svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let {
		easyPct = $bindable('30'),
		moderatePct = $bindable('40'),
		hardPct = $bindable('30')
	} = $props();

	const pctTotal = $derived(toPct(easyPct) + toPct(moderatePct) + toPct(hardPct));
	const pctValid = $derived(pctTotal === 100);

	function toPct(val) {
		const n = parseInt(val);
		return isNaN(n) || n < 0 ? 0 : n > 100 ? 100 : n;
	}

	function handleAutoBalance() {
		easyPct = '33';
		moderatePct = '34';
		hardPct = '33';
	}
</script>

<section class="px-6 py-6 md:px-8">
	<!-- Header -->
	<div class="mb-5 flex flex-wrap items-center justify-between gap-2">
		<div class="flex items-center gap-2">
			<Layers size={15} class="text-fg-muted" />
			<span class="text-fg text-sm font-semibold">Difficulty Allocation (%)</span>
		</div>
		<button
			type="button"
			onclick={handleAutoBalance}
			class="border-stroke text-fg-muted hover:text-fg flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors"
		>
			<LayoutList size={12} />
			Auto-balance
		</button>
	</div>

	<!-- Three columns -->
	<div class="grid grid-cols-1 450px:grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
		<TextInput label="Easy" type="number" min="0" max="100" placeholder="0" bind:value={easyPct} />
		<TextInput label="Medium" type="number" min="0" max="100" placeholder="0" bind:value={moderatePct} />
		<TextInput label="Hard" type="number" min="0" max="100" placeholder="0" bind:value={hardPct} />
	</div>

	<!-- Footer - Single line visual distribution -->
	<div class="mt-4 flex items-center justify-between gap-3">
		<!-- Visual distribution bar -->
		<div class="flex-1 flex items-center gap-0.5 h-2 rounded-full overflow-hidden bg-surface-hover">
			<div class="h-full bg-emerald-500" style="width: {toPct(easyPct)}%"></div>
			<div class="h-full bg-amber-500" style="width: {toPct(moderatePct)}%"></div>
			<div class="h-full bg-red-500" style="width: {toPct(hardPct)}%"></div>
			{#if pctTotal < 100}
				<div class="h-full bg-gray-300 dark:bg-gray-600" style="width: {100 - pctTotal}%"></div>
			{/if}
		</div>
		
		<!-- Total badge -->
		<span class={`text-xs font-semibold tabular-nums whitespace-nowrap ${pctValid ? ' text-green-700 dark:bg-green-900/40 dark:text-green-300' : 'bg-surface-hover text-fg-muted'}`}>
			{pctTotal}%
		</span>
	</div>
</section>
