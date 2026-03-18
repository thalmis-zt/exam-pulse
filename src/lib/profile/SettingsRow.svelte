<script>
	import { ChevronRight } from '@lucide/svelte';

	/**
	 * @type {{
	 *   icon: import('svelte').Snippet,
	 *   children: import('svelte').Snippet,
	 *   trailingIcon?: import('svelte').Snippet,
	 *   onclick?: () => void,
 *   interactive?: boolean,
 *   showTrailing?: boolean,
 *   noDivider?: boolean,
 *   variant?: 'default' | 'warning' | 'danger',
 * }}
 */
	let {
		icon,
		children,
		trailingIcon,
		onclick,
		interactive = false,
		showTrailing = true,
		noDivider = false,
		variant = 'default'
	} = $props();

	const hoverClass = {
		default: 'hover:bg-canvas',
		warning: 'hover:bg-warning-surface',
		danger: 'hover:bg-danger-surface'
	};

	const baseClass = $derived(
		`flex items-center gap-3 py-2.5 w-full text-left transition-colors rounded-sm ${!noDivider ? 'border-b border-stroke' : ''}`
	);
</script>

{#if interactive}
	<button
		class="{baseClass} bg-transparent border-x-0 border-t-0 cursor-pointer {hoverClass[variant]}"
		{onclick}
	>
		<span class="shrink-0">{@render icon()}</span>
		<div class="flex-1 min-w-0">{@render children()}</div>
		{#if showTrailing}
			{#if trailingIcon}
				{@render trailingIcon()}
			{:else}
				<ChevronRight size={15} class="text-fg-muted shrink-0" />
			{/if}
		{/if}
	</button>
{:else}
	<div class="{baseClass}">
		<span class="shrink-0">{@render icon()}</span>
		<div class="flex-1 min-w-0">{@render children()}</div>
		{#if trailingIcon}{@render trailingIcon()}{/if}
	</div>
{/if}
