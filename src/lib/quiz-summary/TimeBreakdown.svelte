<script>
	import { Clock } from '@lucide/svelte';

	
	function formatDuration(totalSeconds) {
		const mins = Math.floor(totalSeconds / 60);
		const secs = totalSeconds % 60;
		return `${mins}m ${secs.toString().padStart(2, '0')}s`;
	}

	let {
		metrics = {
			correctTimeSeconds: 450,
			wrongTimeSeconds: 180,
			unattemptedTimeSeconds: 135
		}
	} = $props();

	const correctFormatted = $derived(formatDuration(metrics.correctTimeSeconds));
	const wrongFormatted = $derived(formatDuration(metrics.wrongTimeSeconds));
	const unattemptedFormatted = $derived(formatDuration(metrics.unattemptedTimeSeconds));
</script>

<div
	class="
		flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6
		p-4 sm:p-6 rounded-xl
		bg-surface-card border border-stroke
		shadow-sm
	"
>
	<!-- Title section (left) - hidden on mobile, show only metrics -->
	<div class="hidden sm:flex flex-col gap-1 min-w-0">
		<div class="flex items-center gap-2">
			<div
				class="flex items-center justify-center size-8 rounded-lg bg-info-surface text-primary shrink-0"
				aria-hidden="true"
			>
				<Clock size={20} />
			</div>
			<h2 class="text-base font-bold text-fg m-0">Time Breakdown</h2>
		</div>
		<p class="text-sm text-fg-muted m-0">
			Detailed view of how you allocated your time across different response types.
		</p>
	</div>

	<!-- Metrics section - three columns on all screen sizes -->
	<div class="flex flex-nowrap items-stretch gap-0 divide-x divide-stroke">
		<div class="flex flex-col gap-1 flex-1 px-4 first:pl-0 last:pr-0 min-w-0">
			<span class="text-2xs font-medium text-fg-muted uppercase tracking-wide whitespace-nowrap">Correct Time</span>
			<span class="text-base font-bold text-fg">{correctFormatted}</span>
		</div>
		<div class="flex flex-col gap-1 flex-1 px-4 first:pl-0 last:pr-0 min-w-0">
			<span class="text-2xs font-medium text-fg-muted uppercase tracking-wide whitespace-nowrap">Wrong Time</span>
			<span class="text-base font-bold text-fg">{wrongFormatted}</span>
		</div>
		<div class="flex flex-col gap-1 flex-1 px-4 first:pl-0 last:pr-0 min-w-0">
			<span class="text-2xs font-medium text-fg-muted uppercase tracking-wide whitespace-nowrap">Unattempted</span>
			<span class="text-base font-bold text-fg">{unattemptedFormatted}</span>
		</div>
	</div>
</div>
