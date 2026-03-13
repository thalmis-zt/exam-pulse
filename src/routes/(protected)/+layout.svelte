<script>
	import '../../app.css';
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
import BottomNav          from '$lib/components/BottomNav.svelte';
	let { children } = $props();

	const route = $derived($page.url.pathname);
	const routesWithoutSidebar = ['/', '/login', '/rptview'];
	let showSidebar = $derived(!routesWithoutSidebar.includes(route));
</script>

<div class="flex min-h-screen bg-canvas">
	{#if showSidebar}
		<Sidebar />
	{/if}

	<main class="flex-1 flex flex-col  px-6 pt-6 pb-24 max-w-6xl mx-auto">
		{@render children?.()}
        <BottomNav />
	</main>
</div>


