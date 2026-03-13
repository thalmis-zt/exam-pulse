<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import { page } from '$app/stores';
	const route = $derived($page.url.pathname);
	let { children } = $props();

		const routesWithoutHeader = ['/', '/login', '/rptview'];

		let showHeader = $derived(!routesWithoutHeader.includes(route));
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="min-h-screen flex flex-col">
{#if showHeader}
		<Header />
	{/if}
	{@render children()}
	<Footer />
</div>
