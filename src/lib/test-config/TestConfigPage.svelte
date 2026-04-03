<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getTestConfigData, startMockTest } from '$lib/test-config/mock/testConfig.service.js';
	import ConfigurationCard from '$lib/test-config/ConfigurationCard.svelte';
	import GuidelinesCard from '$lib/test-config/GuidelinesCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let subjects = $state([]);
	let difficultyLevels = $state([]);
	let examGuidelines = $state([]);

	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	let isStartingTest = $state(false);
	let startTestError = $state('');

	// ---------------------------- Start Test Handler --------------------------------

	async function handleStartTest(config) {
		isStartingTest = true;
		startTestError = '';

		try {
			const result = await startMockTest(config);
			console.log('Test started:', result);

			await goto(`/tests/${result.testId}/start`);
		} catch (error) {
			console.error('Failed to start test:', error);
			startTestError = error?.message || 'Failed to start test. Please try again.';
			isStartingTest = false;
		}
	}

	// -------------------------- Life Cycle ---------------------------------

	async function loadConfig() {
		isLoading = true;
		hasError = false;
		errorMessage = '';

		try {
			const config = await getTestConfigData();
			subjects = config.subjects;
			difficultyLevels = config.difficultyLevels;
			examGuidelines = config.examGuidelines;
		} catch (error) {
			console.error('Failed to load test configuration:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load test configuration. Please try again.';
		} finally {
			isLoading = false;
		}
	}

	onMount(async () => {
		await loadConfig();
	});
</script>

<div class="duration-motion-normal ease-ease-standard transition">
	<div class="flex flex-col gap-6">
		<SectionHeader
			title="Test Configuration"
			subtitle="Configure your practice test for targeted exam preparation"
		/>
		<div>
			{#if isLoading}
				<!-- Loading state -->
				<div class="flex flex-col items-center justify-center gap-3 py-12">
					<Spinner message="Loading test configuration..." />
				</div>
			{:else if hasError}
				<!-- Error state -->
				<StateDisplay
					title="Something went wrong"
					message={errorMessage}
					buttonLabel="Retry"
					onButtonClick={loadConfig}
					variant="error"
				/>
			{:else}
				<!-- Content -->
				<div class="flex flex-col gap-4">
					<!-- Configuration Card -->
					<ConfigurationCard
						{subjects}
						{difficultyLevels}
						onStartTest={handleStartTest}
						isLoading={isStartingTest}
					/>

					<!-- Use inline notification here once reusable components are ready -->
					{#if startTestError}
						<div
							class="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
						>
							{startTestError}
						</div>
					{/if}

					<!-- Guidelines Card -->
					<GuidelinesCard guidelines={examGuidelines} />
				</div>
			{/if}
		</div>
	</div>
</div>
