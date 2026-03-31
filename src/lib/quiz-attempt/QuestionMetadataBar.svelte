<script>
	import { Bookmark, BookMarked, Flag } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import IconButton from '$lib/components/IconButton.svelte';

	/**
	 * @typedef {'attempt' | 'review'} BarVariant
	 */

	let {
		variant = 'attempt',
		subject,
		positiveMarks = 4,
		negativeMarks = 1,
		onReportError = () => {},
		/** 1-based question index (review only). */
		questionIndex = 1,
		/** When variant is review: outcome shown after reveal. */
		reviewOutcome = 'idle',
		/** Review: question is in Saved Questions (mock). */
		saved = false,
		/** Review: toggle save for later. */
		onToggleSave,
		savePending = false
	} = $props();
</script>

<div
	class="flex flex-wrap items-center justify-between gap-2 rounded-t-lg bg-surface-card-subtle px-4 py-3"
>
	{#if variant === 'attempt'}
		<div class="flex items-center gap-3">
			<Badge label={subject} variant="primary" size="sm" />
			<span class="text-sm font-medium text-fg-muted">
				Marks:
				<span class="text-secondary font-semibold">+{positiveMarks}</span>
				<span class="text-danger font-semibold">-{negativeMarks}</span>
			</span>
		</div>

		<button
			type="button"
			class="flex items-center gap-1.5 text-xs font-medium text-fg-muted transition hover:text-fg"
			onclick={onReportError}
		>
			<Flag size={14} class="shrink-0" aria-hidden="true" />
			Report Error
		</button>
	{:else}
		<div class="flex min-w-0 flex-1 items-center gap-2">
			<Badge label={subject} variant="primary" size="sm" />
			<span class="text-xs font-semibold text-fg-muted">Q{questionIndex}</span>
		</div>
		<div class="flex shrink-0 items-center gap-2">
			{#if reviewOutcome === 'unanswered'}
				<span class="text-xs font-medium text-fg-muted">Not answered</span>
			{:else if reviewOutcome === 'correct'}
				<span class="text-xs font-semibold text-success">Correct</span>
			{:else if reviewOutcome === 'incorrect'}
				<span class="text-xs font-semibold text-danger">Incorrect</span>
			{/if}
			{#if onToggleSave}
				<IconButton
					icon={saved ? BookMarked : Bookmark}
					ariaLabel={saved ? 'Remove from saved questions' : 'Save question for later'}
					variant={saved ? 'primary' : 'outline'}
					size="sm"
					disabled={savePending}
					onclick={() => onToggleSave?.()}
				/>
			{/if}
		</div>
	{/if}
</div>
