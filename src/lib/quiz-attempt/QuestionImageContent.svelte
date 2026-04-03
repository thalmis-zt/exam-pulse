<script>
	import QuestionImage from './QuestionImage.svelte';
	let {
		urls = [],
		altPrefix = 'Question figure',
		loading = 'eager',
		layout = 'compact',
		maxItems = 10
	} = $props();

	const cleanUrls = $derived(urls.filter((u) => typeof u === 'string' && u.trim().length > 0));

	const limitedUrls = $derived(cleanUrls.slice(0, Math.max(0, maxItems)));

	const groupClass = $derived.by(() => {
		switch (layout) {
			case 'compact':
				return 'flex w-full min-w-0 flex-wrap gap-4';
			case 'grid':
				return 'grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2';
			default:
				return 'flex w-full min-w-0 flex-col gap-3';
		}
	});

	const imageVariant = $derived(layout === 'compact' ? 'stemCompact' : 'stem');
</script>

{#if limitedUrls.length > 0}
	<div class={groupClass} role="group" aria-label="Question diagrams">
		{#each limitedUrls as url, i (url + i)}
			<QuestionImage
				src={url}
				alt={`${altPrefix} ${i + 1}`}
				variant={imageVariant}
				loading={i === 0 ? loading : 'lazy'}
			/>
		{/each}
	</div>
{/if}
