<script>
	import { Check } from '@lucide/svelte';
	let { label, text, selected = false, onclick } = $props();
</script>

<button
	type="button"
	class="flex w-full items-center gap-4 rounded-xl border-2 px-4 py-4 text-left transition duration-motion-fast ease-ease-standard {selected
		? 'border-primary bg-primary-light text-primary'
		: 'border-stroke bg-surface-card text-fg hover:border-primary/50'}"
	onclick={onclick}
>
	<!-- Letter circle -->
	<span
		class="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold {selected
			? 'bg-primary text-canvas-base-fixed'
			: 'bg-stroke/50 text-fg-muted'}"
	>
		{label}
	</span>

	<!-- Option text -->
	<span class="min-w-0 flex-1 font-medium">{text}</span>

	<!-- Checkmark when selected -->
	{#if selected}
		<Check size={20} class="shrink-0" aria-hidden="true" />
	{/if}
</button>
