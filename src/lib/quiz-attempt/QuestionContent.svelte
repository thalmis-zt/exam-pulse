<script>
	import { HelpCircle } from '@lucide/svelte';
	import QuestionMetadataBar from './QuestionMetadataBar.svelte';
	import OptionButton from './OptionButton.svelte';

	let {
		subject,
		text,
		options = [],
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
		<div class="flex items-start gap-3">
			<HelpCircle size={20} class="mt-0.5 shrink-0 text-primary" aria-hidden="true" />
			<p class="min-w-0 flex-1 text-base leading-relaxed text-fg">{text}</p>
		</div>

		<!-- Options: 2x2 grid on desktop, vertical on mobile -->
		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each options as option (option.label)}
				<OptionButton
					label={option.label}
					text={option.text}
					selected={selectedOption === option.label}
					onclick={() => onSelectOption(option.label)}
				/>
			{/each}
		</div>
	</div>
</div>
