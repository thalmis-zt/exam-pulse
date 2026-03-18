<script>
	import { onMount } from 'svelte';
	import {
		getTestConfigData,
		startMockTest
	} from '$lib/test-config/mock/testConfig.service.js';
	import ConfigurationCard from '$lib/test-config/ConfigurationCard.svelte';
	import GuidelinesCard from '$lib/test-config/GuidelinesCard.svelte';

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

	// -------------------------- Life Cycle ---------------------------------
		onMount(async () => {
		try {
			const config = await getTestConfigData();
			subjects = config.subjects;
			difficultyLevels = config.difficultyLevels;
			examGuidelines = config.examGuidelines;
			isLoading = false;
		} catch (error) {
			console.error('Failed to load test configuration:', error);
			hasError = true;
			errorMessage = error?.message || 'Failed to load test configuration. Please try again.';
			isLoading = false;
		}
	});
</script>

<!-- Use generic Loader and Error Components once the reusable components are merged -->
<div class="transition duration-motion-normal ease-ease-standard">
	<div class="mx-auto px-4 md:px-6 py-4 md:py-6">
		<div>
			{#if isLoading}
				<!-- Loading state -->
				<div class="flex flex-col items-center justify-center gap-3 py-12">
					<div class="w-8 h-8 border-4 border-border border-t-primary rounded-full animate-spin"></div>
					<p class="text-fg-muted text-sm">Loading test configuration...</p>
				</div>
			{:else if hasError}
				<!-- Error state -->
				<div
					class="flex flex-col items-center justify-center gap-3 py-12 p-4 rounded-lg bg-surface-card border border-border"
				>
					<p class="text-fg font-semibold">Something went wrong</p>
					<p class="text-fg-muted text-sm text-center">{errorMessage}</p>
					<button
						onclick={async () => {
							isLoading = true;
							hasError = false;
							errorMessage = '';
							try {
								const config = await getTestConfigData();
								subjects = config.subjects;
								difficultyLevels = config.difficultyLevels;
								examGuidelines = config.examGuidelines;
								isLoading = false;
							} catch (error) {
								hasError = true;
								errorMessage = error?.message || 'Failed to load test configuration.';
								isLoading = false;
							}
						}}
						class="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-hover transition duration-motion-normal ease-ease-standard"
					>
						Retry
					</button>
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
