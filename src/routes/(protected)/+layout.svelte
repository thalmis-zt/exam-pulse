<script>
	import '../../app.css';
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import BottomNav from '$lib/components/BottomNav.svelte';

	let { children } = $props();

	const route = $derived($page.url.pathname);
	const isQuizAttempt = $derived(/^\/tests\/[^/]+\/attempt\/?$/.test(route));

	const routesWithoutSidebar = ['/', '/login', '/register', '/verify-otp', '/rptview'];
	const showSidebar = $derived(!routesWithoutSidebar.includes(route) && !isQuizAttempt);
</script>

<div class="flex min-h-screen bg-canvas">
	{#if showSidebar}
		<Sidebar />
	{/if}

	<main
		class="flex-1 flex flex-col w-full min-w-0 {isQuizAttempt
			? 'pb-24 lg:pb-0'
			: 'px-4 sm:px-6 pt-6 pb-24'}"
	>
		{@render children?.()}
		<BottomNav />
	</main>
</div>


