<script>
	import { Zap, CheckCircle2 } from '@lucide/svelte';
    import Button from '$lib/components/Button.svelte';

	let { subject, accuracy, timePerQuestion, correctCount, lastPracticed, description, onclick } = $props();
</script>

<div class="flex flex-col gap-3 p-4 rounded-md bg-surface-card border border-success-surface shadow-sm">
<div class="mb-3">
	<h3 class="text-base font-bold text-fg font-Inter">{subject || 'N/A'}</h3>
	<p class="text-xs text-fg-muted font-Poppins">
		Accuracy {accuracy || '-'}% &nbsp; | &nbsp; {timePerQuestion || '-'}s/q
	</p>
</div>

	<!-- Badges row: Correct count + Last practiced -->
	<div class="flex items-center justify-between bg-surface-card-subtle py-1.5 px-2 rounded-md">
		<div class="flex items-center gap-1">
			<CheckCircle2 size={14} class="text-success" />
			<span class="text-xs font-medium text-fg font-Inter">{correctCount || '-'} Correct</span>
		</div>
		<span class="text-xs italic text-fg-muted font-Poppins">{lastPracticed || '-'}</span>
	</div>

    <div class="w-full">
	<!-- CTA Button -->
	<Button
        btnType="secondary"
        customClass="w-full justify-center"
		on:click={onclick}
	>
		<Zap size={16} class="text-fg" />
		<span>Advanced Practice</span>
	</Button>

	<!-- Description -->
	<p class="text-xs text-fg-muted mt-2 text-center font-Poppins">{description}</p>
    </div>
</div>
