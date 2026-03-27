<script>
	/**
	 * Checkbox — form checkbox with optional label and link.
	 *
	 * @typedef {Object} Props
	 * @property {boolean} checked - Checked state (bindable)
	 * @property {string} [label] - Label text
	 * @property {string} [linkText] - Link text (e.g. "Terms of Service")
	 * @property {string} [linkHref] - Link href
	 * @property {() => void} [onLinkClick] - Click handler for link (e.g. open modal)
	 * @property {string} [id] - Input id
	 * @property {string} [class] - Extra classes for the wrapper
	 */

	let {
		checked = $bindable(false),
		label = '',
		linkText = '',
		linkHref = '',
		onLinkClick,
		id: idProp,
		class: className = ''
	} = $props();

	const fallbackId = `checkbox-${crypto.randomUUID()}`;
	const inputId = $derived(idProp ?? fallbackId);
</script>

<label
	for={inputId}
	class="inline-flex cursor-pointer items-start gap-3 {className}"
>
	<input
		id={inputId}
		type="checkbox"
		bind:checked
		class="
			mt-0.5 size-4 shrink-0 rounded border-stroke
			text-primary focus:ring-primary
			transition duration-(--motion-fast) ease-(--ease-standard)
		"
	/>
	<span class="text-xs text-fg">
		{label}
		{#if linkText}
			{#if onLinkClick}
				<button
					type="button"
					class="text-primary font-medium underline hover:no-underline"
					onclick={(e) => {
						e.preventDefault();
						onLinkClick();
					}}
				>
					{linkText}
				</button>
			{:else if linkHref}
				<a href={linkHref} class="text-primary font-medium underline hover:no-underline" target="_blank" rel="noopener noreferrer">
					{linkText}
				</a>
			{/if}
		{/if}
	</span>
</label>
