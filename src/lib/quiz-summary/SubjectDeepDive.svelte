<script>
	import { BookOpen } from '@lucide/svelte';
	import SubjectCard from '$lib/quiz-summary/SubjectCard.svelte';

	/** @type {{ subjects: import('./mock/quiz-summary.schema.js').SubjectResult[] }} */
	let { subjects = [] } = $props();

	const subjectCount = $derived(subjects.length);
</script>

<section class="flex flex-col gap-4">
	<!-- Header -->
	<div class="flex items-center justify-between gap-3 flex-wrap">
		<div class="flex items-center gap-2">
			<div
				class="flex items-center justify-center size-8 rounded-lg bg-info-surface text-primary shrink-0"
				aria-hidden="true"
			>
				<BookOpen size={20} />
			</div>
			<h2 class="text-base font-bold text-fg m-0">Subject Deep Dive</h2>
		</div>
		<span
			class="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-info-surface text-primary border border-primary/30"
		>
			{subjectCount} {subjectCount === 1 ? 'Subject' : 'Subjects'} Analyzed
		</span>
	</div>

	<!-- Subject cards grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each subjects as subject (subject.name)}
			<SubjectCard
				subjectName={subject.name}
				metrics={{
					total: subject.total,
					correct: subject.correct,
					wrong: subject.wrong
				}}
				timeSeconds={subject.timeSeconds}
				iconName={subject.iconName}
			/>
		{/each}
	</div>
</section>
