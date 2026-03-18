<script>
	import { Trophy, TrendingUp, RefreshCw, Eye } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import Badge from '$lib/components/Badge.svelte';

	let {
		quizTitle = "Biology Basics",
		message = "You've conquered 'Biology Basics' with impressive accuracy. Your understanding of fundamental concepts is exceptional.",
		xpEarned = 420,
		onRetry = () => console.log('Retry Quiz'),
		onReview = () => console.log('Review Answers')
	} = $props();
</script>

<div
	class="
		flex flex-col items-center text-center
		px-6 py-8 sm:px-8 sm:py-10
		rounded-xl
		bg-gradient-to-r from-success-surface to-info-surface
		border border-stroke
		gap-5
	"
>
	<!-- Trophy icon -->
	<div
		class="
			flex items-center justify-center
			size-14 sm:size-16
			rounded-full bg-success
			text-canvas-base-fixed
		"
		aria-hidden="true"
	>
		<Trophy size={28} class="sm:w-8 sm:h-8" />
	</div>

	<!-- Heading -->
	<h2 class="text-xl sm:text-2xl font-bold text-fg m-0">Fantastic Work!</h2>

	<!-- Message -->
	<p class="text-sm sm:text-base text-fg-muted m-0 max-w-lg leading-relaxed">
		{message}
	</p>

	<!-- XP badge -->
	<Badge label="{xpEarned} XP Earned" variant="primary" size="md">
		{#snippet icon()}
			<TrendingUp size={18} />
		{/snippet}
	</Badge>

	<!-- Action buttons -->
	<div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:flex-wrap sm:justify-center">
		<Button btnType="secondary" onclick={onRetry} >
			<RefreshCw size={14} />
			Retry Quiz
		</Button>
		<Button
			btnType="ghost"
			onclick={onReview}
		>
			<Eye size={14} />
			Review Answers
		</Button>
	</div>
</div>
