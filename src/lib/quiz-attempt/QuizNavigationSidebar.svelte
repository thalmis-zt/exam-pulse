<script>
	import QuizStatusLegend from './QuizStatusLegend.svelte';
	import QuestionGrid from './QuestionGrid.svelte';
	import QuizSidebarLinks from './QuizSidebarLinks.svelte';


	let {
		questions = [],
		currentIndex = 1,
		onSelectQuestion,
		onQuizInstructions,
		onQuitAttempt
	} = $props();
</script>

<aside
	class="flex h-full min-h-screen w-70 shrink-0 flex-col gap-4 border-r border-stroke bg-canvas-base p-6"
	aria-label="Quiz navigation"
>
	<h2 class="text-xs font-bold uppercase tracking-wide text-fg-muted">
		Quiz Navigation
	</h2>

	<QuizStatusLegend />

	<div class="min-h-0 flex-1 overflow-auto">
		<QuestionGrid
			{questions}
			{currentIndex}
			onSelect={onSelectQuestion}
			columns={5}
		/>
	</div>

	<QuizSidebarLinks
		onQuizInstructions={onQuizInstructions}
		onQuitAttempt={onQuitAttempt}
	/>
</aside>
