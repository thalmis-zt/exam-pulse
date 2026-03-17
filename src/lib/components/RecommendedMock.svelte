<script>
	import { Clock, Zap } from '@lucide/svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} title                                        - Test title
	 * @property {string} duration                                     - e.g. "45 mins"
	 * @property {string|number} xp                                    - XP reward, e.g. 450
	 * @property {'primary'|'secondary'|'orange'|'red'} [variant]     - Gradient color theme
	 * @property {() => void} [onclick]
	 */

	/** @type {Props} */
	let { title, duration, xp, variant = 'primary', onclick } = $props();

	/*
	 * Gradients use only semantic tokens.
	 * Where the design system only defines one token per role (warning, danger),
	 * color-mix() derives a lighter start stop from that same semantic token.
	 */
	const gradients = {
		primary: 'linear-gradient(135deg, var(--color-info) 0%, var(--color-primary-hover) 100%)',
		secondary:
			'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-secondary-hover) 100%)',
		orange:
			'linear-gradient(135deg, color-mix(in srgb, var(--color-warning) 60%, white) 0%, var(--color-warning) 100%)',
		red: 'linear-gradient(135deg, color-mix(in srgb, var(--color-danger) 60%, white) 0%, var(--color-danger) 100%)'
	};

	/* Button text colour matches the semantic role of the variant. */
	const btnTextColor = {
		primary: 'var(--color-primary)',
		secondary: 'var(--color-secondary)',
		orange: 'var(--color-warning)',
		red: 'var(--color-danger)'
	};

	/*
	 * Zap icon is always white (canvas-base-fixed) — it sits on a saturated
	 * gradient surface so white provides the best contrast on every variant.
	 */
	const zapColor = 'var(--color-canvas-base-fixed)';
</script>

<article
	style="background: {gradients[variant]}"
	class="
		flex h-full min-h-44
		flex-col
		justify-between overflow-hidden rounded-2xl
		px-5 py-5
		transition duration-(--motion-fast) ease-(--ease-standard)
		hover:shadow-xl
	"
>
	<!-- Top: badge + title -->
	<div class="flex flex-col gap-3 mb-2">
		<span
			class="text-canvas-base-fixed/80 self-start rounded-full bg-white/20 px-3 py-1 text-xs font-medium"
		>
			Recommended
		</span>
		<h3 class="text-canvas-base-fixed m-0 text-xl leading-snug font-bold">
			{title}
		</h3>
	</div>

	<!-- Bottom: meta stats + start button -->
	<div class="flex items-center justify-between gap-4 mb-2 ">
		<div class="flex items-center gap-5">
			<span class="text-canvas-base-fixed/90 inline-flex items-center gap-1.5 text-sm">
				<Clock size={15} />{duration}
			</span>
			<span
				class="text-canvas-base-fixed/90 inline-flex items-center gap-1.5 text-sm font-semibold"
			>
				<Zap size={15} style="color: {zapColor}; fill: {zapColor}" />
				{xp} XP
			</span>
		</div>
	</div>
	<button
		style="color: {btnTextColor[variant]}"
		class="
				shrink-0 cursor-pointer rounded-xl
				bg-white px-5
				py-2 text-sm font-bold
				transition duration-(--motion-fast) ease-(--ease-standard)
				hover:opacity-90 active:scale-95
			"
		{onclick}
	>
		Start
	</button>
</article>
