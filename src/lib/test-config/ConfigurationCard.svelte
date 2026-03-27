<script>
	import { Zap, BookOpen } from '@lucide/svelte';
	import { getTopicsBySubject } from '$lib/test-config/mock/testConfig.service.js';
	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import StepperInput from '$lib/components/StepperInput.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import Tabs from '$lib/components/Tabs.svelte';
	import SubjectCard from '$lib/test-config/SubjectCard.svelte';
	import NegativeMarkingCard from '$lib/test-config/NegativeMarkingCard.svelte';

	let {
		subjects = [],
		difficultyLevels = [],
		onStartTest = () => {},
		isLoading = false
	} = $props();

	let selectedSubject = $state(null);
	/** @type {import('$lib/test-config/mock/testConfig.schema.js').Topic | null} */
	let selectedTopicOption = $state(null);
	let selectedDifficulty = $state(null);
	let questionCount = $state(25);
	let enableNegativeMarking = $state(false);
	let negativeMarkingDeduction = $state(0.25);

	let availableTopics = $state([]);
	let isLoadingTopics = $state(false);
	let formError = $state('');

	const MIN_QUESTIONS = 5;
	const MAX_QUESTIONS = 100;

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
			topicId: selectedTopicOption.id,
			difficultyId: selectedDifficulty,
			questionCount,
			enableNegativeMarking,
			negativeMarkingDeduction: enableNegativeMarking ? negativeMarkingDeduction : null
		};

		onStartTest(config);
	}
</script>

<!-- Configuration Card -->
<div class="bg-surface-card border-stroke rounded-md border p-4 shadow-sm md:p-6">
	<div class="mb-4 flex items-start gap-2">
		<div class=" bg-info-surface text-info rounded-md p-2">
			<Zap size={14} />
		</div>
		<SectionHeader
			title="Test Configuration"
			subtitle="Configure your practice test for targeted exam preparation"
		/>
	</div>
	<!-- Form -->
	<form class="space-y-6" onsubmit={(e) => e.preventDefault()}>
		<!-- Subject Selection -->
		<SubjectCard
			{subjects}
			bind:selectedSubject
			onSelectSubject={(id) => {
				selectedSubject = id;
			}}
		/>

		<!-- Topic, Difficulty Level, and Questions Row -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
			<Dropdown
				title="Topic / Chapter"
				required
				options={availableTopics}
				bind:value={selectedTopicOption}
				placeholder={!selectedSubject
					? 'Select a subject first'
					: isLoadingTopics
						? 'Loading topics...'
						: 'Select a topic'}
				disabled={!selectedSubject || isLoadingTopics}
				loading={isLoadingTopics}
				onSelect={() => {
					formError = '';
				}}
			>
				{#snippet icon()}<BookOpen size={16} />{/snippet}
			</Dropdown>

			<Tabs
				title="Difficulty Level"
				required
				size="sm"
				options={difficultyTabOptions}
				selected={selectedDifficulty}
				onSelect={(id) => {
					selectedDifficulty = id;
					formError = '';
				}}
			/>

			<StepperInput
				title="Number of Questions"
				required
				bind:value={questionCount}
				min={MIN_QUESTIONS}
				max={MAX_QUESTIONS}
				step={1}
				unit="Items"
			/>
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
			<div
				class="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
			>
				{formError}
			</div>
		{/if}

		<!-- Start Test Button -->
		<div class="flex justify-end">
			<Button
				btnType="primary"
				type="button"
				onclick={handleStartTest}
				disabled={isLoading || isLoadingTopics}
			>
				{isLoading ? 'Starting Mock Test...' : 'Start Mock Test'}
			</Button>
		</div>
	</form>
</div>
