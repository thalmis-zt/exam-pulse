<script>
	import { Calendar, ChevronRight } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	let { card, onPractice } = $props();
</script>

<article
	class="
		bg-surface-card border border-stroke rounded-xl
		px-5 py-3 flex flex-col gap-2 shrink-0 w-64
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:border-primary/50
	"
>
	<div class="flex items-start justify-between gap-2">
		<div class="flex items-center gap-2">
			<Calendar size={18} class="text-primary shrink-0" />
			<span class="text-base font-bold text-fg">{card.year}</span>
		</div>
		{#if card.isNew}
			<span class="text-2xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full"
				>NEW</span
			>
		{/if}
	</div>
	<p class="text-xs text-fg-muted  font-semibold uppercase tracking-wide">{card.examType}</p>
	<div class="flex items-center justify-between gap-2">
		<span class="flex-1 py-2 text-sm font-semibold text-fg">Practice Now</span>
		<IconButton
			icon={ChevronRight}
			ariaLabel="Practice now"
			variant="outline"
			shape="squircle"
			size="md"
			onclick={() => onPractice?.()}
		/>
	</div>
</article>
