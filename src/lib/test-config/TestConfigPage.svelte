<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { getTestConfigData, startMockTest } from '$lib/test-config/mock/testConfig.service.js';
	import ConfigurationCard from '$lib/test-config/ConfigurationCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';

	let subjects = $state([]);
	let difficultyLevels = $state([]);

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

<div>
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

					<!-- Error notification -->
					{#if startTestError}
						<InlineAlert
							variant="error"
							title={startTestError}
							showClose={true}
							onclose={() => (startTestError = '')}
						/>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>
