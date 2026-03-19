<script>

	let {
		src = '',
		alt = '',
		name = '',
		size = 'md',
		overlay
	} = $props();

	let imageLoaded = $state(false);
	let imageError = $state(false);

	function getInitials(n) {
		if (!n?.trim()) return '?';
		const parts = n.trim().split(/\s+/);
		if (parts.length >= 2) {
			return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
		}
		return n.slice(0, 2).toUpperCase();
	}

	const sizeClasses = $derived(
		({
			sm: 'size-8 text-xs',
			md: 'size-9 text-sm',
			lg: 'size-20 text-2xl',
			xl: 'size-24 text-3xl'
		})[size] ?? 'size-9 text-sm'
	);

	const showImage = $derived(src && !imageError);
	const isLoading = $derived(src && !imageLoaded && !imageError);

	$effect(() => {
		src; // track src so we reset when it changes
		imageLoaded = false;
		imageError = false;
	});
</script>

<div
	class="
		relative inline-flex shrink-0 overflow-visible rounded-full
		border-2 border-stroke bg-primary-light
		{sizeClasses}
	"
>
	<div class="size-full overflow-hidden rounded-full">
	{#if showImage}
		<img
			src={src}
			alt={alt || name || 'Avatar'}
			class="size-full object-cover"
			class:invisible={isLoading}
			onload={() => (imageLoaded = true)}
			onerror={() => (imageError = true)}
		/>
		{#if isLoading}
			<span
				class="absolute inset-0 flex items-center justify-center"
				aria-hidden="true"
			>
				<span
					class="size-4 animate-spin rounded-full border-2 border-primary border-t-transparent"
				></span>
			</span>
		{/if}
	{:else}
		<div
			class="text-primary flex size-full items-center justify-center font-bold"
		>
			{getInitials(name)}
		</div>
	{/if}
	</div>

	{#if overlay}
		<div
			class="
				absolute bottom-0 right-1 flex size-7 items-center justify-center
				rounded-full border-2 border-surface-card bg-primary text-white
			"
		>
			{@render overlay()}
		</div>
	{/if}
</div>