<script>
	import { page } from '$app/stores';
	import { Calculator, Beaker, Atom } from '@lucide/svelte';
	import Error from '$lib/components/Error.svelte';
	import IconHeading from '$lib/components/IconHeading.svelte';
	import { getSubjectDetail } from '$lib/subject-detail/mock/subject-detail.service.js';
	import SubjectRecommendedMocksSection from '$lib/subject-detail/SubjectRecommendedMocksSection.svelte';
	import SyllabusCoverageSection from '$lib/subject-detail/SyllabusCoverageSection.svelte';

	const iconMap = { Calculator, Beaker, Atom };

	let data = $state(null);
	let isLoading = $state(true);
	let hasError = $state(false);
	let errorMessage = $state('');

	const subjectId = $derived($page.params.id);

	const Icon = $derived(
		data ? (iconMap[/** @type {keyof typeof iconMap} */ (data.iconName)] ?? Calculator) : Calculator
	);

	$effect(() => {
		const id = subjectId;
		if (!id) return;

		let cancelled = false;
		isLoading = true;
		hasError = false;

		(async () => {
			try {
				const result = await getSubjectDetail(id);
				if (!cancelled) {
					data = result;
					hasError = false;
				}
			} catch (e) {
				console.error(e);
				if (!cancelled) {
					hasError = true;
					errorMessage =
						e?.message === 'Subject not found' ? 'Subject not found.' : 'Could not load subject.';
					data = null;
				}
			} finally {
				if (!cancelled) isLoading = false;
			}
		})();

		return () => {
			cancelled = true;
		};
	});
</script>

{#if isLoading}
	<div class="flex flex-col items-center justify-center gap-3 py-16 text-fg-muted">
		<span class="text-sm">Loading subject…</span>
	</div>
{:else if hasError}
	<Error title="Something went wrong" subtitle={errorMessage} showClose={false} />
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
{/if}
