<script>
	import { Clock, BarChart3, Target } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BadgeIcon from '$lib/components/BadgeIcon.svelte';

	const iconMap = { BarChart3, Target };

	function formatTime(totalSeconds) {
		const mins = Math.floor(totalSeconds / 60);
		const secs = totalSeconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	let { subjectName, metrics, timeSeconds, iconName } = $props();

	const timeFormatted = $derived(formatTime(timeSeconds));
	const IconComponent = $derived(iconName && iconMap[iconName] ? iconMap[iconName] : null);
</script>

<div
	class="
		flex flex-col gap-4
		p-4 rounded-xl
		bg-surface-card border border-stroke
		shadow-sm
	"
>
	<!-- Header: BadgeIcon, subject name, time badge -->
	<div class="flex items-center justify-between gap-3 min-w-0">
		<div class="flex items-center gap-2 min-w-0">
			{#if IconComponent}
				<BadgeIcon
					label={subjectName}
					variant="primary"
					shape="square"
					size="sm"
					showLabel={false}
				>
					{#snippet icon()}<IconComponent size={20} />{/snippet}
				</BadgeIcon>
			{/if}
			<h3 class="text-base font-bold text-fg truncate m-0">{subjectName}</h3>
		</div>
		<Badge label={timeFormatted} variant="danger" size="sm">
			{#snippet icon()}<Clock size={14} />{/snippet}
		</Badge>
	</div>

	<!-- Metrics: TOTAL, CORRECT, WRONG -->
	<div class="grid grid-cols-3 gap-2">
		<div
			class="flex flex-col gap-0.5 p-3 rounded-xl bg-surface-card border border-stroke"
		>
			<span class="text-xs font-medium text-fg-muted uppercase tracking-wide whitespace-nowrap">Total</span>
			<span class="text-lg font-bold text-fg">{metrics.total}</span>
		</div>
		<div
			class="flex flex-col gap-0.5 p-3 rounded-xl bg-secondary-light border border-secondary"
		>
			<span class="text-xs font-medium text-secondary uppercase tracking-wide whitespace-nowrap">Correct</span>
			<span class="text-lg font-bold text-secondary">{metrics.correct}</span>
		</div>
		<div
			class="flex flex-col gap-0.5 p-3 rounded-xl bg-danger-surface border border-danger"
		>
			<span class="text-xs font-medium text-danger uppercase tracking-wide whitespace-nowrap">Wrong</span>
			<span class="text-lg font-bold text-danger">{metrics.wrong}</span>
		</div>
	</div>
</div>
