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
	let { subject, testCount, icon, iconBg = 'bg-info-surface', iconColor = 'text-primary', onclick } = $props();
</script>

<button
	class="
		flex flex-col items-center justify-center gap-3
		md:flex-row md:justify-between md:items-center
		flex-1 min-w-0 py-5 px-3 md:px-4 md:py-4
		bg-surface-card border border-stroke rounded-xl
		cursor-pointer text-center md:text-left
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:border-primary hover:shadow-sm
	"
	{onclick}
>
	<!-- Icon + text group -->
	<div class="flex flex-col items-center gap-3 md:flex-row md:items-center">
		<!-- Icon circle -->
		<div class="size-12 rounded-full flex items-center justify-center shrink-0 {iconBg} {iconColor}">
			{#if icon}
				{@render icon()}
			{/if}
		</div>

		<!-- Text -->
		<div class="flex flex-col gap-0.5">
			<p class="text-sm font-semibold text-fg leading-tight">{subject}</p>
			<p class="text-xs text-fg-muted">{testCount} Tests</p>
		</div>
	</div>

	<!-- Chevron (md+ only) -->
	<svg
		class="hidden md:block size-4 text-fg-muted shrink-0"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width="2"
		stroke="currentColor"
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
	</svg>
</button>
