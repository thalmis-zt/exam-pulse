<script>
	import { untrack } from 'svelte';
	import { ChevronDown } from '@lucide/svelte';
	import QuestionGrid from './QuestionGrid.svelte';

	/**
	 * @typedef {{ id: string, index: number, status: string }} NavQuestion
	 * @typedef {{ subject: string, questions: NavQuestion[] }} SubjectSection
	 */

	let {
		sections = /** @type {SubjectSection[]} */ ([]),
		/** When true (e.g. list view), all sections start expanded (still collapsible). */
		expandAll = false,
		/** Current question’s subject — that section is opened when it changes (one-by-one). */
		expandedSubjectKey = '',
		currentIndex = 1,
		onSelectQuestion,
		columns = 5
	} = $props();

	/** Stable across nav updates so we don’t reset collapse state when only question status changes. */
	const sectionSubjectsKey = $derived(sections.map((s) => s.subject).join('|'));

	/** @type {Record<string, boolean>} */
	let openBySubject = $state({});

	/** List view: all panels open when subject set changes; does not re-run on every `sections` ref. */
	$effect(() => {
		if (!expandAll) return;
		sectionSubjectsKey;
		untrack(() => {
			const next = /** @type {Record<string, boolean>} */ ({});
			for (const s of sections) {
				next[s.subject] = true;
			}
			openBySubject = next;
		});
	});

	/** One-by-one: ensure the current question’s subject panel is open (merge; others stay as user left them). */
	$effect(() => {
		if (expandAll) return;
		const key = expandedSubjectKey;
		if (!key) return;
		untrack(() => {
			openBySubject = { ...openBySubject, [key]: true };
		});
	});

	/**
	 * @param {string} subject
	 */
	function toggleSubject(subject) {
		const cur = openBySubject[subject] ?? false;
		openBySubject = { ...openBySubject, [subject]: !cur };
	}

	/**
	 * @param {string} subject
	 */
	function isOpen(subject) {
		return openBySubject[subject] ?? false;
	}
</script>

<div class="flex flex-col gap-2" role="navigation" aria-label="Questions by subject">
	{#each sections as section (section.subject)}
		{@const open = isOpen(section.subject)}
		<div class="overflow-hidden rounded-lg border border-stroke bg-surface-card">
			<button
				type="button"
				class="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition hover:bg-stroke/40"
				onclick={() => toggleSubject(section.subject)}
				aria-expanded={open}
			>
				<span class="truncate text-xs font-bold uppercase tracking-wide text-fg">{section.subject}</span>
				<ChevronDown
					class="size-4 shrink-0 text-fg-muted transition-transform duration-(--motion-fast) ease-(--ease-standard) {open
						? 'rotate-180'
						: ''}"
					aria-hidden="true"
				/>
			</button>
			{#if open}
				<div class="border-t border-stroke px-2 pb-2 pt-1">
					<QuestionGrid
						questions={section.questions}
						{currentIndex}
						onSelect={onSelectQuestion}
						{columns}
					/>
				</div>
			{/if}
		</div>
	{/each}
</div>
