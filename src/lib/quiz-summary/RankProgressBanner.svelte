<script>
	import { Trophy } from '@lucide/svelte';

	let {
		message = 'Only 250 XP left to reach Gold III! Keep up the momentum.',
		actionText = 'View Leaderboard',
		onViewLeaderboard = () => {}
	} = $props();
</script>

<div
	class="
		flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
		p-4 rounded-xl
		bg-info-surface border border-primary/20
	"
>
	<div class="flex items-start sm:items-center gap-3 min-w-0">
		<div
			class="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary shrink-0"
			aria-hidden="true"
		>
			<Trophy size={22} />
		</div>
		<p class="text-sm text-fg font-medium m-0">
			{message}
		</p>
	</div>
	<button
		onclick={onViewLeaderboard}
		class="
			text-sm font-semibold text-primary
			cursor-pointer bg-transparent border-none p-0
			hover:underline shrink-0
			inline-flex items-center gap-1 self-start sm:self-center
		"
	>
		{actionText}
		<span aria-hidden="true">›</span>
	</button>
</div>
