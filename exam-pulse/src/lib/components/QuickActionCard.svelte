<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} title                        - Action label e.g. "Quick Quiz"
	 * @property {string} description                  - Short caption e.g. "5-min challenge"
	 * @property {import('svelte').Snippet} [icon]     - Icon snippet
	 * @property {() => void} [onclick]
	 */

	/** @type {Props} */
	let { title, description, icon, onclick } = $props();
</script>

<button
	class="
		flex flex-col items-center justify-center gap-2
		flex-1 min-w-0 py-4 px-2
		bg-(--surface-card) border border-(--color-border) rounded-xl
		cursor-pointer text-center
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:border-(--color-primary) hover:shadow-sm
	"
	{onclick}
>
	<!-- Icon -->
	<div class="text-(--color-primary)">
		{#if icon}
			{@render icon()}
		{/if}
	</div>

	<!-- Text -->
	<div class="flex flex-col gap-0.5">
		<p class="text-sm font-semibold text-(--color-primary) leading-tight">{title}</p>
		<p class="text-xs text-(--color-text-muted) leading-tight">{description}</p>
	</div>
</button>
