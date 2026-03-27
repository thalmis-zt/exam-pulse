<script>
	import { goto } from '$app/navigation';
	import Badge from '$lib/components/Badge.svelte';

	let { exam } = $props();

	const statusVariant = $derived(
		exam.status === 'completed' ? 'success' : 'warning'
	);

	const statusLabel = $derived(
		exam.status === 'completed' ? 'Completed' : 'Pending'
	);
</script>

<button
	class="w-full flex items-center gap-3 px-3 py-3 rounded-md bg-canvas-base text-left hover:bg-stroke/40 transition-colors cursor-pointer border-none"
	aria-label={exam.title}
	onclick={() => {goto(`/tests/${exam.id}/result`)}}
>
	<!-- Score pill -->
	<!-- <div
		class="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold {scoreColor()}"
	>
		{exam.scorePercent !== null ? `${exam.scorePercent}%` : '—'}
	</div> -->

	<!-- Exam details -->
	<div class="flex flex-col gap-0.5 flex-1 min-w-0">
		<span class="text-sm font-semibold text-fg truncate">{exam.title}</span>
		<span class="text-xs text-fg-muted">{exam.subject} • {exam.date}</span>
	</div>
       
	<!-- Status badge -->
	<Badge label={statusLabel} variant={statusVariant} size="xs" />
</button>
