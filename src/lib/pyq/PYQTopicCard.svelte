<script>
	import { Play, Download } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {import('./mock/pyq.schema.js').PYQTopic} topic
	 * @property {() => void} [onStart]
	 * @property {() => void} [onPdf]
	 */

	/** @type {Props} */
	let { topic, onStart, onPdf } = $props();
</script>

<!-- Compact card: topic + count + actions. No years. -->
<div
	class="
		bg-surface-card border border-stroke rounded-xl
		px-4 py-3 flex flex-col gap-3
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:border-primary/50
	"
>
	<!-- Row 1: Topic name + question count -->
	<div class="flex items-center justify-between gap-2">
		<h3 class="text-sm font-semibold text-fg truncate">{topic.name}</h3>
		<span class="text-xs font-medium text-primary shrink-0">{topic.questionCount} Questions</span>
	</div>

	<!-- Row 2: Actions (compact) - icon+text grouped per button -->
	<div class="flex gap-2 min-w-0">
		<Button btnType="primary" onclick={() => onStart?.()} customClass="flex-1 min-w-0 py-2 text-xs">
			<span class="inline-flex items-center justify-center gap-1.5">
				<Play size={12} class="shrink-0" />
				Start
			</span>
		</Button>
		<Button btnType="primaryLight" onclick={() => onPdf?.()} customClass="flex-1 min-w-0 py-2 text-xs">
			<span class="inline-flex items-center justify-center gap-1.5">
				<Download size={12} class="shrink-0" />
				PDF
			</span>
		</Button>
	</div>
</div>
