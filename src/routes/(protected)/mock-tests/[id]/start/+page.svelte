<script>
	import { goto } from '$app/navigation';
	import { ArrowLeft } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import ExamStartHero from '$lib/mock-tests/ExamStartHero.svelte';
	import ExamStartStatsGrid from '$lib/mock-tests/ExamStartStatsGrid.svelte';
	import ExamStartInstructions from '$lib/mock-tests/ExamStartInstructions.svelte';

	let { data } = $props();

	const mock = $derived(data.mock);

	function goToAttempt() {
		goto(`/tests/${mock.id}/attempt`);
	}
</script>

<div class="flex flex-col gap-5">
	<Button
		btnType="custom"
		type="button"
		customClass="inline-flex w-fit cursor-pointer items-center gap-2 rounded-sm border-none bg-transparent p-0 text-sm font-medium normal-case text-primary hover:underline"
		onclick={() => goto('/mock-tests')}
	>
		<ArrowLeft size={16} aria-hidden="true" />
		Back to mock tests
	</Button>

	<ExamStartHero
		title={mock.title}
		description={mock.description}
		format={mock.format}
		xp={mock.xp}
	/>

	<ExamStartStatsGrid
		duration={mock.duration}
		questions={mock.questions}
		users={mock.users}
		difficulty={mock.difficulty}
	/>

	<ExamStartInstructions instructions={mock.instructions} />

	<div class="flex justify-end">
		<Button
			btnType="primary"
			type="button"
			customClass="min-w-40 py-3 text-base"
			onclick={goToAttempt}
		>
			Start Exam
		</Button>
	</div>
</div>
