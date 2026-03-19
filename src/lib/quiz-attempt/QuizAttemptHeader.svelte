<script>
	import { ArrowLeft } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import IconButton from '$lib/components/IconButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import TimerBadge from '$lib/components/TimerBadge.svelte';


	let { title, section = '', timeDisplay = '0:00', onBack, onSubmit } = $props();

	function handleBack() {
		if (onBack) {
			onBack();
		} else {
			goto(-1);
		}
	}
</script>

<header
	class="flex w-full shrink-0 flex-row flex-nowrap items-center justify-between gap-2 bg-surface-card px-4 py-3 lg:px-6"
>
	<!-- Left: Back + Title -->
	<div class="flex min-w-0 shrink items-center gap-2">
		<IconButton
			icon={ArrowLeft}
			ariaLabel="Go back"
			variant="ghost-subtle"
			size="md"
			onclick={handleBack}
		/>
		<div class="min-w-0 shrink">
			<h1 class="truncate text-sm font-bold text-fg sm:text-lg">{title}</h1>
			{#if section}
				<p class="hidden truncate text-sm text-fg-muted sm:block">{section}</p>
			{/if}
		</div>
	</div>

	<!-- Right: Timer + Submit (smaller on mobile) -->
	<div class="flex shrink-0 items-center gap-2 sm:gap-3">
		<div class="sm:hidden">
			<TimerBadge time={timeDisplay} variant="danger" size="sm" />
		</div>
		<div class="hidden sm:block">
			<TimerBadge time={timeDisplay} variant="danger" size="md" />
		</div>
		<Button
			btnType="danger"
			onclick={onSubmit}
			customClass="px-2.5 py-1 text-xs uppercase font-semibold sm:px-6 sm:py-2 sm:text-sm"
		>
			Submit
		</Button>
	</div>
</header>
