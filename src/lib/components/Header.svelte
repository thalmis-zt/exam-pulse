<script>
	/**
	 * @typedef {Object} NavItemDef
	 * @property {string} label
	 * @property {string} href
	 * @property {import('svelte').Component} icon
	 */

	/**
	 * @typedef {Object} User
	 * @property {string} name
	 * @property {string} [rank]
	 * @property {string} [avatarSrc]
	 */

	/**
	 * @typedef {Object} Props
	 * @property {NavItemDef[]} navItems            - Navigation menu items
	 * @property {string} [logoHref]                 - Logo / brand link target
	 * @property {User} [user]                      - Logged-in user info
	 * @property {number} [notificationCount]       - Notification badge count (0 = hidden)
	 * @property {string} [searchPlaceholder]
	 * @property {() => void} [onSearchClick]
	 * @property {() => void} [onNotificationClick]
	 * @property {() => void} [onProfileClick]
	 */

	import { Zap, Search, Bell } from '@lucide/svelte';
	import { page } from '$app/stores';
	import NavItem from './NavItem.svelte';

	/** @type {Props} */
	let {
		navItems = [],
		logoHref = '/home',
		user,
		notificationCount = 0,
		searchPlaceholder = 'Search exams, subjects...',
		onSearchClick,
		onNotificationClick,
		onProfileClick,
	} = $props();

	const pathname = $derived($page.url.pathname);
</script>

<header
	class="
		sticky top-0 z-50
		flex items-center justify-between
		h-16 px-6
		bg-surface border-b border-stroke
	"
>
	<!-- ── Brand ─────────────────────────────────────────────── -->
	<a href={logoHref} class="flex items-center gap-2 no-underline shrink-0">
		<div class="size-9 rounded-xl bg-primary flex items-center justify-center">
			<Zap size={18} color="white" fill="white" />
		</div>
		<span class="text-base font-bold text-fg tracking-tight">Exam Buddy</span>
	</a>

	<!-- ── Nav items ─────────────────────────────────────────── -->
	<nav class="flex items-center gap-0.5 ml-8">
		{#each navItems as item (item.href)}
			<NavItem
				label={item.label}
				href={item.href}
				icon={item.icon}
				active={pathname.startsWith(item.href)}
			/>
		{/each}
	</nav>

	<!-- ── Right cluster ─────────────────────────────────────── -->
	<div class="flex items-center gap-3 ml-auto">
		<!-- Search -->
		<button
			class="
				flex items-center gap-2
				h-9 px-3 min-w-52
				bg-canvas border border-stroke rounded-full
				text-sm text-fg-muted
				cursor-text
				transition duration-(--motion-fast) ease-(--ease-standard)
				hover:border-primary/50
			"
			onclick={onSearchClick}
		>
			<Search size={15} class="shrink-0 text-fg-muted" />
			<span class="truncate">{searchPlaceholder}</span>
		</button>

		<!-- Notification bell -->
		<button
			class="
				relative size-9 rounded-full
				flex items-center justify-center
				text-fg-muted
				transition duration-(--motion-fast) ease-(--ease-standard)
				hover:bg-canvas hover:text-fg
				cursor-pointer
			"
			onclick={onNotificationClick}
			aria-label="Notifications"
		>
			<Bell size={20} />
			{#if notificationCount > 0}
				<span
					class="
						absolute top-1 right-1
						size-2 rounded-full bg-danger
					"
				></span>
			{/if}
		</button>

		<!-- User profile -->
		{#if user}
			<button
				class="
					flex items-center gap-2.5
					pl-1 pr-2 py-1
					rounded-full
					cursor-pointer
					transition duration-(--motion-fast) ease-(--ease-standard)
					hover:bg-canvas
				"
				onclick={onProfileClick}
			>
				<!-- Text -->
				<div class="flex flex-col items-end leading-tight">
					<span class="text-sm font-semibold text-fg">{user.name}</span>
					{#if user.rank}
						<span class="text-xs text-fg-muted">{user.rank}</span>
					{/if}
				</div>

				<!-- Avatar -->
				<div class="size-9 rounded-full overflow-hidden bg-primary-light border-2 border-stroke shrink-0">
					{#if user.avatarSrc}
						<img src={user.avatarSrc} alt={user.name} class="size-full object-cover" />
					{:else}
						<div class="size-full flex items-center justify-center bg-primary-light text-primary font-bold text-sm">
							{user.name.charAt(0).toUpperCase()}
						</div>
					{/if}
				</div>
			</button>
		{/if}
	</div>
</header>
