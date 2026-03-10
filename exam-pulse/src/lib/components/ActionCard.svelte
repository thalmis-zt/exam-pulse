<script>
	/**
	 * @typedef {'primary' | 'success'} Variant
	 *
	 * @typedef {Object} Props
	 * @property {string}   title      - Bold heading e.g. "Practice"
	 * @property {string}   subtitle   - Small description below title
	 * @property {string}   label      - Button text
	 * @property {Variant}  [variant]  - 'primary' = blue card | 'success' = green card
	 * @property {import('svelte').Snippet} [icon] - Icon snippet rendered at top
	 * @property {() => void} [onclick]
	 */

	/** @type {Props} */
	let { title, subtitle, label, variant = 'primary', icon, onclick } = $props();

	const bgClass = $derived(variant === 'success' ? 'bg-(--color-secondary)' : 'bg-(--color-primary)');
</script>

<button
	class={`${bgClass}
		flex flex-col items-start justify-between
		w-full p-5 rounded-xl
		cursor-pointer border-none text-left
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:brightness-105 active:brightness-95`}
	{onclick}
>
	<!-- Icon -->
	<div class="mb-3 text-white opacity-90">
		{#if icon}
			{@render icon()}
		{/if}
	</div>

	<!-- Text -->
	<div class="mb-4">
		<p class="text-xl font-bold text-white leading-tight">{title}</p>
		<p class="text-xs text-white/75 mt-0.5">{subtitle}</p>
	</div>

	<!-- Button -->
	<span
		class="
			inline-flex items-center justify-center
			w-full py-2 rounded-full
			bg-white/20 text-white text-sm font-semibold
			border border-white/30
		"
	>
		{label}
	</span>
</button>
