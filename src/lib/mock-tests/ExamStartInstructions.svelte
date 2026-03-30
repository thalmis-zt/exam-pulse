<script>
	import { Timer, Ban, MonitorX, Send, Info, BookOpen } from '@lucide/svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string[]} instructions
	 */

	/** @type {Props} */
	let { instructions } = $props();

	const instructionIcons = [Timer, Ban, MonitorX, Send, Info, BookOpen];
	const instructionColors = [
		{ bg: 'bg-info-surface', text: 'text-info' },
		{ bg: 'bg-danger-surface/40', text: 'text-danger' },
		{ bg: 'bg-warning-surface', text: 'text-warning' },
		{ bg: 'bg-success-surface', text: 'text-success' },
		{ bg: 'bg-info-surface', text: 'text-info' },
		{ bg: 'bg-warning-surface', text: 'text-warning' }
	];
</script>

<section class="flex flex-col gap-3">
	<div class="flex items-center gap-2 px-1">
		<div class="rounded-md bg-danger/20 p-1.5 text-danger" aria-hidden="true">
			<Info size={12} />
		</div>
		<h2 class="m-0 text-xs font-semibold uppercase tracking-wider text-fg">Before you start</h2>
	</div>

	<div class="rounded-lg border border-stroke bg-surface-card shadow-sm">
		{#each instructions as line, i (line)}
			{@const Icon = instructionIcons[i % instructionIcons.length]}
			{@const color = instructionColors[i % instructionColors.length]}
			<div
				class="flex items-start gap-3 px-4 py-3.5 sm:px-5 {i < instructions.length - 1
					? 'border-b border-stroke'
					: ''}"
			>
				<div
					class="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md {color.bg}"
					aria-hidden="true"
				>
					<Icon size={14} class={color.text} />
				</div>
				<p class="m-0 text-sm leading-relaxed text-fg">{line}</p>
			</div>
		{/each}
	</div>
</section>
