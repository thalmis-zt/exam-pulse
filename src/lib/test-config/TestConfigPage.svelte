<script>
	import { onMount } from 'svelte';
	import {
		getTestConfigData,
		startMockTest
	} from '$lib/test-config/mock/testConfig.service.js';
	import ConfigurationCard from '$lib/test-config/ConfigurationCard.svelte';
	import GuidelinesCard from '$lib/test-config/GuidelinesCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Error from '$lib/components/Error.svelte';

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

			// Navigate to test page with test ID
			// TODO: Update route when test attempt page is ready
			const testAttemptRoute = `/tests/${result.testId}/attempt`;
			window.location.href = testAttemptRoute;
		} catch (error) {
			console.error('Failed to start test:', error);
			startTestError = error?.message || 'Failed to start test. Please try again.';
			isStartingTest = false;
		}
	}

	async function loadTestConfig() {
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

	onMount(() => {
		loadTestConfig();
	});
</script>

<div class="transition duration-motion-normal ease-ease-standard">
	<div class="">
		<div>
			{#if isLoading}
				<div class="flex flex-col items-center justify-center py-12">
					<Spinner message="Loading test configuration..." />
				</div>
			{:else if hasError}
				<div class="w-full px-4 sm:px-6">
					<Error
						title="Something went wrong"
						subtitle={errorMessage}
						showClose={false}
						action={{ text: 'Retry', handler: loadTestConfig }}
						class="w-full"
					/>
				</div>
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
						<div class="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
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
