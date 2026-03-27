<script>
	/**
	 * @type {{
	 *   value: string | number,
	 *   label: string,
	 *   icon?: import('svelte').Snippet,
	 *   class?: string
	 * }}
	 */
	let { value, label, icon, class: className = '' } = $props();
</script>

<div class="flex flex-col gap-0.5 p-3 rounded-lg bg-canvas {className}">
	{#if icon}
		<span class="text-fg-muted mb-1 [&_svg]:size-4">{@render icon()}</span>
	{/if}
	<span class="text-sm font-bold text-fg">{value}</span>
	<span class="text-2xs text-fg-muted uppercase tracking-wide">{label}</span>
</div>
