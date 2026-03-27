<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} title                        - Action label e.g. "Quick Quiz"
	 * @property {string} description                  - Short caption e.g. "5-min challenge"
	 * @property {import('svelte').Snippet} [icon]     - Icon snippet
	 * @property {() => void} [onclick]
	 */

	import Button from '$lib/components/Button.svelte';

	/** @type {Props} */
	let { title, description, icon, onclick } = $props();
</script>

<Button
	btnType="custom"
	type="button"
	customClass="flex flex-col items-center justify-center gap-2 flex-1 min-w-0 py-4 px-2 bg-surface-card border border-stroke rounded-xl text-center hover:border-primary hover:shadow-sm"
	{onclick}
>
	<!-- Icon -->
	<div class="text-primary mb-1">
		{#if icon}
			{@render icon()}
		{/if}
	</div>

	<!-- Text -->
	<div class="flex flex-col gap-0.5">
		<p class="text-sm font-semibold text-primary leading-tight">{title}</p>
		<p class="text-xs text-fg-muted leading-tight">{description}</p>
	</div>
</Button>
