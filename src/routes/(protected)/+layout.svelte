<script>
	import '../../app.css';
import Header from '$lib/components/Header.svelte';

	import { page } from '$app/stores';
	// import { sidebarCollapsed } from '$lib/stores/sidebarStore.js';

	let { children, data } = $props();

	const route = $derived($page.url.pathname);

	const routesWithoutHeader = ['/', '/login', '/rptview'];
	const routesWithoutSidebar = ['/', '/login', '/rptview'];

	let showHeader = $derived(!routesWithoutHeader.includes(route));
	let showSidebar = $derived(!routesWithoutSidebar.includes(route));

	

	
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

