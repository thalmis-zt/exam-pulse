<script>
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
		import { resolve } from '$app/paths';

	const tabs = [
		{ label: 'Home',  href: '/home',         icon: Home },
		{ label: 'Practice', href: '/tests/create',   icon: PenLine },
		{ label: 'Mocks', href: '/mock-tests',         icon: ClipboardList },
		{ label: 'Focus', href: '/focus-areas',         icon: Target },
	];

	const active = $derived($page.url.pathname);
</script>

<nav
	class="
		lg:hidden fixed bottom-0 left-0 right-0 z-50
		flex items-center justify-around
		bg-surface-card border-t border-stroke
		px-2  pb-navbar-bottom 
	"
>
	{#each tabs as tab, index(index)}
		{@const isActive = active.includes(tab.href)}
		<a
			href={resolve(tab.href ?? '/')}
			class="
				flex flex-col items-center justify-center 
				flex-1 p-1 rounded-lg
				transition duration-(--motion-fast) ease-(--ease-standard)
				no-underline
				{isActive ? 'text-primary' : 'text-fg-muted'}
			"
		>
			<tab.icon size={16} />
			<span class="text-xs font-medium leading-none mt-0.5">{tab.label}</span>
		</a>
	{/each}
</nav>
