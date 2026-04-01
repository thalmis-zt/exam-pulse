<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getQuizAttemptData } from '$lib/quiz-attempt/mock/quiz-attempt.service.js';
	import QuizAttemptHeader from '$lib/quiz-attempt/QuizAttemptHeader.svelte';
	import QuizStatsBar from '$lib/quiz-attempt/QuizStatsBar.svelte';
	import QuizNavigationSidebar from '$lib/quiz-attempt/QuizNavigationSidebar.svelte';
	import QuizNavigationDrawer from '$lib/quiz-attempt/QuizNavigationDrawer.svelte';
	import QuestionContent from '$lib/quiz-attempt/QuestionContent.svelte';
	import QuizActionFooter from '$lib/quiz-attempt/QuizActionFooter.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Error from '$lib/components/Error.svelte';

	let { testId } = $props();

	/** @type {import('./mock/quiz-attempt.schema.js').QuizAttemptData | null} */
	let data = $state(null);
	/** @type {Record<string, string|null>} */
	let answers = $state({});
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	const timeDisplay = $state('2:28:45');
	const timeSpent = $state('0:45');

	let currentQuestionIndex = $state(4);

	let drawerOpen = $state(false);

	let markedQuestionIds = $state(new Set());

	const currentQuestion = $derived(
		data?.questions.find((q) => q.index === currentQuestionIndex) ?? null
	);

	function isAnswerFilled(/** @type {string | null | undefined} */ a) {
		if (a == null) return false;
		return String(a).trim().length > 0;
	}

	const answeredCount = $derived(
		data ? Object.values(answers).filter((a) => isAnswerFilled(a)).length : 0
	);
	const unansweredCount = $derived(
		data ? data.totalQuestions - answeredCount : 0
	);

	const questionsWithStatus = $derived(
		data
			? data.questions.map((q) => {
					const stored = data.questionStatuses[q.id] ?? 'not-visited';
					const status =
						q.index === currentQuestionIndex
							? 'current'
								: stored === 'current'
									? (isAnswerFilled(answers[q.id]) ? 'answered' : 'not-visited')
								: stored;
					return { id: q.id, index: q.index, status };
				})
			: []
	);

	async function loadQuizAttempt() {
		isLoading = true;
		hasError = false;
		errorMessage = '';
		try {
			data = await getQuizAttemptData(testId);
			if (data) {
				answers = { ...data.answers };
				const marked = data.questions
					.filter((q) => data.questionStatuses[q.id] === 'marked')
					.map((q) => q.id);
				markedQuestionIds = new Set(marked);
			}
		} catch (error) {
			console.error('Failed to load quiz attempt:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load quiz. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		loadQuizAttempt();
	});

	function handleSelectOption(label) {
		if (!currentQuestion) return;
		answers = { ...answers, [currentQuestion.id]: label };
	}

	function handleReportError() {
		// TODO: Open report error modal
		console.log('Report error');
	}

	function handlePrevious() {
		if (currentQuestionIndex > 1) currentQuestionIndex -= 1;
	}

	function handleNext() {
		if (data && currentQuestionIndex < data.totalQuestions) currentQuestionIndex += 1;
	}

	function handleMarkForReview() {
		if (!currentQuestion) return;
		markedQuestionIds = new Set(markedQuestionIds);
		if (markedQuestionIds.has(currentQuestion.id)) {
			markedQuestionIds.delete(currentQuestion.id);
		} else {
			markedQuestionIds.add(currentQuestion.id);
		}
	}

	function handleSaveAndNext() {
		handleNext();
	}

	function handleSubmit() {
		// TODO Phase 4/5: Submit flow
		console.log('Submit clicked');
	}

	function handleSelectQuestion(questionId) {
		const q = data?.questions.find((x) => x.id === questionId);
		if (q) currentQuestionIndex = q.index;
	}

	function handleQuizInstructions() {
		// TODO: Open instructions modal/sheet
		console.log('Quiz instructions');
	}

	function handleQuitAttempt() {
		if (confirm('Are you sure you want to quit? Your progress may be lost.')) {
			goto('/test-config');
		}
	}
</script>

<div class="flex min-h-screen flex-col  transition duration-motion-normal ease-ease-standard">
	{#if isLoading}
		<div class="flex flex-col items-center justify-center py-12">
			<Spinner message="Loading quiz..." />
		</div>
	{:else if hasError}
		<div class="px-4 py-4 lg:px-8">
			<Error
				title="Something went wrong"
				subtitle={errorMessage}
				showClose={false}
				action={{ text: 'Retry', handler: loadQuizAttempt }}
				class="w-full"
			/>
		</div>
	{:else if data}
		<!-- Sidebar + main: row from sm; below sm, question nav is the drawer only. -->
		<div class="flex min-h-screen w-full flex-1 flex-col sm:flex-row">
			<!-- Quiz navigation sidebar: tablet/desktop; hidden on xs (grid opens drawer) -->
			<div class="hidden sm:flex sm:min-h-screen sm:shrink-0">
				<QuizNavigationSidebar
					questions={questionsWithStatus}
					currentIndex={currentQuestionIndex}
					onSelectQuestion={handleSelectQuestion}
					onQuizInstructions={handleQuizInstructions}
					onQuitAttempt={handleQuitAttempt}
				/>
			</div>

			<!-- Main content area: Header full width, padding below for content -->
			<div class="flex min-w-0 flex-1 flex-col overflow-auto">
				<QuizAttemptHeader
					title={data.title}
					section={data.section}
					timeDisplay={timeDisplay}
					onSubmit={handleSubmit}
				/>

				<div class="flex flex-col gap-6 px-6 pb-6 pt-6 lg:px-8">
				<QuizStatsBar
					answered={answeredCount}
					unanswered={unansweredCount}
					timeSpent={timeSpent}
					currentQuestion={currentQuestionIndex}
					totalQuestions={data.totalQuestions}
					onOpenGrid={() => (drawerOpen = true)}
				/>

				{#if currentQuestion}
					<QuestionContent
						subject={currentQuestion.subject}
						text={currentQuestion.text}
						questionMedia={currentQuestion.questionMedia ?? []}
						stemMediaLayout={currentQuestion.stemMediaLayout ?? 'compact'}
						questionType={currentQuestion.questionType ?? 'mcq'}
						shortAnswerPlaceholder={currentQuestion.shortAnswerPlaceholder ?? 'Type your answer here'}
						shortAnswerInputType={currentQuestion.shortAnswerInputType ?? 'text'}
						textAnswer={answers[currentQuestion.id] ?? ''}
						onTextAnswerChange={(v) => {
							if (!currentQuestion) return;
							answers = { ...answers, [currentQuestion.id]: v };
						}}
						options={currentQuestion.options}
						positiveMarks={currentQuestion.positiveMarks}
						negativeMarks={currentQuestion.negativeMarks}
						selectedOption={answers[currentQuestion.id] ?? null}
						onSelectOption={handleSelectOption}
						onReportError={handleReportError}
					/>

					<QuizActionFooter
						hasPrevious={currentQuestionIndex > 1}
						hasNext={!!data && currentQuestionIndex < data.totalQuestions}
						onPrevious={handlePrevious}
						onNext={handleNext}
						onMarkForReview={handleMarkForReview}
						onSaveAndNext={handleSaveAndNext}
						isMarked={currentQuestion ? markedQuestionIds.has(currentQuestion.id) : false}
					/>
				{:else}
					<div
						class="bg-surface-card-subtle flex min-h-[200px] items-center justify-center rounded-lg border border-stroke p-6"
					>
						<p class="text-fg-muted text-sm">No question selected.</p>
					</div>
				{/if}
				</div>
			</div>
		</div>

		<!-- Mobile: Question navigation drawer -->
		<QuizNavigationDrawer
			open={drawerOpen}
			onClose={() => (drawerOpen = false)}
			questions={questionsWithStatus}
			currentIndex={currentQuestionIndex}
			onSelectQuestion={handleSelectQuestion}
			onQuizInstructions={handleQuizInstructions}
			onQuitAttempt={handleQuitAttempt}
		/>
	{:else}
		<div class="flex flex-col items-center justify-center gap-3 py-12">
			<p class="text-fg-muted">No quiz data available.</p>
		</div>
	{/if}
</div>
