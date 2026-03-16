<script>
	let { title, icon, subtitle = '', size = 'md', class: className = '' } = $props();

	const sizeConfig = {
		sm: { title: 'text-sm', subtitle: 'text-xs', iconClass: '[&_svg]:size-4', gap: 'gap-2' },
		md: { title: 'text-base', subtitle: 'text-sm', iconClass: '[&_svg]:size-5', gap: 'gap-2.5' },
		lg: { title: 'text-lg', subtitle: 'text-base', iconClass: '[&_svg]:size-6', gap: 'gap-3' }
	};

	const config = $derived(sizeConfig[size] ?? sizeConfig.md);
</script>

<div class="flex flex-col {className}">
	<div class="flex items-start {config.gap} min-w-0">
		{#if icon}
			<span class="shrink-0 text-primary {config.iconClass}">{@render icon()}</span>
		{/if}
		<div class="flex flex-col min-w-0">
			<h2 class="font-bold text-fg {config.title} leading-tight">
				{title}
			</h2>
			{#if subtitle}
				<p class="text-fg-muted {config.subtitle} mt-0.5 leading-tight">{subtitle}</p>
			{/if}
		</div>
	</div>
</div>
