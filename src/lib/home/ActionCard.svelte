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

	import Button from '$lib/components/Button.svelte';
	import DotPattern from '$lib/components/DotPattern.svelte';

	let { title, subtitle, label, variant = 'primary', icon, onclick } = $props();

	const bgClass = $derived(variant === 'success' ? 'bg-secondary' : 'bg-primary');
</script>

<button
	class={`relative overflow-hidden ${bgClass}
		flex w-full cursor-pointer flex-col
		items-start justify-between rounded-md
		border-none p-5 text-left
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:brightness-105 active:brightness-95`}
	{onclick}
>
	<!-- Background decoration bubbles -->
	<DotPattern />

	<!-- Content (positioned above decoration) -->
	<div class="relative z-10 flex h-full w-full flex-col items-start justify-between">
		<!-- Icon -->
		<div class="mb-3 text-white opacity-90">
			{#if icon}
				{@render icon()}
			{/if}
		</div>

		<!-- Text -->
		<div class="mb-4">
			<p class="text-xl leading-tight font-bold text-white">{title}</p>
			<p class="mt-0.5 text-xs text-white/75">{subtitle}</p>
		</div>

		<!-- Button -->
		<Button
			btnType="custom"
			type="button"
			customClass="w-full text-white bg-white/20 border-white/30 hover:bg-white/30 py-1.5 rounded-md"
			{onclick}
		>
			{label}
		</Button>
	</div>
</button>
