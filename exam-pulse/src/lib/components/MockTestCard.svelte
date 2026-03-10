<script>
	import { Clock, ClipboardList, Users, Play } from '@lucide/svelte';

	/**
	 * @typedef {Object} Props
	 * @property {string} title        - Test title
	 * @property {string} description  - Short subtitle
	 * @property {string} duration     - e.g. "45 mins"
	 * @property {string} questions    - e.g. "30 Qs"
	 * @property {string} users        - e.g. "3.1k users"
	 * @property {string|number} xp    - e.g. "+25 XP"
	 * @property {() => void} [onclick]
	 */

	/** @type {Props} */
	let {
		title,
		description,
		duration,
		questions,
		users,
		xp,
		onclick
	} = $props();
</script>

<!-- Card
     @theme tokens   → standard utilities  (rounded-xl, shadow-sm, text-lg, font-bold …)
     :root tokens    → arbitrary syntax    (bg-[var(--surface-card)], text-[var(--color-text)] …)
     No <style> block needed.
-->
<article class="
	flex flex-col gap-4
	py-5 px-6
	bg-(--surface-card)
	border border-(--color-border) rounded-xl
	shadow-sm
	transition duration-(--motion-fast) ease-(--ease-standard)
	hover:shadow-md hover:border-(--color-primary)
">
	<!-- Top row: title + xp badge -->
	<div class="flex items-start justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h3 class="m-0 text-lg font-bold leading-snug text-(--color-text)">{title}</h3>
			{#if description}
            <p class="m-0 text-sm text-(--color-text-muted)">{description}</p>
            {/if}
		</div>
		<span class="
			shrink-0 inline-flex items-center
			px-3 py-1
			bg-(--color-success-surface) text-(--color-success)
			text-sm font-semibold rounded-full whitespace-nowrap
		">
			{xp}
		</span>
	</div>

	<!-- Bottom row: meta stats + play button -->
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-4 flex-wrap">
			<span class="inline-flex items-center gap-2 text-sm text-(--color-text-muted)">
				<Clock size={16} />{duration}
			</span>
			<span class="inline-flex items-center gap-2 text-sm text-(--color-text-muted)">
				<ClipboardList size={16} />{questions}
			</span>
			<span class="inline-flex items-center gap-2 text-sm text-(--color-text-muted)">
				<Users size={16} />{users}
			</span>
		</div>

		<button
			class="
				shrink-0 inline-flex items-center justify-center
				size-6
				bg-transparent border-2 border-(--color-primary) rounded-full
				text-(--color-primary) cursor-pointer
				transition duration-(--motion-fast) ease-(--ease-standard)
				hover:bg-(--color-primary) hover:text-white
			"
			onclick={onclick}
			aria-label="Start test"
		>
			<Play size={12} />
		</button>
	</div>
</article>
