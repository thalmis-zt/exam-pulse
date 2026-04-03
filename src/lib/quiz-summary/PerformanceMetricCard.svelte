<script>
	import BadgeIcon from '$lib/components/BadgeIcon.svelte';

	let { label, score, total, icon, variant = 'primary', badgeClass = '' } = $props();

	const valueText = $derived(`${score}/${total}`);
</script>

<div
	class="
		flex items-center gap-3
		p-4 rounded-xl
		bg-surface-card border border-stroke
		shadow-sm
	"
>
	{#if icon}
		<BadgeIcon
			label={label}
			variant={variant}
			shape="square"
			size="sm"
			class={badgeClass}
			icon={icon}
			showLabel={false}
		/>
	{/if}
	<div class="flex flex-col gap-0.5 min-w-0">
		<span class="text-2xs font-medium text-fg-muted uppercase tracking-wide">{label}</span>
		<span class="text-base font-bold text-fg leading-tight">{valueText}</span>
	</div>
</div>
