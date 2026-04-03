<script>
	/**
	 * @typedef {import('svelte').Component} IconComponent
	 * @typedef {{ type: 'link'; label: string; href: string; icon: IconComponent; onNavigate?: () => void }} AccountMenuLinkItem
	 * @typedef {{ type: 'action'; label: string; icon: IconComponent; onClick: () => void; variant?: 'danger' | 'default' }} AccountMenuActionItem
	 * @typedef {{ type: 'separator' }} AccountMenuSeparatorItem
	 * @typedef {AccountMenuLinkItem | AccountMenuActionItem | AccountMenuSeparatorItem} AccountMenuItem
	 */

	/**
	 * @typedef {Object} Props
	 * @property {AccountMenuItem[]} items
	 * @property {() => void} onClose - e.g. collapse menu in parent
	 */

	/** @type {Props} */
	let { items, onClose } = $props();
</script>

<div
	class="border-stroke bg-surface-card absolute right-0 top-full z-60 mt-3 min-w-54 rounded-md border py-1 shadow-lg"
	role="menu"
	tabindex="-1"
>
	{#each items as item}
		{#if item.type === 'separator'}
			<div class="border-stroke my-1 border-t" role="separator"></div>
		{:else if item.type === 'link'}
			{@const Icon = item.icon}
			<a
				href={item.href}
				class="text-fg hover:bg-canvas flex items-center gap-3 px-4 py-2.5 text-sm no-underline transition"
				role="menuitem"
				onclick={() => {
					onClose();
					item.onNavigate?.();
				}}
			>
				<Icon size={18} class="text-fg-muted shrink-0" aria-hidden="true" />
				{item.label}
			</a>
		{:else if item.type === 'action'}
			{@const Icon = item.icon}
			<button
				type="button"
				class="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition {item.variant ===
				'danger'
					? 'text-danger hover:bg-danger/5'
					: 'text-fg hover:bg-canvas'}"
				role="menuitem"
				onclick={() => {
					onClose();
					item.onClick();
				}}
			>
				<Icon
					size={18}
					class={item.variant === 'danger' ? 'text-danger shrink-0' : 'text-fg-muted shrink-0'}
					aria-hidden="true"
				/>
				{item.label}
			</button>
		{/if}
	{/each}
</div>
