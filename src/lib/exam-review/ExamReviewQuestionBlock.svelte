<script>
	import { Bookmark, BookMarked, Eye, HelpCircle } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import IconButton from '$lib/components/IconButton.svelte';
	import QuestionMetadataBar from '$lib/quiz-attempt/QuestionMetadataBar.svelte';
	import OptionButton from '$lib/quiz-attempt/OptionButton.svelte';
	import QuestionImageContent from '$lib/quiz-attempt/QuestionImageContent.svelte';

	/**
	 * @typedef {import('$lib/quiz-attempt/mock/quiz-attempt.schema.js').Question} Question
	 */

	/**
	 * @type {{
	 *   question: Question,
	 *   userAnswer: string | null,
	 *   correctLabel: string,
	 *   revealed: boolean,
	 *   onReveal: () => void,
	 *   embedded?: boolean,
	 *   showHeader?: boolean,
	 *   saved?: boolean,
	 *   onToggleSave?: () => void | Promise<void>,
	 *   savePending?: boolean
	 * }}
	 */
	let {
		question,
		userAnswer,
		correctLabel,
		revealed,
		onReveal,
		embedded = false,
		showHeader = true,
		saved = false,
		onToggleSave,
		savePending = false
	} = $props();

	const isShortAnswer = $derived(question.questionType === 'short_answer');

	const isCorrect = $derived.by(() => {
		if (!isShortAnswer) return userAnswer != null && userAnswer === correctLabel;
		if (userAnswer == null || String(userAnswer).trim() === '') return false;
		const ca = String(correctLabel ?? '').trim();
		if (question.shortAnswerInputType === 'number') {
			const nU = Number(String(userAnswer).trim());
			const nC = Number(ca);
			return Number.isFinite(nU) && Number.isFinite(nC) && nU === nC;
		}
		return String(userAnswer).trim().toLowerCase() === ca.toLowerCase();
	});

	const reviewOutcome = $derived.by(() => {
		if (!revealed) return 'idle';
		if (userAnswer == null || (isShortAnswer && String(userAnswer).trim() === '')) return 'unanswered';
		if (isCorrect) return 'correct';
		return 'incorrect';
	});
</script>

<div
	class="overflow-hidden bg-surface-card {embedded
		? 'border-0'
		: 'rounded-lg border border-stroke'}"
>
	{#if showHeader}
		<QuestionMetadataBar
			variant="review"
			subject={question.subject}
			questionIndex={question.index}
			{reviewOutcome}
			{saved}
			onToggleSave={onToggleSave}
			{savePending}
		/>
	{:else if embedded && onToggleSave}
		<div class="flex justify-end border-b border-stroke bg-surface-card-subtle px-4 py-2">
			<IconButton
				icon={saved ? BookMarked : Bookmark}
				ariaLabel={saved ? 'Remove from saved questions' : 'Save question for later'}
				variant={saved ? 'primary' : 'outline'}
				size="sm"
				disabled={savePending}
				onclick={() => onToggleSave?.()}
			/>
		</div>
	{/if}

	<div class="flex flex-col gap-4 p-4 md:p-6">
		<div class="flex flex-col gap-4">
			<div class="flex items-start gap-3">
				<HelpCircle size={20} class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
				<p class="min-w-0 flex-1 text-base leading-relaxed text-fg">{question.text}</p>
			</div>
			<QuestionImageContent
				urls={question.questionMedia ?? []}
				altPrefix="Question figure"
				layout={question.stemMediaLayout ?? 'compact'}
			/>
		</div>

		<div class="flex flex-col gap-3">
			{#if isShortAnswer}
				<div class="flex flex-col gap-2 rounded-xl border border-stroke bg-canvas px-4 py-3">
					<p class="m-0 text-xs font-semibold uppercase tracking-wide text-fg-muted">Your answer</p>
					<p class="m-0 text-base font-medium text-fg">
						{userAnswer != null && String(userAnswer).trim() !== ''
							? userAnswer
							: '—'}
					</p>
					{#if revealed}
						<div class="border-info/20 mt-2 border-t pt-3">
							<p class="m-0 text-xs font-semibold uppercase tracking-wide text-fg-muted">
								Correct answer
							</p>
							<p class="mt-1 text-base font-semibold text-success">{correctLabel}</p>
						</div>
					{/if}
				</div>
				{#if userAnswer == null || String(userAnswer).trim() === ''}
					<p class="m-0 text-sm text-fg-muted">You did not enter an answer for this question.</p>
				{/if}
			{:else if !revealed}
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
					{#each question.options as opt (opt.label)}
						{@const isUserPick = userAnswer != null && opt.label === userAnswer}
						<OptionButton
							readonly
							label={opt.label}
							text={opt.text}
							mediaUrls={opt.mediaUrls ?? []}
							reviewVariant={isUserPick ? 'userPick' : 'neutral'}
							endLabel={isUserPick ? 'Your answer' : ''}
							endLabelTone="primary"
						/>
					{/each}
				</div>
				{#if userAnswer == null}
					<p class="m-0 text-sm text-fg-muted">You did not select an answer for this question.</p>
				{/if}
			{:else}
				<div class="grid grid-cols-1 gap-3 sm:grid-cols-2" role="list">
					{#each question.options as opt (opt.label)}
						{@const isCorrectOpt = opt.label === correctLabel}
						{@const isUserPick = userAnswer != null && opt.label === userAnswer}
						<OptionButton
							readonly
							label={opt.label}
							text={opt.text}
							mediaUrls={opt.mediaUrls ?? []}
							reviewVariant={isCorrectOpt ? 'correct' : isUserPick && !isCorrectOpt ? 'wrongPick' : 'neutral'}
							endLabel={isCorrectOpt ? 'Correct' : isUserPick && !isCorrectOpt ? 'Your choice' : ''}
							endLabelTone={isCorrectOpt ? 'success' : isUserPick && !isCorrectOpt ? 'danger' : 'muted'}
						/>
					{/each}
				</div>
			{/if}
			<Button
				btnType="ghost"
				type="button"
				disabled={revealed}
				onclick={onReveal}
				customClass="w-full sm:w-auto self-start"
				aria-pressed={revealed}
			>
				<Eye size={16} aria-hidden="true" />
				{revealed ? 'Answer revealed' : 'Reveal answer'}
			</Button>
		</div>
	</div>
</div>
