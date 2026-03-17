<script>
	import { AlertCircle, RotateCcw } from '@lucide/svelte';

	let { message = 'Failed to load data', onRetry = () => {}, isDismissible = true } = $props();

	let isDismissed = $state(false);
</script>

<!-- Error UI -->
{#if !isDismissed}
	<div
		class="bg-danger-surface border border-danger rounded-lg p-4 md:p-5"
		role="alert"
		aria-live="polite"
		aria-atomic="true"
	>
		<div class="flex gap-3 md:gap-4">
			<!-- Icon -->
			<AlertCircle class="h-5 w-5 text-danger shrink-0 mt-0.5" />

			<!-- Content -->
			<div class="flex-1 min-w-0">
				<p class="text-danger font-poppins text-sm md:text-base font-medium">
					{message}
				</p>
			</div>

			<!-- Actions -->
			<div class="flex gap-2 shrink-0">
				<button
					onclick={onRetry}
					class="flex items-center gap-1 rounded px-3 py-1.5 text-xs md:text-sm font-poppins font-semibold text-danger hover:bg-danger/5 transition"
					title="Retry"
				>
					<RotateCcw class="h-4 w-4" />
					<span>Retry</span>
				</button>

				{#if isDismissible}
					<button
						onclick={() => (isDismissed = true)}
						class="text-xs md:text-sm font-poppins font-semibold text-danger hover:bg-danger/5 rounded px-3 py-1.5 transition"
						title="Dismiss"
					>
						Dismiss
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}
