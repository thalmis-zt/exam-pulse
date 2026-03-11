
<script>
	/** @type {{ xp: string | number }} */
	let { xp } = $props();
</script>

<span class="
	shrink-0 inline-flex items-center
	px-3 py-1
	bg-(--color-success-surface) text-(--color-success)
	text-sm font-semibold rounded-full whitespace-nowrap
">
	{xp}
</span>
