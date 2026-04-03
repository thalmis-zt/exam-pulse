<script>
	import { HelpCircle } from '@lucide/svelte';
	import QuestionMetadataBar from './QuestionMetadataBar.svelte';
	import OptionButton from './OptionButton.svelte';
	import QuestionImageContent from './QuestionImageContent.svelte';
	import DescriptiveInput from './DescriptiveInput.svelte';

	let {
		subject,
		text,
		questionMedia = [],
		stemMediaLayout = 'compact',
		options = [],
		questionType = 'mcq',
		shortAnswerPlaceholder = 'Type your answer here',
		shortAnswerInputType = 'text',
		textAnswer = '',
		onTextAnswerChange = () => {},
		positiveMarks = 4,
		negativeMarks = 1,
		selectedOption = null,
		onSelectOption,
		onReportError
	} = $props();
</script>

<div class="overflow-hidden rounded-lg border border-stroke bg-surface-card">
	<QuestionMetadataBar
		variant="attempt"
		{subject}
		{positiveMarks}
		{negativeMarks}
		onReportError={onReportError}
	/>

	<div class="flex flex-col gap-4 p-4 md:p-6">
		<div class="flex flex-col gap-4">
			<div class="flex items-start gap-3">
				<HelpCircle size={20} class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
				<p class="min-w-0 flex-1 text-base leading-relaxed text-fg">{text}</p>
			</div>
			<QuestionImageContent urls={questionMedia} altPrefix="Question figure" layout={stemMediaLayout} />
		</div>

		{#if questionType === 'short_answer'}
			<DescriptiveInput
				placeholder={shortAnswerPlaceholder}
				value={textAnswer}
				answerInputType={shortAnswerInputType}
				onValueChange={onTextAnswerChange}
				id="short-answer-input"
			/>
		{:else}
			<!-- Options: 2x2 grid on desktop, vertical on mobile -->
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each options as option (option.label)}
					<OptionButton
						label={option.label}
						text={option.text}
						mediaUrls={option.mediaUrls ?? []}
						selected={selectedOption === option.label}
						onclick={() => onSelectOption(option.label)}
					/>
				{/each}
			</div>
		{/if}
	</div>
</div>
