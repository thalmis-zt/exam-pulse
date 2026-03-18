<script>
	import { Trophy } from '@lucide/svelte';

	let { title = '', subtitle = '' } = $props();
</script>

<!-- Pro Tip Card -->
<div class="border-stroke flex flex-row items-start gap-4 rounded-md bg-canvas border border-dashed p-4 sm:p-6 shadow-sm">
	<!-- Icon badge -->
	<div class="bg-warning-surface flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
		<Trophy size={20} class="text-warning" />
	</div>

	<!-- Content -->
	<div class="flex flex-col gap-2">
		<!-- Title -->
		<h3 class="text-fg font-inter text-sm font-bold text-left">
			Pro Tip!
		</h3>

		<!-- Subtitle/Content -->
		<p class="text-fg-muted font-poppins text-xs leading-relaxed text-left">
			{subtitle}
		</p>
	</div>
</div>
