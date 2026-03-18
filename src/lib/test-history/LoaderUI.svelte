<script>
	let { message = 'Loading...' } = $props();
</script>

<!-- Loader UI -->
<div class="flex flex-col items-center justify-center py-12 md:py-16">
	<!-- Spinner -->
	<div class="mb-4">
		<div
			class="h-12 w-12 animate-spin rounded-full border-4 border-stroke border-t-primary"
			role="status"
			aria-label="Loading"
		></div>
	</div>

	<!-- Message -->
	<p class="text-fg-muted font-poppins text-sm md:text-base">
		{message}
	</p>
</div>
