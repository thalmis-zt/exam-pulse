<script>
	import { Lightbulb } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	let { recommendation = 'Based on your saved questions, consider revising core concepts to strengthen your foundation.', onExplore } = $props();
</script>

<!-- Study Recommendation CTA Card -->
<section
	class="border-stroke-strong flex flex-col items-center gap-4 rounded-md bg-canvas border border-dashed p-6 text-center md:p-8 shadow-sm"
>
	<!-- Icon badge -->
	<div class="bg-stroke flex h-12 w-12 items-center justify-center rounded-full">
		<Lightbulb size={24} class="text-fg" />
	</div>

	<!-- Title -->
	<h3 class="text-base font-bold text-fg font-inter">Study Recommendation</h3>

	<!-- Recommendation Text -->
	<p class="text-fg-muted font-poppins max-w-sm text-sm">
		{recommendation}
	</p>

	<!-- CTA Button -->
	<Button btnType="primaryLight" onclick={onExplore}>
		Explore Content
	</Button>
</section>
