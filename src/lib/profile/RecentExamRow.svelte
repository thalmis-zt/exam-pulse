<script>
	import Badge from '$lib/components/Badge.svelte';

	/** @type {{ exam: import('./mock/profile.schema.js').RecentExam }} */
	let { exam } = $props();

	const scoreColor = $derived(() => {
		if (exam.scorePercent === null) return 'bg-canvas text-fg-muted';
		if (exam.scorePercent >= 80) return 'bg-secondary-light text-secondary';
		if (exam.scorePercent >= 60) return 'bg-warning-surface text-warning';
		return 'bg-danger-surface text-danger';
	});

	const statusVariant = $derived(
		exam.status === 'completed' ? 'success' : 'warning'
	);

	const statusLabel = $derived(
		exam.status === 'completed' ? 'Completed' : 'Pending'
	);
</script>

<div class="flex items-center gap-3 px-3 py-3 rounded-lg bg-canvas">
	<!-- Score pill -->
	<div
		class="shrink-0 w-11 h-11 rounded-lg flex items-center justify-center text-sm font-bold {scoreColor()}"
	>
		{exam.scorePercent !== null ? `${exam.scorePercent}%` : '—'}
	</div>

	<!-- Exam details -->
	<div class="flex flex-col gap-0.5 flex-1 min-w-0">
		<span class="text-sm font-semibold text-fg truncate">{exam.title}</span>
		<span class="text-xs text-fg-muted">{exam.subject} • {exam.date}</span>
	</div>

	<!-- Status badge -->
	<Badge label={statusLabel} variant={statusVariant} size="sm" />
</div>
