<script>
	import { Shield } from '@lucide/svelte';
	import IconHeading from '$lib/components/IconHeading.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import MockTestCard from '$lib/components/MockTestCard.svelte';
	import Button from '$lib/components/Button.svelte';

	/**
	 * @type {{
	 *   mocks: import('./mock/subject-detail.schema.js').SubjectMockTest[],
	 *   newCount: number
	 * }}
	 */
	let { mocks, newCount } = $props();
</script>

<section class="flex flex-col gap-4">
	<div class="flex flex-wrap items-center gap-2">
		<IconHeading title="Recommended Mock Tests" size="md">
			{#snippet icon()}<Shield size={20} />{/snippet}
		</IconHeading>
		{#if newCount > 0}
			<Badge label={`${newCount} New Available`} variant="primary" size="sm" />
		{/if}
	</div>

	<!-- Same grid as mock-tests → All Mock Exams -->
	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each mocks as mock, i (mock.title + i)}
			<MockTestCard
				title={mock.title}
				description={mock.description}
				duration={mock.duration}
				questions={mock.questions}
				users={mock.users}
				xp={mock.xp}
			/>
		{/each}
	</div>

	<Button btnType="primaryLight" customClass="w-full sm:w-auto self-stretch sm:self-center" onclick={() => {}}>
		Explore All Test Series
	</Button>
</section>
