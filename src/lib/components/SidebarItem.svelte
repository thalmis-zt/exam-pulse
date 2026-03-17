<script>
	/**
	 * A single sidebar row — either a clickable leaf link or a collapsible parent.
	 *
	 * @typedef {Object} ChildItem
	 * @property {string} label
	 * @property {string} href
	 * @property {import('svelte').Component} icon
	 *
	 * @typedef {Object} Props
	 * @property {string} label
	 * @property {import('svelte').Component} icon
	 * @property {string} [href]                    - Omit for parent items
	 * @property {ChildItem[]} [children]
	 * @property {boolean} [sidebarCollapsed]        - Whether the outer sidebar is collapsed
	 * @property {string} pathname                   - Current $page.url.pathname
	 */

	import { ChevronDown } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { sidebar } from '$lib/stores/sidebar.svelte.js';

	/** @type {Props} */
	let { label, icon: Icon, href, children, sidebarCollapsed = false, pathname } = $props();

	const isLeafActive = $derived(!!href && pathname.startsWith(href));
	const isParentActive = $derived(
		!!children && children.some((c) => pathname.startsWith(c.href))
	);

	// Auto-open when a child route is active
	let open = $state(false);

	$effect(() => {
		if (isParentActive) open = true;
	});

	const rowBase = `
		flex items-center  gap-3  text-left
		w-full p-3 rounded-lg border-none 
		text-sm font-medium no-underline
		transition duration-(--motion-fast) ease-(--ease-standard)
		cursor-pointer
	`;
	const activeStyle = 'text-primary bg-primary-light ';
	const idleStyle = 'text-fg-muted hover:text-fg hover:bg-canvas';
</script>

{#if children}
	<!-- Parent with children -->
	<div>
		<button
			class="{rowBase} {isParentActive ? activeStyle : idleStyle} justify-between"
			onclick={() => (open = !open)}
		>
			<span class="flex items-center gap-3 min-w-0">
				<Icon size={19} class="shrink-0" />
				{#if !sidebarCollapsed}
					<span class="truncate">{label}</span>
				{/if}
			</span>
			{#if !sidebarCollapsed}
				<ChevronDown
					size={15}
					class="shrink-0 transition-transform duration-(--motion-fast) {open ? 'rotate-180' : ''}"
				/>
			{/if}
		</button>

		{#if open && !sidebarCollapsed}
			<div class="mt-0.5 ml-5 pl-3 border-l border-stroke flex flex-col gap-0.5">
				{#each children as child (child.href)}
					{@const childActive = pathname.startsWith(child.href)}
					<a
						href={resolve(child.href)}
						class="{rowBase} {childActive ? activeStyle : idleStyle}"
						onclick={sidebar.close}
					>
						<child.icon size={16} class="shrink-0" />
						<span class="truncate">{child.label}</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<!-- Leaf item -->
	<a href={resolve(href ?? '/')} class="{rowBase} {isLeafActive ? activeStyle : idleStyle}" onclick={sidebar.close}>
		<Icon size={20} class="shrink-0" />
		{#if !sidebarCollapsed}
			<span class="truncate">{label}</span>
		{/if}
	</a>
{/if}
