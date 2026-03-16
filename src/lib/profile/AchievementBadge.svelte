<script>
	import { Zap, Target, Star, Trophy, Moon } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';

	/** @type {{ achievement: import('./mock/profile.schema.js').Achievement }} */
	let { achievement } = $props();

	const iconMap = { Zap, Target, Star, Trophy, Moon };

	const iconBgClass = $derived(() => {
		if (achievement.status === 'completed') return 'bg-secondary-light text-secondary';
		if (achievement.status === 'in_progress') return 'bg-warning-surface text-warning';
		return 'bg-canvas text-fg-muted';
	});

	const badgeVariant = $derived(
		achievement.status === 'completed'
			? 'success'
			: achievement.status === 'in_progress'
				? 'warning'
				: 'default'
	);

	const badgeLabel = $derived(
		achievement.status === 'completed'
			? 'Completed'
			: achievement.status === 'in_progress'
				? 'In Progress'
				: 'Locked'
	);

	const IconComponent = $derived(iconMap[achievement.icon] ?? Zap);
</script>

<div class="flex flex-col items-center gap-2 p-3 rounded-xl bg-canvas text-center">
	<!-- Icon circle -->
	<div class="w-12 h-12 rounded-full flex items-center justify-center {iconBgClass()}">
		<IconComponent size={22} />
	</div>

	<!-- Label -->
	<span class="text-xs font-medium text-fg leading-tight">{achievement.label}</span>

	<!-- Status chip via Badge -->
	<Badge label={badgeLabel} variant={badgeVariant} size="sm" />
</div>
