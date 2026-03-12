<script>
	import { Home, BookOpen, Target, Trophy } from '@lucide/svelte';
	import { page } from '$app/stores';

	const tabs = [
		{ label: 'Home',  href: '/home',         icon: Home },
		{ label: 'Mocks', href: '/tests',         icon: BookOpen },
		{ label: 'Focus', href: '/focus-areas',   icon: Target },
		{ label: 'Ranks', href: '/ranks',         icon: Trophy },
	];

	const active = $derived($page.url.pathname);
</script>

<nav
	class="
		fixed bottom-0 left-0 right-0 z-50
		flex items-center justify-around
		bg-surface-card border-t border-stroke
		px-2 py-2 safe-area-pb
	"
>
	{#each tabs as tab, index(index)}
		{@const isActive = active.includes(tab.href)}
		<a
			href="#"
			class="
				flex flex-col items-center justify-center gap-1
				flex-1 py-1 rounded-lg
				transition duration-(--motion-fast) ease-(--ease-standard)
				no-underline
				{isActive ? 'text-primary' : 'text-fg-muted'}
			"
		>
			<tab.icon size={22} />
			<span class="text-xs font-medium leading-none">{tab.label}</span>
		</a>
	{/each}
</nav>
