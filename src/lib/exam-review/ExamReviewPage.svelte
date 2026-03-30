<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		ArrowLeft,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		Clock,
		ClipboardList,
		Filter,
		LayoutList,
		SquareStack,
		Calendar,
		X
	} from '@lucide/svelte';
	import { getExamReviewData } from '$lib/exam-review/mock/exam-review.service.js';
	import ExamReviewQuestionBlock from '$lib/exam-review/ExamReviewQuestionBlock.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Error from '$lib/components/Error.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import Badge from '$lib/components/Badge.svelte';

	/** @type {readonly { id: string, label: string, value: 'all' | 'correct' | 'incorrect' | 'unanswered' }[]} */
	const RESULT_FILTER_OPTIONS = [
		{ id: 'all', label: 'All', value: 'all' },
		{ id: 'correct', label: 'Correct', value: 'correct' },
		{ id: 'incorrect', label: 'Incorrect', value: 'incorrect' },
		{ id: 'unanswered', label: 'Unanswered', value: 'unanswered' }
	];

	let { examAttemptId } = $props();

	/** @type {import('./exam-review.schema.js').ExamReviewData | null} */
	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	const LIST_PAGE_SIZE = 10;

	/** @type {'single' | 'list'} */
	let viewMode = $state('single');
	let currentIndex = $state(0);
	let listPage = $state(1);

	let searchQuery = $state('');
	/** @type {'all' | 'correct' | 'incorrect' | 'unanswered'} */
	let outcomeFilter = $state('all');

	let showFilters = $state(false);
	/** @type {Record<string, unknown>} */
	let filterPanelValue = $state({});

	/** @type {Record<string, boolean>} */
	let revealedByQuestionId = $state({});

	/**
	 * @param {import('$lib/quiz-attempt/mock/quiz-attempt.schema.js').Question} q
	 * @param {import('./exam-review.schema.js').ExamReviewData} d
	 */
	function outcomeForQuestion(q, d) {
		const ua = d.userAnswers[q.id] ?? null;
		const ca = d.correctAnswers[q.id];
		if (ua == null) return 'unanswered';
		if (ua === ca) return 'correct';
		return 'incorrect';
	}

	/** Search + result filter apply only to the “All questions” list view */
	const listFilteredQuestions = $derived.by(() => {
		if (!data) return [];
		const q = searchQuery.trim().toLowerCase();
		return data.questions.filter((question) => {
			const oc = outcomeForQuestion(question, data);
			if (outcomeFilter !== 'all' && oc !== outcomeFilter) return false;

			if (q) {
				const inText = question.text.toLowerCase().includes(q);
				const inNum =
					String(question.index).includes(q) ||
					`question ${question.index}`.includes(q) ||
					`q${question.index}`.includes(q);
				if (!inText && !inNum) return false;
			}
			return true;
		});
	});

	/** “Question by question” walks the full exam; list view uses filters */
	const activeQuestionList = $derived(
		viewMode === 'single' ? (data?.questions ?? []) : listFilteredQuestions
	);

	const currentQuestion = $derived(activeQuestionList[currentIndex] ?? null);

	const totalListPages = $derived(
		Math.max(1, Math.ceil(listFilteredQuestions.length / LIST_PAGE_SIZE))
	);

	const listPageQuestions = $derived(
		listFilteredQuestions.slice((listPage - 1) * LIST_PAGE_SIZE, listPage * LIST_PAGE_SIZE)
	);

	const listRangeLabel = $derived.by(() => {
		if (!data || listFilteredQuestions.length === 0) return '';
		const start = (listPage - 1) * LIST_PAGE_SIZE + 1;
		const end = Math.min(listPage * LIST_PAGE_SIZE, listFilteredQuestions.length);
		return `Showing ${start}–${end} of ${listFilteredQuestions.length} (filtered from ${data.questions.length})`;
	});

	const durationLabel = $derived.by(() => {
		if (!data) return '';
		const s = data.durationSeconds;
		const h = Math.floor(s / 3600);
		const m = Math.floor((s % 3600) / 60);
		if (h > 0) return `${h}h ${m}m`;
		return `${m} min`;
	});

	const completedLabel = $derived.by(() => {
		if (!data?.completedAt) return '';
		try {
			return new Date(data.completedAt).toLocaleString(undefined, {
				dateStyle: 'medium',
				timeStyle: 'short'
			});
		} catch {
			return data.completedAt;
		}
	});

	const resultFilterPanelFilters = $derived([
		{ key: 'result', label: 'Result', options: [...RESULT_FILTER_OPTIONS] }
	]);

	const appliedResultLabel = $derived(
		RESULT_FILTER_OPTIONS.find((o) => o.value === outcomeFilter)?.label ?? 'All'
	);

	$effect(() => {
		if (showFilters) {
			const opt =
				RESULT_FILTER_OPTIONS.find((o) => o.value === outcomeFilter) ?? RESULT_FILTER_OPTIONS[0];
			filterPanelValue = { result: opt };
		}
	});

	$effect(() => {
		searchQuery;
		outcomeFilter;
		if (data) {
			currentIndex = 0;
			listPage = 1;
		}
	});

	async function load() {
		isLoading = true;
		hasError = false;
		errorMessage = '';
		try {
			const review = await getExamReviewData(examAttemptId);
			if (review.status !== 'completed') {
				throw new Error('This exam is not completed yet.');
			}
			data = review;
			currentIndex = 0;
			listPage = 1;
			revealedByQuestionId = {};
			searchQuery = '';
			outcomeFilter = 'all';
			showFilters = false;
			filterPanelValue = {};
		} catch (e) {
			console.error(e);
			hasError = true;
			errorMessage = e?.message || 'Could not load exam review.';
		} finally {
			isLoading = false;
		}
	}

	function revealCurrent() {
		const q = currentQuestion;
		if (!q) return;
		revealedByQuestionId = { ...revealedByQuestionId, [q.id]: true };
	}

	function setReveal(questionId, value) {
		revealedByQuestionId = { ...revealedByQuestionId, [questionId]: value };
	}

	/** @param {Record<string, unknown>} v */
	function handleApplyResultFilters(v) {
		const sel = v?.result;
		if (sel && typeof sel === 'object' && sel !== null && 'value' in sel) {
			outcomeFilter = /** @type {'all' | 'correct' | 'incorrect' | 'unanswered'} */ (sel.value);
		} else {
			outcomeFilter = 'all';
		}
		showFilters = false;
	}

	function handleClearResultFilters() {
		filterPanelValue = {};
		outcomeFilter = 'all';
		showFilters = false;
	}

	function clearResultFilter() {
		outcomeFilter = 'all';
	}

	onMount(load);
