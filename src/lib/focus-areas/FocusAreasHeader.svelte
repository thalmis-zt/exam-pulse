<script>
	import { Menu } from '@lucide/svelte';

	/**
	 * Focus Areas page header with title and menu icon
	 */
</script>

<div class="flex items-center justify-between w-full">
	<div>
		<h1 class="text-2xl md:text-3xl font-bold text-(--color-text)" style="font-family: Inter">Focus Areas</h1>
		<p class="text-xs md:text-sm text-(--color-text-muted) mt-1" style="font-family: Poppins">Track your progress and improve weak areas</p>
	</div>
	<button
		class="p-2 rounded-lg transition duration-(--motion-fast) ease-(--ease-standard) hover:bg-(--surface-card) active:brightness-95"
		aria-label="Menu"
	>
		<Menu size={24} class="text-(--color-text)" />
	</button>
</div>
