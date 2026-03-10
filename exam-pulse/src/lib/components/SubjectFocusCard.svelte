<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} subject                       - Subject name e.g. "Mathematics"
	 * @property {number} testCount                     - Number of tests available
	 * @property {import('svelte').Snippet} [icon]      - Icon snippet rendered in circle
	 * @property {string} [iconBg]                      - Tailwind/CSS bg class for icon circle; defaults to primary tint
	 * @property {string} [iconColor]                   - Tailwind/CSS text class for icon; defaults to primary
	 * @property {() => void} [onclick]
	 */

	/** @type {Props} */
	let { subject, testCount, icon, iconBg = 'bg-(--color-info-surface)', iconColor = 'text-(--color-primary)', onclick } = $props();
</script>

<button
	class="
		flex flex-col items-center justify-center gap-3
		flex-1 min-w-0 py-5 px-3
		bg-(--surface-card) border border-(--color-border) rounded-xl
		cursor-pointer text-center
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:border-(--color-primary) hover:shadow-sm
	"
	{onclick}
>
	<!-- Icon circle -->
	<div class="size-12 rounded-full flex items-center justify-center {iconBg} {iconColor}">
		{#if icon}
			{@render icon()}
		{/if}
	</div>

	<!-- Text -->
	<div class="flex flex-col gap-0.5">
		<p class="text-sm font-semibold text-(--color-text) leading-tight">{subject}</p>
		<p class="text-xs text-(--color-text-muted)">{testCount} Tests</p>
	</div>
</button>
