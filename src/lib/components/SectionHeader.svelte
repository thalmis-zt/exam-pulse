<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} title
	 * @property {boolean} [showAll]
	 * @property {() => void} [onViewAll]
	 */

	/** @type {Props} */
	let { title, showAll = false, onViewAll } = $props();
</script>

<div class="flex items-center justify-between mb-3">
	<h2 class="text-base font-bold text-(--color-text)">{title}</h2>
	{#if showAll}
		<button
			onclick={onViewAll}
			class="text-sm font-medium text-(--color-primary) flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
		>
			All ›
		</button>
	{/if}
</div>
