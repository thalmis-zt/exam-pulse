<script>
	import SyllabusTopicRow from '$lib/subject-detail/SyllabusTopicRow.svelte';
	let { syllabusTerms } = $props();

	const termOptions = $derived(
		syllabusTerms.map((t) => ({
			label: t.label,
			value: t.id
		}))
	);

	let selectedTermId = $state('');

	$effect(() => {
		if (!syllabusTerms.length) return;
		if (!syllabusTerms.some((t) => t.id === selectedTermId)) {
			selectedTermId = syllabusTerms[0].id;
		}
	});

	const activeTopics = $derived(
		syllabusTerms.find((t) => t.id === selectedTermId)?.topics ?? []
	);
</script>

<section class="flex flex-col gap-4">
	<!-- Header: title + subtitle | term switcher (design: pills top-right) -->
	<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
		<div class="flex flex-col gap-0.5 min-w-0">
			<h2 class="text-base font-bold text-fg m-0">Syllabus Coverage</h2>
			<p class="text-sm text-fg-muted m-0">Track your progress across all core modules</p>
		</div>

		{#if termOptions.length > 0}
			<div
				class="flex flex-wrap gap-2 shrink-0"
				role="group"
				aria-label="Select term"
			>
				{#each termOptions as opt (opt.value)}
					{@const active = selectedTermId === opt.value}
					<button
						type="button"
						onclick={() => (selectedTermId = opt.value)}
						aria-pressed={active}
						class="
							rounded-full px-4 py-2 text-sm font-medium transition
							duration-(--motion-fast) ease-(--ease-standard)
							{active
							? 'bg-stroke/90 text-fg shadow-sm'
							: 'bg-surface-card text-fg-muted border border-stroke hover:border-fg-muted hover:text-fg'}
						"
					>
						{opt.label}
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-5">
		{#each activeTopics as topic (topic.id)}
			<div class="rounded-xl border border-stroke bg-surface-card px-4 shadow-sm sm:px-5">
				<SyllabusTopicRow {topic} standalone />
			</div>
		{/each}
	</div>
</section>
