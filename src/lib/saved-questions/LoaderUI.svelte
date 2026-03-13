<script>
	/**
	 * LoaderUI.svelte
	 * ===============
	 * Reusable loading spinner UI for async operations.
	 *
	 * Props:
	 * - message {string} - Loading message text
	 * - fullScreen {boolean} - Whether to fill full viewport height
	 */

	let { message = 'Loading...', fullScreen = false } = $props();
</script>

<div
	class="flex flex-col items-center justify-center gap-3 py-12"
	class:min-h-screen={fullScreen}
	class:min-h-96={!fullScreen}
>
	<!-- Spinner -->
	<div
		class="w-10 h-10 md:w-12 md:h-12 border-4 border-border border-t-primary rounded-full animate-spin"
	></div>

	<!-- Message -->
	{#if message}
		<p class="text-sm md:text-base text-fg-muted font-poppins text-center">
			{message}
		</p>
	{/if}
</div>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}
</style>
