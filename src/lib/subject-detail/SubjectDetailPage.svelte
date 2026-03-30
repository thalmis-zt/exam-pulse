<script>
	import { page } from '$app/stores';
	import { Calculator, Beaker, Atom } from '@lucide/svelte';
	import IconHeading from '$lib/components/IconHeading.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import StateDisplay from '$lib/components/StateDisplay.svelte';
	import { getSubjectDetail } from '$lib/subject-detail/mock/subject-detail.service.js';
	import SubjectRecommendedMocksSection from '$lib/subject-detail/SubjectRecommendedMocksSection.svelte';
	import SyllabusCoverageSection from '$lib/subject-detail/SyllabusCoverageSection.svelte';

	const iconMap = { Calculator, Beaker, Atom };

	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	let loadSeq = 0;

	const subjectId = $derived($page.params.id);

	const Icon = $derived(
		data ? (iconMap[/** @type {keyof typeof iconMap} */ (data.iconName)] ?? Calculator) : Calculator
	);

	async function loadSubjectDetail(id) {
		if (!id) return;
		const seq = ++loadSeq;
		isLoading = true;
		hasError = false;
		errorMessage = '';
		try {
			const result = await getSubjectDetail(id);
			if (seq !== loadSeq) return;
			data = result;
			hasError = false;
		} catch (e) {
			console.error(e);
			if (seq !== loadSeq) return;
			hasError = true;
			errorMessage =
				e?.message === 'Subject not found' ? 'Subject not found.' : 'Could not load subject.';
			data = null;
		} finally {
			if (seq === loadSeq) isLoading = false;
		}
	}

	$effect(() => {
		const id = subjectId;
		if (!id) {
			isLoading = false;
			hasError = false;
			errorMessage = '';
			data = null;
			return;
		}
		loadSubjectDetail(id);
	});

	function retryLoad() {
		loadSubjectDetail(subjectId);
	}
</script>

{#if isLoading}
	<div class="flex flex-col items-center justify-center gap-3 py-16">
		<Spinner message="Loading subject…" />
	</div>
{:else if hasError}
	<StateDisplay
		title="Failed to load subject"
		message={errorMessage}
		buttonLabel="Retry"
		onButtonClick={retryLoad}
		variant="error"
	/>
{:else if data}
	<div class="flex min-w-0 flex-col gap-8 pb-8">
		<div class="min-w-0">
			<IconHeading
				title={data.hero.title}
				subtitle={data.hero.description}
				size="md"
			>
				{#snippet icon()}
					<span
						class="flex size-9 shrink-0 items-center justify-center rounded-lg border border-stroke bg-surface-card shadow-sm sm:size-10 {data.iconTextClass}"
					>
						<Icon size={20} />
					</span>
				{/snippet}
			</IconHeading>
		</div>

		<SyllabusCoverageSection syllabusTerms={data.syllabusTerms} />
		<SubjectRecommendedMocksSection mocks={data.recommendedMocks} newCount={data.newMocksCount} />
	</div>
{:else}
	<StateDisplay
		title="Subject not available"
		message="We couldn't determine which subject to show. Go back and choose a subject from the list."
		variant="info"
	/>
{/if}
