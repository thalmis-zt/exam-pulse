<script>
	let { subject, icon: IconComponent, count, backgroundColor = 'default', isActive = false, onclick } = $props();

	const bgMap = {
		default: 'bg-surface-card',
		blue: 'bg-info-surface',
		green: 'bg-success-surface/50',
		red: 'bg-danger-surface/50'
	};

	const bgClass = $derived(bgMap[backgroundColor] ?? bgMap.default);
</script>

<button
	class="flex flex-col md:flex-row md:items-center md:gap-3 gap-2 p-4 rounded-lg {bgClass} transition-all duration-fast ease-standard cursor-pointer shadow-sm"
	{onclick}
>
	<!-- Icon -->
	<div class="flex-shrink-0 text-primary bg-canvas-base/80 w-10 h-10 rounded-lg flex items-center justify-center">
		<svelte:component this={IconComponent} size={16} strokeWidth={1.5} />
	</div>

	<!-- Content Wrapper -->
	<div class="flex flex-col items-start">
		<!-- Subject Name -->
		<span class="text-2xs font-semibold text-fg-muted font-inter uppercase tracking-wide">
			{subject}
		</span>

		<!-- Count -->
		<span class="text-base font-bold text-fg font-Inter">
			{count}
		</span>
	</div>
</button>


