<script>
	import { CheckCircle2, Navigation2, Clock, AlertCircle, Info, Copy, Check, Hexagon } from '@lucide/svelte';

	let { guidelines = [] } = $props();

	function getGuidelineIcon(iconName) {
		const iconMap = {
			CheckCircle2,
			Navigation2,
			Clock,
			AlertCircle,
			Info,
			Copy,
			Check,
			Hexagon
		};
		return iconMap[iconName] || CheckCircle2;
	}

	function getColorScheme(index) {
		const colorSchemes = [
			{ bg: 'bg-danger-surface/40', text: 'text-danger' },
			{ bg: 'bg-success-surface', text: 'text-success' },
			{ bg: 'bg-warning-surface', text: 'text-warning' },
			{ bg: 'bg-info-surface', text: 'text-info' }
		];
		return colorSchemes[index % colorSchemes.length];
	}
</script>

<!-- Guidelines Card -->
<div class="mt-4 flex items-center gap-2 px-1">
	<div class="bg-danger/20 text-danger rounded-md p-1.5">
		<AlertCircle size={12} />
	</div>
	<h2 class="text-fg text-xs font-semibold tracking-wider uppercase">Exam Guidelines</h2>
</div>

<div class="bg-surface-card border-stroke rounded-md border p-4 sm:p-6 py-2 shadow-sm">
	<!-- Guidelines List -->
	<div>
		{#each guidelines as guideline, index (guideline.id)}
			<div
				class={`flex gap-3 py-4 ${index < guidelines.length - 1 ? 'border-stroke border-b' : ''}`}
			>
				<!-- Icon -->
				<div>
					<div
						class={`flex items-center justify-center rounded-md p-2 ${getColorScheme(index).bg}`}
					>
						<svelte:component
							this={getGuidelineIcon(guideline.icon)}
							class={`h-4 w-4 ${getColorScheme(index).text}`}
						/>
					</div>
				</div>

				<!-- Content -->
				<div class="min-w-0 flex-1">
					<h3 class="text-fg text-xs font-medium sm:text-sm">{guideline.title}</h3>
					<p class="text-fg-muted text-2xs mt-1 sm:text-xs">{guideline.description}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
