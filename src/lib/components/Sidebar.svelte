<script>
	/**
	 * @typedef {Object} ChildItem
	 * @property {string} label
	 * @property {string} href
	 * @property {import('svelte').Component} icon
	 *
	 * @typedef {Object} NavItem
	 * @property {string} label
	 * @property {import('svelte').Component} icon
	 * @property {string} [href]
	 * @property {ChildItem[]} [children]
	 *
	 * @typedef {Object} Props
	 * @property {NavItem[]} [navItems]
	 */

	import {
		Home,
		BookOpen,
		PenLine,
		ClipboardList,
		Star,
		Target,
		CircleUser,
		ChevronLeft,
		ChevronRight,
		User
	} from '@lucide/svelte';
	import { page } from '$app/stores';
	import SidebarItem from './SidebarItem.svelte';
	import Button from './Button.svelte';
	import { sidebar } from '$lib/stores/sidebar.svelte.js';

	let {
		navItems = [
			{ label: 'Home', href: '/home', icon: Home },
			{ label: 'My Profile', href: '/profile', icon: CircleUser },

			{
				label: 'Tests',
				icon: BookOpen,
				children: [
					{ label: 'Practice', href: '/tests/create', icon: PenLine },
					{ label: 'Mock Tests', href: '/mock-tests', icon: ClipboardList }
				]
			},
			{ label: 'Starred', href: '/starred-questions', icon: Star },
			{ label: 'Focus Areas', href: '/focus-areas', icon: Target }
		]
	} = $props();

	let collapsed = $state(false);
	const pathname = $derived($page.url.pathname);
</script>

{#if sidebar.open}
	<!-- Backdrop -->
	<div
		class="fixed inset-0 z-30 bg-black/40 lg:hidden"
		role="presentation"
		onclick={sidebar.close}
	></div>
{/if}

<aside
	class="
		bg-canvas-base border-stroke fixed top-0 z-40 mt-[calc(var(--header-height))] flex min-h-screen
		shrink-0 flex-col
		border-r transition-all duration-(--motion-normal)
		ease-(--ease-standard) lg:static lg:mt-0
    {collapsed ? 'w-16' : 'w-60'}
		
		{sidebar.open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
	"
>
	<div class=" border-stroke flex min-h-12 items-center justify-end border-b p-3">
		<Button
			btnType="custom"
			customClass="rounded-md p-2 flex items-center justify-center hidden lg:flex
                bg-canvas text-fg
                border border-stroke 
                transition duration-(--motion-fast) ease-(--ease-standard)
                cursor-pointer"
			onclick={() => (collapsed = !collapsed)}
			aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
		>
			{#if collapsed}
				<ChevronRight size={16} />
			{:else}
				<ChevronLeft size={16} />
			{/if}
		</Button>
	</div>
	<!-- Nav items -->
	<div class="flex flex-1 flex-col overflow-hidden">
		<nav class="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3">
			{#each navItems as item (item.label)}
				<SidebarItem
					label={item.label}
					icon={item.icon}
					href={item.href}
					children={item.children}
					sidebarCollapsed={collapsed}
					{pathname}
				/>
			{/each}
		</nav>
	</div>

	<!-- Collapse toggle -->
</aside>
