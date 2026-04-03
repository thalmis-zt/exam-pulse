<script>
	import { Clock } from '@lucide/svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} time - Display time string (e.g., "2:28:45", "0:45")
	 * @property {'danger'|'default'} [variant='danger'] - Visual variant (danger = red tint for countdown)
	 * @property {string} [label=''] - Optional label shown before the time (e.g. "Time Spent")
	 */

	let { time = '0:00', variant = 'danger', size = 'md', label = '' } = $props();

	const ariaLabel = $derived(
		label ? `${label}: ${time}` : `Time remaining: ${time}`
	);

	const variantClasses = {
		danger: 'bg-danger-surface text-danger border-danger/30',
		default: 'bg-surface-card text-fg border-stroke'
	};

	const sizeClasses = {
		sm: 'gap-1 px-2 py-1 text-xs',
		md: 'gap-1.5 px-3 py-1.5 text-sm'
	};
	const iconSizes = { sm: 14, md: 16 };
</script>

<span
	class="inline-flex items-center rounded-full border font-semibold {variantClasses[variant]} {sizeClasses[size] || sizeClasses.md}"
	aria-label={ariaLabel}
>
	<Clock size={iconSizes[size] || 16} class="shrink-0" aria-hidden="true" />
	{#if label}
		<span class="shrink-0 font-medium">{label}:</span>
	{/if}
	<span class="tabular-nums">{time}</span>
</span>
