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

<div class="flex min-h-screen flex-col  bg-base">

	{#if showHeader}
		<Header />
	{/if}

	<div class="flex flex-1">

		{#if showSidebar}
			<!-- space for sidebar -->
		{/if}

		<main class="flex-1 flex flex-col px-4 pt-4 pb-24">
			{@render children?.()}
		</main>

	</div>

	<!-- Footer component-->

</div>

