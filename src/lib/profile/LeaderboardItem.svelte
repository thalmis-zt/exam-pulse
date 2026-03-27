<script>
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
	class="flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors
		{entry.isCurrentUser
		? 'bg-primary-light border-primary/30 border'
		: 'bg-canvas-base hover:bg-stroke/40'}"
>
	<!-- Rank -->
	<span
		class="w-5 shrink-0 text-center text-sm font-semibold {entry.isCurrentUser
			? 'text-primary'
			: 'text-fg-muted'}"
	>
		{entry.rank}
	</span>

	<!-- Avatar -->
	<div
		class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold select-none
			{entry.isCurrentUser ? 'bg-primary text-canvas-base-fixed' : 'bg-stroke text-fg'}"
	>
		{#if entry.avatar}
			<img src={entry.avatar} alt={entry.name} class="h-full w-full rounded-full object-cover" />
		{:else}
			{initials}
		{/if}
	</div>

	<!-- Name + XP -->
	<div class="flex min-w-0 flex-1 flex-col gap-0">
		<span class="truncate text-sm font-semibold {entry.isCurrentUser ? 'text-primary' : 'text-fg'}">
			{entry.name}
			{#if entry.isCurrentUser}
				<span class="text-fg-muted text-xs font-normal">(You)</span>
			{/if}
		</span>
		<span class="text-fg-muted text-xs">{entry.xp.toLocaleString()} XP</span>
	</div>
</div>
