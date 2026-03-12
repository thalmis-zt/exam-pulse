<script>
	import { CheckCircle } from '@lucide/svelte';

	let { tips } = $props();
</script>

<!-- Learning Tips Section -->
<section class="bg-surface-card flex flex-col gap-4 rounded-lg p-4 shadow-sm sm:p-6">
	<!-- Section Header -->
	<div>
		<h2 class="text-fg-muted font-inter text-xs font-bold tracking-wide uppercase md:text-sm">
			Learning Tip
		</h2>
	</div>

	<!-- Tips List -->
	{#if tips && tips.items && tips.items.length > 0}
		<div class="flex flex-col gap-2 md:gap-4">
			{#each tips.items as tip, index (tip.id)}
				<!-- Icon -->
				<div class="flex items-start gap-2">
					<CheckCircle size={14} class="text-success mt-1 flex-shrink-0" />

					<!-- Content -->
					<p class="text-fg font-poppins text-sm">
						{tip.content}
					</p>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-fg-muted font-poppins py-4 text-sm">No tips available right now.</p>
	{/if}
</section>
