<script>
	import { Flag } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';

	let { subject, positiveMarks = 4, negativeMarks = 1, onReportError } = $props();
</script>

<div
	class="flex flex-wrap items-center justify-between gap-2 rounded-t-lg bg-surface-card-subtle px-4 py-3"
>
	<div class="flex items-center gap-3">
		<Badge label={subject} variant="primary" size="sm" />
		<span class="text-sm font-medium text-fg-muted">
			Marks:
			<span class="text-secondary font-semibold">+{positiveMarks}</span>
			<span class="text-danger font-semibold">-{negativeMarks}</span>
		</span>
	</div>

	<button
		type="button"
		class="flex items-center gap-1.5 text-xs font-medium text-fg-muted transition hover:text-fg"
		onclick={onReportError}
	>
		<Flag size={14} class="shrink-0" aria-hidden="true" />
		Report Error
	</button>
</div>
