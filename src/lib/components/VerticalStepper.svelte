<script>
	let { steps = [], currentStep = 0 } = $props();

	function getStepStatus(step, index) {
		return step.status ?? (index < currentStep ? 'completed' : index === currentStep ? 'active' : 'inactive');
	}

	const styles = $derived.by(() => {
		const baseIndicator = 'flex shrink-0 items-center justify-center rounded-full transition duration-(--motion-fast) ease-(--ease-standard)';
		const indicatorByStatus = {
			completed: `${baseIndicator} bg-secondary text-white size-7`,
			active: `${baseIndicator} bg-primary text-white size-7`,
			inactive: `${baseIndicator} bg-stroke text-fg-muted size-7`
		};
		const labelByStatus = {
			completed: 'text-base font-medium text-fg',
			active: 'text-base font-medium text-fg',
			inactive: 'text-base font-medium text-fg-muted'
		};
		return { indicatorByStatus, labelByStatus };
	});
</script>

<nav class="flex flex-col" aria-label="Progress">
	{#each steps as step, index (step.id ?? index)}
		{@const status = getStepStatus(step, index)}
		<div class="flex items-start gap-3">
			<!-- Step indicator + connector -->
			<div class="flex flex-col items-center">
				<div
					class={styles.indicatorByStatus[status]}
					aria-current={status === 'active' ? 'step' : undefined}
				>
					{#if status === 'completed'}
						<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
						</svg>
					{:else}
						<span class="text-sm font-semibold">{index + 1}</span>
					{/if}
				</div>
				{#if index < steps.length - 1}
					<div class="mt-1 min-h-4 w-px flex-1 bg-stroke" aria-hidden="true"></div>
				{/if}
			</div>

			<!-- Label -->
			<div class="pb-5 pt-0.5">
				<span class={styles.labelByStatus[status]}>
					{step.label}
				</span>
			</div>
		</div>
	{/each}
</nav>
