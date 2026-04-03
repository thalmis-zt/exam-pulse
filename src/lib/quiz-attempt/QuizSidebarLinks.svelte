<script>
	import { Info, LogOut } from '@lucide/svelte';


	let {
		onQuizInstructions,
		onQuitAttempt,
		instructionsLabel = 'Quiz Instructions',
		exitLabel = 'Quit Attempt',
		/** When false, only the exit action is shown (e.g. exam review → results). */
		showInstructions = true
	} = $props();
</script>

<div class="flex flex-col gap-2 border-t border-stroke pt-4">
	{#if showInstructions}
		<button
			type="button"
			class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-fg-muted transition hover:bg-stroke hover:text-fg"
			onclick={onQuizInstructions}
		>
			<Info size={16} class="shrink-0" aria-hidden="true" />
			{instructionsLabel}
		</button>
	{/if}
	<button
		type="button"
		class="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm font-medium text-danger transition hover:bg-danger-surface"
		onclick={onQuitAttempt}
	>
		<LogOut size={16} class="shrink-0" aria-hidden="true" />
		{exitLabel}
	</button>
</div>
