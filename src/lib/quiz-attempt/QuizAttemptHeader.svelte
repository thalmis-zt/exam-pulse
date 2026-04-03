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
	class="flex w-full shrink-0 flex-col gap-2 bg-surface-card px-4 py-3 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between sm:gap-3 lg:px-6"
>
	<!-- Row 1 mobile / left on sm+: Back + Title (title can wrap on small screens) -->
	<div class="flex min-w-0 items-center gap-2">
		<IconButton
			icon={ArrowLeft}
			ariaLabel="Go back"
			variant="ghost-subtle"
			size="md"
			onclick={handleBack}
		/>
		<div class="min-w-0 flex-1">
			<h1
				class="line-clamp-2 wrap-break-word text-sm font-bold leading-snug text-fg sm:line-clamp-none sm:truncate sm:text-lg"
			>
				{title}
			</h1>
			{#if section}
				<p class="hidden truncate text-sm text-fg-muted sm:block">{section}</p>
			{/if}
		</div>
	</div>

	<!-- Row 2 mobile / right on sm+: Timer + Submit -->
	<div
		class="flex w-full min-w-0 shrink-0 items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-3"
	>
		<div class="sm:hidden">
			<TimerBadge time={timeDisplay} variant="danger" size="sm" />
		</div>
		<div class="hidden sm:block">
			<TimerBadge time={timeDisplay} variant="danger" size="md" />
		</div>
		<Button
			btnType="danger"
			onclick={onSubmit}
			customClass="shrink-0 px-2.5 py-1 text-xs font-semibold uppercase sm:px-6 sm:py-2 sm:text-sm"
		>
			Submit
		</Button>
	</div>
</header>
