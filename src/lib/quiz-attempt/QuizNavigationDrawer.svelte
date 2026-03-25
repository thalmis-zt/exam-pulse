<script>
	import { X } from '@lucide/svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import QuizStatusLegend from './QuizStatusLegend.svelte';
	import QuestionGrid from './QuestionGrid.svelte';
	import QuizSidebarLinks from './QuizSidebarLinks.svelte';

	/**
	 * @typedef {'current'|'answered'|'marked'|'not-visited'} QuestionStatus
	 * @typedef {Object} Props
	 * @property {boolean} open - Whether drawer is open
	 * @property {() => void} onClose - Close handler
	 * @property {Array<{id: string, index: number, status: QuestionStatus}>} questions - Questions with status
	 * @property {number} currentIndex - 1-based current question index
	 * @property {(questionId: string) => void} [onSelectQuestion] - Question click handler (also closes drawer)
	 * @property {() => void} [onQuizInstructions] - Quiz instructions handler
	 * @property {() => void} [onQuitAttempt] - Quit attempt handler
	 */

	let {
		open = false,
		onClose,
		questions = [],
		currentIndex = 1,
		onSelectQuestion,
		onQuizInstructions,
		onQuitAttempt
	} = $props();

	function handleSelectQuestion(questionId) {
		onSelectQuestion?.(questionId);
		onClose();
	}
</script>

{#if open}
	<!-- Backdrop -->
	<button
		type="button"
		class="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
		aria-label="Close navigation"
		onclick={onClose}
	></button>

	<!-- Drawer panel -->
	<div
		class="fixed inset-x-0 bottom-0 z-50 flex max-h-[85vh] flex-col rounded-t-2xl border border-stroke border-b-0 bg-surface-card p-4 shadow-lg transition-transform"
		role="dialog"
		aria-modal="true"
		aria-label="Question navigation"
	>
		<!-- Handle bar -->
		<div class="mx-auto mb-2 h-1.5 w-12 rounded-full bg-stroke" aria-hidden="true"></div>

		<div class="flex items-center justify-between">
			<h2 class="text-xs font-bold uppercase tracking-wide text-fg-muted">
				Quiz Navigation
			</h2>
			<IconButton icon={X} ariaLabel="Close" variant="ghost-subtle" size="md" onclick={onClose} />
		</div>

		<QuizStatusLegend />

		<div class="min-h-0 flex-1 overflow-y-auto py-4">
			<QuestionGrid
				{questions}
				{currentIndex}
				onSelect={handleSelectQuestion}
				columns={5}
			/>
		</div>

		<QuizSidebarLinks
			onQuizInstructions={onQuizInstructions}
			onQuitAttempt={onQuitAttempt}
		/>
	</div>
{/if}
