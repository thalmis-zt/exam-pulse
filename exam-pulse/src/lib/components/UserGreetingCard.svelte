<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} name        - Full user name
	 * @property {string|number} rank - Rank number e.g. 1240
	 * @property {string} [avatarSrc] - URL to avatar image; falls back to initials
	 */

	/** @type {Props} */
	let { name, rank, avatarSrc } = $props();

	const initials = $derived(
		name
			.split(' ')
			.map((n) => n[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);
</script>

<div class="flex items-center justify-between px-5 py-4 bg-(--surface-card) rounded-xl shadow-sm">
	<!-- Avatar + greeting -->
	<div class="flex items-center gap-3">
		{#if avatarSrc}
			<img
				src={avatarSrc}
				alt={name}
				class="size-12 rounded-full object-cover shrink-0 border-2 border-(--color-border)"
			/>
		{:else}
			<div
				class="size-12 rounded-full shrink-0 bg-(--color-primary) flex items-center justify-center text-white text-sm font-bold"
			>
				{initials}
			</div>
		{/if}

		<div class="flex flex-col gap-0.5">
			<p class="text-xs text-(--color-text-muted) leading-none font-sans">Welcome back,</p>
			<h2 class="text-lg font-bold text-(--color-text) leading-tight font-poppins">{name}</h2>
		</div>
	</div>

	<!-- Rank pill -->
	<span
		class="shrink-0 px-3 py-1 rounded-full border border-(--color-primary) text-(--color-primary) text-xs font-semibold whitespace-nowrap"
	>
		Rank #{rank.toLocaleString()}
	</span>
</div>
