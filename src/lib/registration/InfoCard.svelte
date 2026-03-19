<script>
	let { title = '', description = '', class: className = '' } = $props();

	const styles = $derived.by(() => ({
		container: `rounded-xl border border-primary/30 bg-primary-light p-5 ${className}`.trim(),
		title: 'text-base font-semibold text-fg',
		description: 'mt-2 text-sm text-fg-muted leading-relaxed'
	}));
</script>

<div class={styles.container}>
	<h3 class={styles.title}>{title}</h3>
	{#if description}
		<p class={styles.description}>{description}</p>
	{/if}
</div>
