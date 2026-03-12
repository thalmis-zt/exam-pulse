<script>
	import { Brain } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	let { onclick } = $props();
</script>

<!-- Mistake Log CTA Card -->
<section
	class="border-stroke-strong flex flex-col items-center gap-4 rounded-md bg-surface-card/60 border border-dashed p-6 text-center md:p-8 shadow"
>
	<!-- Icon badge -->
	<div class="bg-info/10 flex h-12 w-12 items-center justify-center rounded-full">
		<Brain size={24} class="text-info" />
	</div>

	<!-- Title -->
	<h3 class="text-fg font-Inter text-base font-bold">Mistake Log</h3>

	<!-- Description -->
	<p class="text-fg-muted font-Poppins max-w-sm text-sm">
		Try reviewing your mistake log of wrong/unattempted question for improving your score.
	</p>

	<!-- CTA Button -->
	<Button btnType="secondary" {onclick}>Review Mistake Log</Button>
</section>
