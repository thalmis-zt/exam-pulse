<script>
	import { BookOpen } from '@lucide/svelte';

	let { onStartTest = () => {} } = $props();
</script>

<!-- Empty State -->
<div class="flex flex-col items-center justify-center py-12 md:py-16">
	<!-- Icon -->
	<div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-info/10">
		<BookOpen class="h-8 w-8 text-info" />
	</div>

	<!-- Title -->
	<h3 class="text-fg font-inter mb-2 text-base font-bold md:text-lg">No tests yet</h3>

	<!-- Description -->
	<p class="text-fg-muted font-poppins mb-6 max-w-sm text-center text-sm md:text-base">
		Start your first quiz to see your progress here. Track your performance and improve over time.
	</p>

	<!-- Action Button -->
	<button
		onclick={onStartTest}
		class="bg-primary hover:bg-primary-hover text-white font-inter inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold duration-motion-fast ease-ease-standard transition md:text-base"
	>
		<BookOpen class="h-4 w-4" />
		<span>Take First Test</span>
	</button>
</div>
