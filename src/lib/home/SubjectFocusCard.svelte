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

	import Button from '$lib/components/Button.svelte';
	import { ChevronRight } from '@lucide/svelte';

	let { subject, testCount, icon, iconBg = 'bg-info-surface', iconColor = 'text-primary', onclick } = $props();
</script>

<Button
	btnType="custom"
	type="button"
	customClass="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between md:items-center flex-1 min-w-0 py-5 px-3 md:px-4 md:py-4 bg-surface-card border border-stroke rounded-md text-center md:text-left hover:border-primary hover:shadow-sm"
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

	<ChevronRight class="hidden md:block size-4 text-fg-muted shrink-0" />
</Button>
