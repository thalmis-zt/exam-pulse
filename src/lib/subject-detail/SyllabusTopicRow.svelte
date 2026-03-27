<script>
	import { FileText, Play, CircleCheck } from '@lucide/svelte';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	/**
	 * @type {{
	 *   topic: import('./mock/subject-detail.schema.js').SyllabusTopic,
	 *   onViewPyq?: () => void,
	 *   onPractice?: () => void,
	 *   standalone?: boolean
	 * }}
	 */
	let { topic, onViewPyq = () => {}, onPractice = () => {}, standalone = false } = $props();

	const pct = $derived(topic.percentCovered);
	const isStrong = $derived(pct >= 80);
	const barVariant = $derived(/** @type {'primary' | 'success'} */ (isStrong ? 'success' : 'primary'));
</script>

<div
	class="
		flex flex-col gap-4 py-4 px-1 sm:px-2
		{standalone ? '' : 'border-b border-stroke last:border-b-0'}
		lg:flex-row lg:items-center lg:gap-6 lg:py-5
	"
>
	<!-- Left: module title + progress + stats -->
	<div class="flex flex-1 flex-col gap-3 min-w-0">
		<div class="flex items-center gap-2 min-w-0">
			{#if isStrong}
				<span class="text-secondary shrink-0" aria-hidden="true" title="On track">
					<CircleCheck size={18} strokeWidth={2.5} />
				</span>
			{/if}
			<span class="text-sm font-bold text-fg leading-snug">{topic.name}</span>
		</div>

		<div class="flex flex-col gap-2 min-w-0 sm:flex-row sm:items-center sm:gap-3">
			<div class="min-w-0 flex-1">
				<ProgressBar
					value={pct}
					size="sm"
					variantOverride={barVariant}
					ariaLabel="Coverage for {topic.name}"
				/>
			</div>
			<p class="text-xs text-fg-muted m-0 shrink-0 sm:text-right">
				{pct}% Covered <span class="text-fg-muted/80" aria-hidden="true">•</span>
				{topic.questionCount} Qs
			</p>
		</div>
	</div>

	<!-- Right: icon actions  -->
	<div class="flex flex-wrap items-center justify-end gap-1.5 shrink-0">
		<IconButton
			icon={FileText}
			ariaLabel="View PYQs for {topic.name}"
			variant="outline"
			size="md"
			onclick={onViewPyq}
		/>
		<IconButton
			icon={Play}
			ariaLabel="Practice {topic.name}"
			variant="outline"
			size="md"
			onclick={onPractice}
			class="
				!border-primary !bg-primary !text-canvas-base-fixed
				hover:!bg-primary-hover hover:!border-primary-hover
				focus:!ring-primary [&_svg]:!text-canvas-base-fixed
			"
		/>
	</div>
</div>
