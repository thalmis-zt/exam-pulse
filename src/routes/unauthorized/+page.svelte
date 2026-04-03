<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { browser } from '$app/environment';
	import { ArrowLeft, ShieldAlert } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';

	function goBack() {
		if (browser && window.history.length > 1) {
			window.history.back();
			return;
		}
		goto(resolve('/home'));
	}

	const redirectTo = $derived($page.url.searchParams.get('redirectTo'));
</script>

<svelte:head>
	<title>Access denied</title>
</svelte:head>

<div class="bg-canvas flex min-h-screen items-center justify-center px-4 py-12">
	<div class="w-full max-w-md">
		<div class="mb-8 flex flex-col items-center text-center">
			<div
				class="bg-danger/10 mb-5 flex size-14 items-center justify-center rounded-xl shadow-sm"
			>
				<ShieldAlert class="text-danger size-8" strokeWidth={2} aria-hidden="true" />
			</div>
			<h1 class="text-fg mb-2 text-2xl font-bold tracking-tight">Access denied</h1>
			<p class="text-fg-muted max-w-sm text-sm leading-relaxed">
				You don’t have permission to view this page or resource. If you think this is a mistake,
				try signing in with a different account or contact support.
			</p>
		</div>

		<div class="bg-surface-card border-stroke rounded-xl border p-6 shadow-sm">
			<div class="flex flex-col gap-3">
				{#if redirectTo}
					<p class="text-fg-muted text-center text-xs">
						Requested path:
						<span class="text-fg font-mono break-all">{redirectTo}</span>
					</p>
				{/if}
				<div class="flex w-full flex-row gap-3">
					<Button
						type="button"
						btnType="primary"
						customClass="min-w-0 flex-1 py-3 font-semibold rounded-xl"
						onclick={goBack}
					>
						<span class="inline-flex items-center justify-center gap-2">
							<ArrowLeft class="size-4 shrink-0" aria-hidden="true" />
							Go back
						</span>
					</Button>
					<Button
						type="button"
						btnType="ghost"
						customClass="min-w-0 flex-1 py-3 font-semibold rounded-xl"
						onclick={() => goto(resolve('/home'))}
					>
						Go to home
					</Button>
				</div>
			</div>
		</div>
	</div>
</div>
