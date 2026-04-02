<script>
	import { onMount, onDestroy } from 'svelte';

	let slotContainer;
	let container;

	onMount(() => {
		if (typeof window !== 'undefined' && slotContainer) {
			container = document.querySelector('#modal-root');
			if (container) {
				container.appendChild(slotContainer);
			}
		}
	});

	onDestroy(() => {
		if (container && slotContainer) {
			container.removeChild(slotContainer);
		}
	});
</script>

<div bind:this={slotContainer} class="fixed inset-0 z-999 flex items-center justify-center">
	<!-- Background -->
	<div class="absolute inset-0 bg-gray-500/75"></div>

	<!-- Modal content -->
	<div class="relative z-10">
		<slot />
	</div>
</div>