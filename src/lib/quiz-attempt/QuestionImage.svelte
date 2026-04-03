<script>
	import { ImageOff } from '@lucide/svelte';

	let {
		src,
		alt,
		variant = 'stem',
		loading = 'lazy'
	} = $props();

	let loadState = $state('loading');

	$effect(() => {
		src;
		loadState = src ? 'loading' : 'error';
	});

	const frameClass = $derived.by(() => {
		switch (variant) {
			case 'stemCompact':
				return 'h-20 max-h-20 w-auto max-w-[min(100%,12rem)] shrink-0';
			case 'option':
				return 'mx-auto min-h-24 w-fit max-w-full max-h-28 sm:max-h-32';
			default:
				return 'max-h-[min(24rem,70vh)] w-full';
		}
	});

	const imgClass = $derived.by(() => {
		if (variant === 'stemCompact') {
			return 'max-h-20 w-auto max-w-full object-contain object-center';
		}
		if (variant === 'option') {
			return 'max-h-28 max-w-full w-auto object-contain object-center sm:max-h-32';
		}
		return 'h-full w-full object-contain object-center';
	});
</script>

<div class="relative overflow-hidden rounded-lg border border-stroke bg-surface-card-subtle {frameClass}">
	{#if !src}
		<div
			class="flex min-h-16 w-full flex-col items-center justify-center gap-1 px-3 py-4 text-center text-2xs text-fg-muted"
			role="presentation"
		>
			Missing image URL
		</div>
	{:else if loadState === 'error'}
		<div
			class="flex min-h-16 w-full flex-col items-center justify-center gap-1 px-3 py-4 text-center text-fg-muted"
			role="img"
			aria-label={alt}
		>
			<ImageOff size={22} class="shrink-0 opacity-70" aria-hidden="true" />
			<span class="text-2xs font-medium">Image failed to load</span>
		</div>
	{:else}
		{#if loadState === 'loading'}
			<div
				class="absolute inset-0 z-10 animate-pulse bg-stroke/25"
				aria-hidden="true"
			></div>
		{/if}
		<img
			src={src}
			{alt}
			{loading}
			class={imgClass}
			draggable="false"
			onload={() => (loadState = 'loaded')}
			onerror={() => (loadState = 'error')}
		/>
	{/if}
</div>