</script>

<div class="flex flex-col gap-6">
	<button
		type="button"
		class="inline-flex w-fit cursor-pointer items-center gap-2 rounded-sm border-none bg-transparent p-0 text-sm font-medium text-primary hover:underline"
		onclick={() => goto(`/tests/${examAttemptId}/result`)}
	>
		<ArrowLeft size={16} aria-hidden="true" />
		Back to results
	</button>

	{#if isLoading}
		<div class="flex min-h-[200px] flex-col items-center justify-center py-12">
			<Spinner message="Loading review..." />
		</div>
	{:else if hasError}
		<Error
			title="Unable to load review"
			subtitle={errorMessage}
			showClose={false}
			action={{ text: 'Retry', handler: load }}
			class="w-full"
		/>
	{:else if data}
		<SectionHeader
			title={data.title}
			subtitle={data.section ? data.section : 'Review your answers'}
		/>

		<!-- Exam metadata -->
		<div class="flex flex-wrap items-center gap-2" role="list" aria-label="Exam summary">
			<Badge label="Correct: {data.correctCount}" variant="success" size="sm" />
			<Badge label="Wrong: {data.wrongCount}" variant="danger" size="sm" />
			<Badge label="Unanswered: {data.unansweredCount}" variant="default" size="sm" />
			<Badge label="Duration: {durationLabel}" variant="default" size="sm">
				{#snippet icon()}<Clock size={14} aria-hidden="true" />{/snippet}
			</Badge>
			{#if completedLabel}
				<Badge label="Completed: {completedLabel}" variant="default" size="sm">
					{#snippet icon()}<Calendar size={14} aria-hidden="true" />{/snippet}
				</Badge>
			{/if}
			<Badge label="{data.totalQuestions} questions" variant="primary" size="sm">
				{#snippet icon()}<ClipboardList size={14} aria-hidden="true" />{/snippet}
			</Badge>
		</div>

		<!-- View mode -->
		<div class="flex flex-wrap items-center gap-2">
			<Button
				btnType={viewMode === 'single' ? 'primary' : 'ghost'}
				type="button"
				onclick={() => {
					viewMode = 'single';
					showFilters = false;
				}}
				customClass="gap-2"
			>
				<SquareStack size={16} />
				Question by question
			</Button>
			<Button
				btnType={viewMode === 'list' ? 'primary' : 'ghost'}
				type="button"
				onclick={() => {
					viewMode = 'list';
					listPage = 1;
				}}
				customClass="gap-2"
			>
				<LayoutList size={16} />
				All questions
			</Button>
		</div>

		<!-- Search & result filter: only for “All questions” -->
		{#if viewMode === 'list'}
			<div class="flex flex-col gap-3 sm:gap-4">
				<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div class="min-w-0 flex-1">
						<SearchBar
							bind:value={searchQuery}
							variant="md"
							placeholder="Search question text or number…"
							className="w-full"
						/>
					</div>
					<Button
						btnType="primaryLight"
						type="button"
						onclick={() => (showFilters = !showFilters)}
						title="Toggle filters"
						customClass="shrink-0 gap-2"
					>
						<Filter class="h-4 w-4" aria-hidden="true" />
						<span>{showFilters ? 'Hide' : 'Show'} filters</span>
					</Button>
				</div>

				{#if outcomeFilter !== 'all'}
					<div class="flex flex-wrap items-center gap-2">
						<span class="font-poppins text-2xs font-semibold text-fg-muted sm:text-xs">Filter applied:</span>
						<div
							class="flex items-center gap-1 rounded-full border border-primary bg-primary-light px-3 py-1 text-xs text-primary"
						>
							<span>{appliedResultLabel}</span>
							<button
								type="button"
								onclick={clearResultFilter}
								class="ml-0.5 transition-opacity hover:opacity-70"
								title="Remove result filter"
							>
								<X size={14} aria-hidden="true" />
							</button>
						</div>
					</div>
				{/if}

				{#if showFilters}
					<FilterPanel
						filters={resultFilterPanelFilters}
						bind:value={filterPanelValue}
						onApply={handleApplyResultFilters}
						onClear={handleClearResultFilters}
					/>
				{/if}
			</div>
		{/if}

		{#if viewMode === 'list' && listFilteredQuestions.length === 0}
			<p class="m-0 rounded-lg border border-dashed border-stroke bg-canvas px-4 py-8 text-center text-sm text-fg-muted">
				No questions match your search or result filter. Try changing the result filter or clearing the search.
			</p>
		{:else if viewMode === 'single' && currentQuestion}
			<ExamReviewQuestionBlock
				question={currentQuestion}
				userAnswer={data.userAnswers[currentQuestion.id] ?? null}
				correctLabel={data.correctAnswers[currentQuestion.id]}
				revealed={revealedByQuestionId[currentQuestion.id] === true}
				onReveal={revealCurrent}
			/>

			<div class="flex items-center justify-between gap-3">
				<IconButton
					icon={ChevronLeft}
					ariaLabel="Previous question"
					variant="outline"
					size="md"
					disabled={currentIndex <= 0}
					onclick={() => {
						currentIndex = Math.max(0, currentIndex - 1);
					}}
				/>
				<span class="text-sm text-fg-muted">
					{currentIndex + 1} / {activeQuestionList.length}
				</span>
				<IconButton
					icon={ChevronRight}
					ariaLabel="Next question"
					variant="outline"
					size="md"
					disabled={currentIndex >= activeQuestionList.length - 1}
					onclick={() => {
						currentIndex = Math.min(activeQuestionList.length - 1, currentIndex + 1);
					}}
				/>
			</div>
		{:else if viewMode === 'list'}
			<p class="m-0 text-sm text-fg-muted">{listRangeLabel}</p>

			<div class="flex flex-col gap-3">
				{#each listPageQuestions as q (q.id)}
					{@const oc = outcomeForQuestion(q, data)}
					{@const preview = q.text.length > 100 ? `${q.text.slice(0, 100)}…` : q.text}
					<details
						open
						class="group overflow-hidden rounded-lg border border-stroke bg-surface-card shadow-sm"
					>
						<summary
							class="flex cursor-pointer list-none items-center justify-between gap-3 bg-surface-card-subtle px-4 py-3 text-left [&::-webkit-details-marker]:hidden"
						>
							<div class="flex min-w-0 flex-1 flex-col gap-1">
								<div class="flex flex-wrap items-center gap-2">
									<span class="text-sm font-bold text-fg">Q{q.index}</span>
									<Badge label={q.subject} variant="primary" size="sm" />
									{#if oc === 'correct'}
										<span class="text-xs font-semibold text-success">Correct</span>
									{:else if oc === 'incorrect'}
										<span class="text-xs font-semibold text-danger">Incorrect</span>
									{:else}
										<span class="text-xs font-medium text-fg-muted">Unanswered</span>
									{/if}
								</div>
								<p class="m-0 line-clamp-2 text-xs text-fg-muted">{preview}</p>
							</div>
							<span
								class="inline-flex shrink-0 text-fg-muted transition-transform duration-(--motion-fast) ease-(--ease-standard) group-open:rotate-180"
								aria-hidden="true"
							>
								<ChevronDown size={20} strokeWidth={2} />
							</span>
						</summary>
						<div class="border-t border-stroke">
							<ExamReviewQuestionBlock
								embedded
								showHeader={false}
								question={q}
								userAnswer={data.userAnswers[q.id] ?? null}
								correctLabel={data.correctAnswers[q.id]}
								revealed={revealedByQuestionId[q.id] === true}
								onReveal={() => setReveal(q.id, true)}
							/>
						</div>
					</details>
				{/each}
			</div>

			{#if totalListPages > 1}
				<div
					class="flex flex-col items-stretch justify-between gap-3 border-t border-stroke pt-4 sm:flex-row sm:items-center"
				>
					<span class="text-center text-sm text-fg-muted sm:text-left">
						Page {listPage} of {totalListPages}
					</span>
					<div class="flex items-center justify-center gap-2">
						<Button
							btnType="neutral"
							type="button"
							disabled={listPage <= 1}
							onclick={() => (listPage = Math.max(1, listPage - 1))}
							customClass="min-w-[100px] normal-case"
						>
							<ChevronLeft size={16} />
							Previous
						</Button>
						<Button
							btnType="neutral"
							type="button"
							disabled={listPage >= totalListPages}
							onclick={() => (listPage = Math.min(totalListPages, listPage + 1))}
							customClass="min-w-[100px] normal-case"
						>
							Next
							<ChevronRight size={16} />
						</Button>
					</div>
				</div>
			{/if}
		{/if}
	{/if}
</div>
