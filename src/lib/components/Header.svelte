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
	 * @property {User} [user]                      - Logged-in user info (name / rank next to account menu)
	 * @property {number} [notificationCount]       - Notification badge count (0 = hidden)
	 * @property {string} [searchPlaceholder]
	 * @property {() => void} [onSearchClick]
	 * @property {() => void} [onNotificationClick]
	 * @property {() => void} [onProfileClick]       - Optional; fired when "Profile" is chosen in the menu
	 * @property {() => void} [onLogout]
	 * @property {Array} [accountMenuItems] - Account dropdown items (see AccountMenuPanel); omit for defaults
	 */

	import { Zap, Bell, Menu, User, Settings, HelpCircle, LogOut } from '@lucide/svelte';
	import { page } from '$app/stores';
	import NavItem from './NavItem.svelte';
	import Avatar from './Avatar.svelte';
	import AccountMenuPanel from './AccountMenuPanel.svelte';
	import { sidebar } from '$lib/stores/sidebar.svelte.js';

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
		onLogout,
		accountMenuItems: accountMenuItemsProp
	} = $props();

	const pathname = $derived($page.url.pathname);

	let menuOpen = $state(false);
	let menuRoot = $state(/** @type {HTMLDivElement | null} */ (null));

	$effect(() => {
		if (!menuOpen) return;
		const handler = (/** @type {MouseEvent} */ e) => {
			const t = e.target;
			if (menuRoot && t instanceof Node && !menuRoot.contains(t)) menuOpen = false;
		};
		window.addEventListener('click', handler);
		return () => window.removeEventListener('click', handler);
	});

	function toggleMenu(/** @type {MouseEvent} */ e) {
		e.stopPropagation();
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	const accountMenuItems = $derived.by(() => {
		if (accountMenuItemsProp !== undefined) return accountMenuItemsProp;
		return [
			{
				type: 'link',
				label: 'Profile',
				href: '/profile',
				icon: User,
				onNavigate: () => onProfileClick?.()
			},
			{ type: 'link', label: 'Settings', href: '/settings', icon: Settings },
			{ type: 'link', label: 'Help', href: '/help', icon: HelpCircle },
			{ type: 'separator' },
			{
				type: 'action',
				label: 'Log out',
				icon: LogOut,
				variant: 'danger',
				onClick: () => onLogout?.()
			}
		];
	});
</script>

<header
	class="
		bg-canvas-base border-stroke sticky
		top-0 z-50 flex
		h-16 items-center justify-between border-b
		px-2 md:px-4 lg:px-6
	"
>
	<div class="flex justify-center gap-2">
		<!-- ── Hamburger (mobile only) ──────────────────────────── -->
		<button
			class="text-fg-muted hover:bg-canvas hover:text-fg mr-1 flex size-10 cursor-pointer
				items-center justify-center rounded-md
				transition duration-(--motion-fast) ease-(--ease-standard) lg:hidden"
			onclick={sidebar.toggle}
			aria-label="Toggle navigation"
		>
			<Menu size={24} />
		</button>

		<!-- ── Brand ─────────────────────────────────────────────── -->
		<a href={logoHref} class="flex shrink-0 items-center gap-2 no-underline">
			<div class="bg-primary flex size-9 items-center justify-center rounded-xl">
				<Zap size={18} color="white" fill="white" />
			</div>
			<span class="text-fg text-base font-bold tracking-tight">Exam Buddy</span>
		</a>
	</div>

	<!-- ── Nav items ─────────────────────────────────────────── -->
	<nav class="ml-8 flex items-center gap-0.5">
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
	<div class="ml-auto flex items-center gap-3">
		<!-- Search -->
		<!-- <button
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
		</button> -->

		<!-- Notification bell -->
		<button
			class="
				text-fg-muted hover:bg-canvas hover:text-fg
				relative flex size-9
				cursor-pointer
				items-center justify-center rounded-full
				transition duration-(--motion-fast)
				ease-(--ease-standard)
			"
			onclick={onNotificationClick}
			aria-label="Notifications"
		>
			<Bell size={20} />
			{#if notificationCount > 0}
				<span
					class="
						bg-danger absolute top-1
						right-1 size-2 rounded-full
					"
				></span>
			{/if}
		</button>

		<!-- Account menu -->
		<div class="relative shrink-0" bind:this={menuRoot}>
			<button
				type="button"
				class="
					hover:bg-canvas flex cursor-pointer
					items-center gap-2.5 rounded-full
					py-1 pl-1
					pr-2 transition duration-(--motion-fast)
					ease-(--ease-standard)
				"
				onclick={toggleMenu}
				aria-expanded={menuOpen}
				aria-haspopup="menu"
				aria-label="Account menu"
			>
				{#if user}
					<div class="hidden flex-col items-end leading-tight sm:flex">
						<span class="text-fg max-w-40 truncate text-sm font-semibold">{user.name}</span>
						{#if user.rank}
							<span class="text-fg-muted text-xs">{user.rank}</span>
						{/if}
					</div>
				{/if}
				<Avatar
					name={user?.name ?? ''}
					src={user?.avatarSrc ?? ''}
					alt={user?.name ? `${user.name} avatar` : ''}
					size="md"
				/>
			</button>

			{#if menuOpen}
				<AccountMenuPanel items={accountMenuItems} onClose={closeMenu} />
			{/if}
		</div>
	</div>
</header>
