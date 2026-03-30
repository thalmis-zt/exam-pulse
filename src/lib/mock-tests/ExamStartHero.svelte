<script>
	import {
		BookOpen,
		Zap,
		Clock,
		ClipboardCheck,
		PenLine,
		CheckCircle2
	} from '@lucide/svelte';
	import DotPattern from '$lib/components/DotPattern.svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} title
	 * @property {string} [description]
	 * @property {string} [format]
	 * @property {string} xp
	 */

	/** @type {Props} */
	let { title, description, format, xp } = $props();
</script>

<div
	class="relative flex flex-col overflow-hidden rounded-xl bg-primary px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8"
>
	<DotPattern />

	<!-- Left: text content -->
	<div class="relative z-10 flex flex-col gap-4 sm:max-w-[60%]">
		{#if format}
			<span
				class="inline-flex w-fit items-center gap-1.5 rounded-full bg-canvas-base-fixed/20 px-3 py-1 text-xs font-medium text-canvas-base-fixed/90"
			>
				<BookOpen size={13} aria-hidden="true" />
				{format}
			</span>
		{/if}

		<div class="flex flex-col gap-1.5">
			<h1 class="m-0 text-xl font-bold leading-snug text-canvas-base-fixed sm:text-2xl">
				{title}
			</h1>
			{#if description}
				<p class="m-0 text-sm leading-relaxed text-canvas-base-fixed/80">
					{description}
				</p>
			{/if}
		</div>

		<div class="flex items-center gap-2">
			<span
				class="inline-flex items-center gap-1.5 rounded-full bg-canvas-base-fixed/20 px-3 py-1 text-sm font-bold text-canvas-base-fixed"
			>
				<Zap size={14} class="fill-canvas-base-fixed" aria-hidden="true" />
				{xp}
			</span>
		</div>
	</div>

	<!-- Right: decorative illustration (hidden on mobile) -->
	<div
		class="relative z-10 hidden h-40 w-52 shrink-0 items-center justify-center sm:flex"
		aria-hidden="true"
	>
		<div class="absolute top-2 left-4 size-28 rounded-full bg-canvas-base-fixed/10 blur-xl"></div>
		<div class="absolute right-2 bottom-4 size-20 rounded-full bg-canvas-base-fixed/5 blur-lg"></div>

		<div class="relative flex size-20 items-center justify-center rounded-2xl bg-canvas-base-fixed/15">
			<ClipboardCheck size={40} class="text-canvas-base-fixed/90" strokeWidth={1.5} />
		</div>

		<div class="absolute top-2 right-6 flex size-9 items-center justify-center rounded-xl bg-canvas-base-fixed/15">
			<Clock size={18} class="text-canvas-base-fixed/80" strokeWidth={1.5} />
		</div>
		<div class="absolute bottom-2 left-6 flex size-9 items-center justify-center rounded-xl bg-canvas-base-fixed/15">
			<PenLine size={18} class="text-canvas-base-fixed/80" strokeWidth={1.5} />
		</div>
		<div class="absolute top-6 left-2 flex size-7 items-center justify-center rounded-lg bg-canvas-base-fixed/10">
			<CheckCircle2 size={14} class="text-canvas-base-fixed/70" strokeWidth={2} />
		</div>
		<div class="absolute right-0 bottom-8 flex size-7 items-center justify-center rounded-lg bg-canvas-base-fixed/10">
			<Zap size={14} class="text-canvas-base-fixed/70" strokeWidth={2} />
		</div>
	</div>
</div>
