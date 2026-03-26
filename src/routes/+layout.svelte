<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { children } = $props();

	const route = $derived($page.url.pathname);
	const isQuizAttempt = $derived(/^\/tests\/[^/]+\/attempt\/?$/.test(route));

	const routesWithoutHeader = ['/', '/login', '/register', '/verify-otp', '/rptview'];
	const showHeader = $derived(!routesWithoutHeader.includes(route) && !isQuizAttempt);
	const showFooter = $derived(!routesWithoutHeader.includes(route));

	async function handleLogout() {
		await fetch('/apis/logout', { method: 'POST', credentials: 'include' });
		goto('/login');
	}
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen flex flex-col">
	{#if showHeader}
		<Header onLogout={handleLogout} />
	{/if}
	{@render children()}
	{#if showFooter}
		<Footer />
	{/if}
</div>
