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
	} from '@lucide/svelte';
	import { page } from '$app/stores';
	import SidebarItem from './SidebarItem.svelte';
	import Button from './Button.svelte';
	import { sidebar } from '$lib/stores/sidebar.svelte.js';

	/** @type {Props} */
	let {
		navItems = [
			{ label: 'Home', href: '/home', icon: Home },
			{
				label: 'Tests',
				icon: BookOpen,
				children: [
					{ label: 'Practice', href: '/tests/create', icon: PenLine },
					{ label: 'Mock Tests', href: '/mock-tests', icon: ClipboardList },
				],
			},
			{ label: 'Starred', href: '/starred-questions', icon: Star },
			{ label: 'Focus Areas', href: '/focus-areas', icon: Target },
			{ label: 'Profile', href: '/profile', icon: CircleUser },
		],
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
		fixed lg:static z-40 flex flex-col shrink-0 mt-[calc(var(--header-height))] lg:mt-0
		min-h-screen top-0
		bg-canvas-base border-r border-stroke
		transition-all duration-(--motion-normal) ease-(--ease-standard) 
    {collapsed ? 'w-16' : 'w-60'}
		
		{sidebar.open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
	"
>
<div class=" flex items-center justify-end p-3 border-b border-stroke min-h-12 ">

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
	<div class="flex flex-col flex-1 overflow-hidden">
		<nav class="flex flex-col gap-0.5 p-3 flex-1 overflow-y-auto">
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
