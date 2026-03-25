<script>
	import { Play, Sparkles } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	let { onStartPractice } = $props();
</script>

<div class="flex flex-col gap-4 p-5 md:p-6 rounded-md shadow-sm" style="background: linear-gradient(135deg, var(--color-surface-card) 0%, var(--color-stroke) 100%);">
	<!-- Icon + Header -->
	<div class="flex items-center gap-3">
		<div class="flex items-center justify-center w-10 h-10 rounded-md bg-fg/10">
			<Sparkles size={12} class="text-fg-muted" />
		</div>
		<h3 class="text-base font-bold text-fg font-inter">Practice from mistakes?</h3>
	</div>

	<!-- Description -->
	<p class="text-sm text-fg-muted font-poppins leading-relaxed">
		Create a custom practice quiz from your mistakes to strengthen weak areas.
	</p>

	<!-- CTA Button -->
	<Button btnType="black" onclick={onStartPractice}>
		<Play size={14} />
		Start Practice
	</Button>
</div>
