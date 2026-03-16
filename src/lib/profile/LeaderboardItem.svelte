<script>
	import { Star } from '@lucide/svelte';

	/** @type {{ entry: import('./mock/profile.schema.js').LeaderboardEntry }} */
	let { entry } = $props();

	const initials = $derived(
		entry.name
			.split(' ')
			.map((w) => w[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);
</script>

<div
	class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors
		{entry.isCurrentUser
		? 'bg-primary-light border border-primary/30'
		: 'bg-canvas hover:bg-stroke/40'}"
>
	<!-- Rank -->
	<span
		class="text-sm font-bold shrink-0 w-5 text-center {entry.isCurrentUser
			? 'text-primary'
			: 'text-fg-muted'}"
	>
		{entry.rank}
	</span>

	<!-- Avatar -->
	<div
		class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold select-none
			{entry.isCurrentUser ? 'bg-primary text-canvas-base-fixed' : 'bg-stroke text-fg'}"
	>
		{#if entry.avatar}
			<img src={entry.avatar} alt={entry.name} class="w-full h-full rounded-full object-cover" />
		{:else}
			{initials}
		{/if}
	</div>

	<!-- Name + XP -->
	<div class="flex flex-col gap-0 flex-1 min-w-0">
		<span
			class="text-sm font-semibold truncate {entry.isCurrentUser ? 'text-primary' : 'text-fg'}"
		>
			{entry.name}
			{#if entry.isCurrentUser}
				<span class="text-xs font-normal text-fg-muted">(You)</span>
			{/if}
		</span>
		<span class="text-xs text-fg-muted">{entry.xp.toLocaleString()} XP</span>
	</div>

	<!-- Star bookmark -->
	<button
		class="shrink-0 text-fg-muted hover:text-warning transition-colors bg-transparent border-none cursor-pointer p-1"
		aria-label="Bookmark {entry.name}"
	>
		<Star size={15} />
	</button>
</div>
