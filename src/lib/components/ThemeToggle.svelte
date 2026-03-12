<script>
	import { theme } from '$lib/stores/theme.svelte.js';

	const options = /** @type {const} */ ([
		{ value: 'light', label: 'Light' },
		{ value: 'dark',  label: 'Dark'  },
		{ value: 'system', label: 'System' }
	]);
</script>

<div
	role="group"
	aria-label="Theme"
	class="inline-flex items-center gap-1 p-1 rounded-lg bg-canvas border border-stroke"
>
	{#each options as option}
		<button
			class="
				px-3 py-1 text-sm rounded-md cursor-pointer
				transition duration-(--motion-fast) ease-(--ease-standard)
				{theme.current === option.value
					? 'bg-surface-card text-fg shadow-sm font-medium'
					: 'text-fg-muted hover:text-fg'}
			"
			onclick={() => theme.set(option.value)}
			aria-pressed={theme.current === option.value}
		>
			{option.label}
		</button>
	{/each}
</div>
