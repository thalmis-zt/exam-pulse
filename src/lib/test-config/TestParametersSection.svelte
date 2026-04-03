<script>
	import { SlidersHorizontal } from '@lucide/svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let {
		questionCount = $bindable('25'),
		duration = $bindable('60')
	} = $props();
</script>

<section class="px-6 py-6 md:px-8">
	<div class="mb-5 flex items-center gap-2">
		<SlidersHorizontal size={15} class="text-fg-muted" />
		<span class="text-fg text-sm font-semibold">Test Parameters</span>
	</div>
	<div class="grid grid-cols-1 450px:grid-cols-2 gap-2 sm:gap-3">
		<TextInput
			label="Questions"
			type="number"
			bind:value={questionCount}
			min="1"
			placeholder="e.g. 25"
		/>
		<TextInput
			label="Duration (min)"
			type="number"
			bind:value={duration}
			min="1"
			placeholder="e.g. 60"
		/>
	</div>
</section>
