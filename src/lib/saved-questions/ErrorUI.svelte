<script>
	import { AlertCircle, RotateCcw } from '@lucide/svelte';

	/**
	 * ErrorUI.svelte
	 * ==============
	 * Reusable error state UI for displaying error messages and retry.
	 *
	 * Props:
	 * - message {string} - Error message to display
	 * - onRetry {function} - Retry handler
	 * - isDismissible {boolean} - Whether error can be dismissed
	 * - onDismiss {function} - Dismiss handler
	 */

	let { message = 'Something went wrong. Please try again.', onRetry, isDismissible = false, onDismiss } = $props();
</script>

<div class="flex flex-col gap-4 p-4 md:p-5 rounded-lg bg-danger-surface border border-danger">
	<!-- Error Header -->
	<div class="flex items-start gap-3">
		<AlertCircle size={20} class="flex-shrink-0 text-danger mt-0.5" />
		<div class="flex-1">
			<p class="font-semibold text-danger font-inter">An error occurred</p>
			<p class="text-sm text-danger/80 font-poppins mt-1 leading-relaxed">
				{message}
			</p>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex gap-2">
		{#if onRetry}
			<button
				class="flex items-center gap-2 px-4 py-2 rounded-lg bg-danger text-white font-semibold text-sm font-inter hover:brightness-95 transition-all duration-fast ease-standard"
				onclick={onRetry}
			>
				<RotateCcw size={14} />
				<span>Try Again</span>
			</button>
		{/if}

		{#if isDismissible && onDismiss}
			<button
				class="px-4 py-2 rounded-lg border border-danger text-danger font-semibold text-sm font-inter hover:bg-danger/5 transition-colors duration-fast ease-standard"
				onclick={onDismiss}
			>
				Dismiss
			</button>
		{/if}
	</div>
</div>
