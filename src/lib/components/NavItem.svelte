<script>
	/**
	 * @typedef {Object} Props
	 * @property {string} label            - Display label e.g. "Home"
	 * @property {string} href             - Navigation href
	 * @property {import('svelte').Component} icon - Lucide icon component
	 * @property {boolean} [active]        - Whether this item is currently active
	 */

	/** @type {Props} */

    	import { resolve } from '$app/paths';
        
	let { label, href, icon: Icon, active = false } = $props();
</script>

<a
	href={resolve(href ?? '/')}
	class="
		flex items-center gap-1.5
		px-3 py-2 rounded-lg
		text-sm font-medium no-underline
		transition duration-(--motion-fast) ease-(--ease-standard)
		{active
			? 'text-primary bg-primary-light'
			: 'text-fg-muted hover:text-fg hover:bg-canvas'}
	"
>
	<Icon size={17} />
	<span>{label}</span>
</a>
