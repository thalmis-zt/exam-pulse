<script>
	import QuizStatusLegend from './QuizStatusLegend.svelte';
	import QuestionGrid from './QuestionGrid.svelte';
	import QuizSidebarLinks from './QuizSidebarLinks.svelte';


	let {
		questions = [],
		currentIndex = 1,
		onSelectQuestion,
		onQuizInstructions,
		onQuitAttempt,
		title = 'Quiz Navigation',
		legendVariant = 'attempt',
		instructionsLabel = 'Quiz Instructions',
		exitLabel = 'Quit Attempt',
		/** Tighter rail when nested next to main app sidebar (e.g. exam review) */
		variant = 'attempt',
		/** Instructions + exit row */
		showFooterLinks = true,
		/** Set false on exam review to show only “Back to results”. */
		showInstructions = true,
		/** Passed to `QuizStatusLegend` when `legendVariant` is `review` */
		reviewCounts = null
	} = $props();
</script>

<aside
	class="flex h-full shrink-0 flex-col border-r border-stroke bg-canvas-base {variant === 'review'
		? 'min-h-0 w-[17rem] gap-3 p-4 lg:w-[18rem] lg:p-5'
		: 'min-h-screen w-70 gap-4 p-6'}"
	aria-label="Quiz navigation"
>
	<h2 class="text-xs font-bold uppercase tracking-wide text-fg-muted">
		{title}
	</h2>

	<QuizStatusLegend variant={legendVariant} {reviewCounts} />

	<div class="min-h-0 flex-1 overflow-auto">
		<QuestionGrid
			{questions}
			{currentIndex}
			onSelect={onSelectQuestion}
			columns={5}
		/>
	</div>

	{#if showFooterLinks}
		<QuizSidebarLinks
			onQuizInstructions={onQuizInstructions}
			onQuitAttempt={onQuitAttempt}
			{instructionsLabel}
			{exitLabel}
			{showInstructions}
		/>
	{/if}
</aside>
