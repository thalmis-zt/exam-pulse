<script>
	import { Clock, ClipboardList, Users, Play } from '@lucide/svelte';
	import XpBadge from './XpBadge.svelte';

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

<!-- Card: all tokens are @theme utilities — no arbitrary CSS var syntax needed -->
<article class="
	flex flex-col gap-4
	py-5 px-6
	bg-surface-card
	border border-stroke rounded-xl
	shadow-sm
	transition duration-(--motion-fast) ease-(--ease-standard)
	hover:shadow-md hover:border-primary
">
	<!-- Top row: title + xp badge -->
	<div class="flex items-start justify-between gap-4">
		<div class="flex flex-col gap-1">
			<h3 class="m-0 text-lg font-bold leading-snug text-fg">{title}</h3>
			{#if description}
            <p class="m-0 text-sm text-fg-muted">{description}</p>
            {/if}
		</div>
		<XpBadge {xp} />
	</div>

	<!-- Bottom row: meta stats + play button -->
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-4 flex-wrap">
			<span class="inline-flex items-center gap-2 text-sm text-fg-muted">
				<Clock size={16} />{duration}
			</span>
			<span class="inline-flex items-center gap-2 text-sm text-fg-muted">
				<ClipboardList size={16} />{questions}
			</span>
			<span class="inline-flex items-center gap-2 text-sm text-fg-muted">
				<Users size={16} />{users}
			</span>
		</div>

		<button
			class="
				shrink-0 inline-flex items-center justify-center
				size-6
				bg-transparent border-2 border-primary rounded-full
				text-primary cursor-pointer
				transition duration-(--motion-fast) ease-(--ease-standard)
				hover:bg-primary hover:text-white
			"
			onclick={onclick}
			aria-label="Start test"
		>
			<Play size={12} />
		</button>
	</div>
</article>
