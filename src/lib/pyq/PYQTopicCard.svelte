<script>
	import { Play, Download } from '@lucide/svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('./mock/pyq.schema.js').PYQTopic} topic
	 * @property {() => void} [onStart]
	 * @property {() => void} [onPdf]
	 */

	/** @type {Props} */
	let { topic, onStart, onPdf } = $props();
</script>

<!-- Compact card: topic + count + icon actions. No years. -->
<div
	class="
		bg-surface-card border border-stroke rounded-xl
		px-4 py-3 flex flex-col gap-2
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:border-primary/50
	"
>
	<!-- Row 1: Topic name + question count + icon buttons (right-aligned) -->
	<div class="flex items-center justify-between gap-2 min-w-0">
		<div class="flex flex-col min-w-0">
			<h3 class="text-sm font-semibold text-fg truncate">{topic.name}</h3>
			<span class="text-xs font-medium text-primary">{topic.questionCount} Questions</span>
		</div>
		<div class="flex items-center gap-1.5 shrink-0">
			<IconButton
				icon={Play}
				ariaLabel="Start practice"
				variant="outline"
				size="sm"
				onclick={() => onStart?.()}
			/>
			<IconButton
				icon={Download}
				ariaLabel="Download PDF"
				variant="outline"
				size="sm"
				onclick={() => onPdf?.()}
			/>
		</div>
	</div>
</div>
