<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		Bookmark,
		BookMarked,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		Clock,
		ClipboardList,
		Eye,
		Filter,
		LayoutGrid,
		LayoutList,
		Calendar,
		X
	} from '@lucide/svelte';
	import { getExamReviewData } from '$lib/exam-review/mock/exam-review.service.js';
	import ExamReviewQuestionBlock from '$lib/exam-review/ExamReviewQuestionBlock.svelte';
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Error from '$lib/components/Error.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import FilterPanel from '$lib/components/FilterPanel.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import QuizNavigationSidebar from '$lib/quiz-attempt/QuizNavigationSidebar.svelte';
	import QuizNavigationDrawer from '$lib/quiz-attempt/QuizNavigationDrawer.svelte';
	import {
		isSavedFromReview,
		toggleSaveQuestionFromReview
	} from '$lib/saved-questions/mock/saved-questions.service.js';

	/** @type {readonly { id: string, label: string, value: 'all' | 'correct' | 'incorrect' | 'unanswered' }[]} */
	const RESULT_FILTER_OPTIONS = [
		{ id: 'all', label: 'All', value: 'all' },
		{ id: 'correct', label: 'Correct', value: 'correct' },
		{ id: 'incorrect', label: 'Incorrect', value: 'incorrect' },
		{ id: 'unanswered', label: 'Unanswered', value: 'unanswered' }
	];

	const SUBJECT_FALLBACK = 'General';

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

	let navDrawerOpen = $state(false);

	/** Saved-for-later flags keyed by question id (synced with mock saved-questions service). */
	let savedReviewFlags = $state(/** @type {Record<string, boolean>} */ ({}));
	let savePendingId = $state(/** @type {string | null} */ (null));

	function refreshSavedReviewFlags() {
		if (!data) return;
		const m = /** @type {Record<string, boolean>} */ ({});
		for (const q of data.questions) {
			m[q.id] = isSavedFromReview(examAttemptId, q.id);
		}
		savedReviewFlags = m;
	}

	async function handleToggleSaveQuestion(questionId) {
		const q = data?.questions.find((x) => x.id === questionId);
		if (!q || !data) return;
		savePendingId = questionId;
		try {
			await toggleSaveQuestionFromReview(examAttemptId, q, data.correctAnswers[q.id], data.title);
			refreshSavedReviewFlags();
		} finally {
			savePendingId = null;
		}
	}

	/**
	 * @param {import('$lib/quiz-attempt/mock/quiz-attempt.schema.js').Question} q
	 * @param {import('./exam-review.schema.js').ExamReviewData} d
	 */
	function outcomeForQuestion(q, d) {
		const ua = d.userAnswers[q.id] ?? null;
		const ca = d.correctAnswers[q.id];
		if (ua == null) return 'unanswered';
		if (q.questionType === 'short_answer') {
			if (String(ua).trim() === '') return 'unanswered';
			const caStr = String(ca ?? '').trim();
			if (q.shortAnswerInputType === 'number') {
				const nU = Number(String(ua).trim());
				const nC = Number(caStr);
				if (Number.isFinite(nU) && Number.isFinite(nC) && nU === nC) return 'correct';
				return 'incorrect';
			}
			if (String(ua).trim().toLowerCase() === caStr.toLowerCase()) return 'correct';
			return 'incorrect';
		}
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

	/** Full exam grid for nav: maps review outcomes to grid status styles */
	const questionsForNavGrid = $derived.by(() => {
		if (!data) return [];
		return data.questions.map((q) => {
			const oc = outcomeForQuestion(q, data);
			const outcomeStatus =
				oc === 'correct' ? 'answered' : oc === 'incorrect' ? 'wrong' : 'not-visited';
			const saved = !!savedReviewFlags[q.id];
			const status = saved ? 'marked' : outcomeStatus;
			const subject = (q.subject && String(q.subject).trim()) || SUBJECT_FALLBACK;
			return { id: q.id, index: q.index, status, subject, showBookmark: saved };
		});
	});

	const reviewNavSections = $derived.by(() => {
		const items = questionsForNavGrid;
		if (items.length === 0) return [];
		/** @type {Map<string, typeof items>} */
		const bySubject = new Map();
		/** @type {string[]} */
		const subjectOrder = [];
		for (const it of items) {
			const s = it.subject;
			if (!bySubject.has(s)) {
				bySubject.set(s, []);
				subjectOrder.push(s);
			}
			bySubject.get(s)?.push(it);
		}
		return subjectOrder.map((subject) => ({
			subject,
			questions: /** @type {typeof items} */ (bySubject.get(subject) ?? [])
		}));
	});

	/** Which subject accordion is expanded in one-by-one view (list view uses expand-all). */
	const reviewExpandedSubjectKey = $derived.by(() => {
		if (!data) return SUBJECT_FALLBACK;
		if (viewMode === 'list') return '';
		const q = currentQuestion;
		if (!q) return SUBJECT_FALLBACK;
		return (q.subject && String(q.subject).trim()) || SUBJECT_FALLBACK;
	});

	/** 1-based question # for grid “current”; 0 = none highlighted */
	const navGridCurrentIndex = $derived(
		viewMode === 'single' ? (currentQuestion?.index ?? 0) : 0
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
			refreshSavedReviewFlags();
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

	function handleNavSelectQuestion(questionId) {
		const idx = data?.questions.findIndex((q) => q.id === questionId) ?? -1;
		if (idx < 0 || !data) return;
		viewMode = 'single';
		currentIndex = idx;
		showFilters = false;
	}

	function exitReviewToResults() {
		goto(`/tests/${examAttemptId}/result`);
		navDrawerOpen = false;
	}

	onMount(load);
</script>

<div class="flex min-h-0 flex-1 flex-col">
	{#if isLoading}
		<div class="flex min-h-[200px] flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6">
			<Spinner message="Loading review..." />
		</div>
	{:else if hasError}
		<div class="px-4 pt-6 sm:px-6">
			<Error
				title="Unable to load review"
				subtitle={errorMessage}
				showClose={false}
				action={{ text: 'Retry', handler: load }}
				class="w-full"
			/>
		</div>
	{:else if data}
		<div
			class="flex min-h-0 w-full flex-1 flex-col lg:flex-row lg:items-stretch lg:gap-0"
		>
			<div class="hidden min-h-0 self-stretch lg:flex">
				<QuizNavigationSidebar
					variant="review"
					showFooterLinks={true}
					showInstructions={false}
					exitLabel="Back to results"
					onQuitAttempt={exitReviewToResults}
					questions={questionsForNavGrid}
					reviewNavSections={reviewNavSections}
					reviewNavExpandAll={viewMode === 'list'}
					reviewExpandedSubjectKey={reviewExpandedSubjectKey}
					currentIndex={navGridCurrentIndex}
					onSelectQuestion={handleNavSelectQuestion}
					title="Review navigation"
					legendVariant="review"
					reviewCounts={{
						total: data.totalQuestions,
						correct: data.correctCount,
						wrong: data.wrongCount,
						unanswered: data.unansweredCount
					}}
				/>
			</div>

			<div
				class="flex min-h-0 min-w-0 flex-1 flex-col gap-4 px-4 pb-6 pt-4 sm:gap-5 sm:px-6 sm:pb-8 sm:pt-5"
			>
		<header class="flex flex-col gap-2 sm:gap-1.5">
			<div
				class="flex flex-col gap-2 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-3"
			>
				<div class="flex min-w-0 flex-1 items-start justify-between gap-3">
					<div class="min-w-0 flex-1">
						<SectionHeader title={data.title} variant="lg">
							{#snippet meta()}
								<div
									class="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-fg-muted sm:gap-x-5 sm:text-sm"
									aria-label="Exam duration and completion time"
								>
									<span class="inline-flex items-center gap-1.5">
										<Clock size={16} class="shrink-0" aria-hidden="true" />
										<span>{durationLabel}</span>
									</span>
									{#if completedLabel}
										<span class="inline-flex items-center gap-1.5">
											<Calendar size={16} class="shrink-0" aria-hidden="true" />
											<span>{completedLabel}</span>
										</span>
									{/if}
								</div>
							{/snippet}
						</SectionHeader>
					</div>
					<IconButton
						class="shrink-0 lg:hidden"
						icon={LayoutGrid}
						ariaLabel="Open question navigation"
						variant="outline"
						size="md"
						onclick={() => (navDrawerOpen = true)}
					/>
				</div>
				<Tabs
					variant="segmented"
					class="mt-2 w-full min-w-0 lg:mt-0 lg:w-auto lg:shrink-0"
					ariaLabel="Review view mode"
					options={[
						{ label: 'One-by-one', shortLabel: 'One', value: 'single', icon: Eye },
						{ label: 'List view', shortLabel: 'List', value: 'list', icon: LayoutList }
					]}
					selected={viewMode}
					onSelect={(v) => {
						viewMode = /** @type {'single' | 'list'} */ (v);
						if (viewMode === 'list') listPage = 1;
						else showFilters = false;
					}}
				/>
			</div>
		</header>

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
				saved={savedReviewFlags[currentQuestion.id] ?? false}
				onToggleSave={() => handleToggleSaveQuestion(currentQuestion.id)}
				savePending={savePendingId === currentQuestion.id}
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
					<details
						open
						class="group overflow-hidden rounded-lg border border-stroke bg-surface-card shadow-sm"
					>
						<summary
							class="flex cursor-pointer list-none items-start justify-between gap-3 bg-surface-card-subtle px-4 py-3 text-left [&::-webkit-details-marker]:hidden"
						>
							<div class="flex min-w-0 flex-1 flex-col gap-1.5">
								<p class="m-0 line-clamp-3 text-sm leading-snug text-fg">
									<span class="font-bold tabular-nums">Q{q.index}.</span>
									{' '}{q.text}
								</p>
								<div class="flex flex-wrap items-center gap-2">
									<Badge label={q.subject} variant="primary" size="sm" />
									{#if oc === 'correct'}
										<span class="text-xs font-semibold text-success">Correct</span>
									{:else if oc === 'incorrect'}
										<span class="text-xs font-semibold text-danger">Incorrect</span>
									{:else}
										<span class="text-xs font-medium text-fg-muted">Unanswered</span>
									{/if}
								</div>
							</div>
							<div class="flex shrink-0 items-center gap-1">
								<IconButton
									icon={savedReviewFlags[q.id] ? BookMarked : Bookmark}
									ariaLabel={savedReviewFlags[q.id]
										? 'Remove from saved questions'
										: 'Save question for later'}
									variant={savedReviewFlags[q.id] ? 'primary' : 'outline'}
									size="sm"
									disabled={savePendingId === q.id}
									onclick={(e) => {
										e.stopPropagation();
										handleToggleSaveQuestion(q.id);
									}}
								/>
								<span
									class="inline-flex text-fg-muted transition-transform duration-(--motion-fast) ease-(--ease-standard) group-open:rotate-180"
									aria-hidden="true"
								>
									<ChevronDown size={24} strokeWidth={2} />
								</span>
							</div>
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
								saved={savedReviewFlags[q.id] ?? false}
								onToggleSave={() => handleToggleSaveQuestion(q.id)}
								savePending={savePendingId === q.id}
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
			</div>
		</div>

		<QuizNavigationDrawer
			open={navDrawerOpen}
			onClose={() => (navDrawerOpen = false)}
			showFooterLinks={true}
			showInstructions={false}
			exitLabel="Back to results"
			onQuitAttempt={exitReviewToResults}
			questions={questionsForNavGrid}
			currentIndex={navGridCurrentIndex}
			onSelectQuestion={handleNavSelectQuestion}
			title="Review navigation"
			legendVariant="review"
			reviewCounts={{
				total: data.totalQuestions,
				correct: data.correctCount,
				wrong: data.wrongCount,
				unanswered: data.unansweredCount
			}}
		/>
	{/if}
</div>
