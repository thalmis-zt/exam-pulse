<script>
	import '../layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<div class="flex flex-col bg-canvas">

	{#if showHeader}
		<Header />
	{/if}

	<div class="">

		{#if showSidebar}
			<!-- space for sidebar -->
             <!-- <aside>Sidebar</aside> -->
		{/if}

		<main class="flex-1 flex flex-col px-4 pt-4 pb-24 min-h-screen max-w-6xl mx-auto">
			{@render children?.()}
		</main>

	</div>

	<!-- Footer component-->

</div>

