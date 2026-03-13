<script>
	/**
	 * @typedef {Object} FooterLink
	 * @property {string} label
	 * @property {string} href
	 */

	/**
	 * @typedef {Object} Props
	 * @property {FooterLink[]} [links]
	 * @property {string} [copyright]
	 */

	/** @type {Props} */
	let {
		links = [
			{ label: 'Help Center', href: '/help' },
			{ label: 'Terms of Service', href: '/terms' },
			{ label: 'Privacy Policy', href: '/privacy' },
			{ label: 'Cookie Settings', href: '/cookies' },
		],
		copyright = `© ${new Date().getFullYear()} ExamBuddy Inc. All rights reserved.`,
	} = $props();
</script>

<footer
	class="
		hidden lg:flex items-center justify-between flex-wrap gap-y-3 
		h-14 px-6 py-4
		bg-canvas-base border-t border-stroke 
	"
>
	<!-- Brand -->
	<div class="flex items-center gap-2.5 shrink-0">
		<div class="size-8 rounded-lg bg-primary flex items-center justify-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="size-4"
				viewBox="0 0 24 24"
				fill="white"
				stroke="white"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
			</svg>
		</div>
		<span class="text-sm font-bold text-fg">Exam Buddy</span>
	</div>

	<!-- Links -->
	<nav class="flex items-center gap-6">
		{#each links as link (link.href)}
			<a
				href={link.href}
				rel="external"
				class="text-sm text-fg-muted no-underline
					transition duration-(--motion-fast) ease-(--ease-standard)
					hover:text-fg"
			>
				{link.label}
			</a>
		{/each}
	</nav>

	<!-- Copyright -->
	<p class="text-xs text-fg-muted shrink-0">{copyright}</p>
</footer>
