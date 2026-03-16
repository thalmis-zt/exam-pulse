<script>
	import { Zap, Target, Star, Trophy, Moon } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import BadgeIcon from '$lib/components/BadgeIcon.svelte';

	/** @type {{ achievement: import('./mock/profile.schema.js').Achievement }} */
	let { achievement } = $props();

	const iconMap = { Zap, Target, Star, Trophy, Moon };

	const iconVariant = $derived(
		achievement.status === 'completed'
			? 'secondary'
			: achievement.status === 'in_progress'
				? 'warning'
				: 'primary'
	);

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

<div class="flex flex-col items-center gap-2 p-3 rounded-md bg-canvas-base text-center">
	<BadgeIcon
		label={achievement.label}
		variant={iconVariant}
		shape="circle"
		size="md"
		class={achievement.status === 'locked' ? 'opacity-50' : ''}
	>
		{#snippet icon()}<IconComponent />{/snippet}
	</BadgeIcon>

	<!-- Status chip via Badge -->
	<Badge label={badgeLabel} variant={badgeVariant} size="sm" />
</div>
