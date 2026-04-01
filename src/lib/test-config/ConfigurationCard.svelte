<script>
	import { getTopicsBySubject } from '$lib/test-config/mock/testConfig.service.js';
	import { Loader2 } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import StepperInput from '$lib/components/StepperInput.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';
	import SubjectCard from '$lib/test-config/SubjectCard.svelte';
	import NegativeMarkingCard from '$lib/test-config/NegativeMarkingCard.svelte';

	let {
		subjects = [],
		difficultyLevels = [],
		onStartTest = () => {},
		isLoading = false
	} = $props();

	let selectedSubject = $state(null);

	let selectedTopicOption = $state(null);
	let selectedDifficulty = $state(null);
	let questionCount = $state(25);
	let enableNegativeMarking = $state(false);
	let negativeMarkingDeduction = $state(0.25);

	let availableTopics = $state([]);
	let isLoadingTopics = $state(false);
	let formError = $state('');

	const MIN_QUESTIONS = 5;
	const MAX_QUESTIONS = 200;

	const difficultyTabOptions = $derived(
		difficultyLevels.map((l) => ({ value: l.id, label: l.label }))
	);

	// Watch for subject changes and load topics
	$effect(async () => {
		if (selectedSubject) {
			isLoadingTopics = true;
			try {
				availableTopics = await getTopicsBySubject(selectedSubject);
				selectedTopicOption = null; // Reset topic when subject changes
				formError = '';
			} catch (error) {
				console.error('Failed to load topics:', error);
				formError = 'Failed to load topics. Please try again.';
				availableTopics = [];
			} finally {
				isLoadingTopics = false;
			}
		}
	});

	// ----------------------------- Start Test Handler --------------------------------
	function handleStartTest() {
		// Validate form
		if (!selectedSubject) {
			formError = 'Please select a subject';
			return;
		}
		if (!selectedTopicOption) {
			formError = 'Please select a topic';
			return;
		}
		if (!selectedDifficulty) {
			formError = 'Please select a difficulty level';
			return;
		}

		formError = '';

		const config = {
			subjectId: selectedSubject,
			topicId: selectedTopicOption?.id ?? selectedTopicOption,
			difficultyId: selectedDifficulty,
			questionCount,
			enableNegativeMarking,
			negativeMarkingDeduction: enableNegativeMarking ? negativeMarkingDeduction : null
		};

		onStartTest(config);
	}
</script>

<div class="bg-surface-card border-stroke rounded-md border p-4 shadow-sm md:p-6">
	<form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
		<SubjectCard
			{subjects}
			bind:selectedSubject
			onSelectSubject={(id) => {
				selectedSubject = id;
			}}
		/>

		<!-- Topic, Difficulty Level, and Questions Row -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
			<Dropdown
				title="Topic / Chapter"
				bind:value={selectedTopicOption}
				options={availableTopics}
				placeholder="Select a topic"
				disabled={!selectedSubject || isLoadingTopics}
				loading={isLoadingTopics}
				required={true}
			/>

			<StepperInput
				bind:value={questionCount}
				min={MIN_QUESTIONS}
				max={MAX_QUESTIONS}
				label="Number of Questions"
				unit="Questions"
				required={true}
			/>

			<!-- Difficulty Level replace with tabs component -->
			<div>
				<span class="text-fg mb-2 block text-xs leading-5 font-medium">
					Difficulty Level <span class="text-danger ml-0.5">*</span>
				</span>
				<Tabs
					options={difficultyLevels.map((level) => ({ label: level.label, value: level.id }))}
					selected={selectedDifficulty}
					onSelect={(value) => (selectedDifficulty = value)}
					size="md"
				/>
			</div>
		</div>

		<!-- Negative Marking -->
		<div class="grid grid-cols-1 sm:grid-cols-2">
			<NegativeMarkingCard
				isEnabled={enableNegativeMarking}
				deductionAmount={negativeMarkingDeduction}
				onToggle={(enabled) => {
					enableNegativeMarking = enabled;
				}}
			/>
		</div>

		<!-- Error Message -->
		{#if formError}
			<InlineAlert variant="error" title="Error" message={formError} showClose={false} />
		{/if}

		<!-- Start Test Button -->
		<div class="flex justify-end">
			<Button
				btnType="primary"
				type="button"
				onclick={handleStartTest}
				disabled={isLoading || isLoadingTopics}
			>
				{#if isLoading}
					<Loader2 size={18} class="animate-spin" />
				{/if}
				Start Mock Test
			</Button>
		</div>
	</form>
</div>
