<script>
	import { BookOpen } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import SubjectCard from '$lib/test-config/SubjectCard.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	let {
		subjects = [],
		selectedSubjects = [],
		subjectTopicsMap = {},
		onToggleSubject = () => {},
		onToggleTopic = () => {},
		onToggleAllTopics = () => {}
	} = $props();

	// Per-subject colour palette
	const COLORS = [
		{
			wrap: 'border-blue-200 bg-blue-50/60 dark:border-blue-800/50 dark:bg-blue-900/10',
			dot: 'bg-blue-500',
			label: 'text-blue-700 dark:text-blue-300'
		},
		{
			wrap: 'border-purple-200 bg-purple-50/60 dark:border-purple-800/50 dark:bg-purple-900/10',
			dot: 'bg-purple-500',
			label: 'text-purple-700 dark:text-purple-300'
		},
		{
			wrap: 'border-pink-200 bg-pink-50/60 dark:border-pink-800/50 dark:bg-pink-900/10',
			dot: 'bg-pink-500',
			label: 'text-pink-700 dark:text-pink-300'
		},
		{
			wrap: 'border-emerald-200 bg-emerald-50/60 dark:border-emerald-800/50 dark:bg-emerald-900/10',
			dot: 'bg-emerald-500',
			label: 'text-emerald-700 dark:text-emerald-300'
		},
		{
			wrap: 'border-orange-200 bg-orange-50/60 dark:border-orange-800/50 dark:bg-orange-900/10',
			dot: 'bg-orange-500',
			label: 'text-orange-700 dark:text-orange-300'
		}
	];

	// Normalize subjectTopicsDataMap with safe defaults
	function getTopicData(subjectId) {
		return subjectTopicsMap[subjectId] ?? {
			topics: [],
			selected: [],
			allTopicsSelected: false,
			loading: false
		};
	}

	function getSubject(subjectId) {
		return subjects.find(s => s.id === subjectId);
	}

	function getColorScheme(subjectId) {
		const idx = subjects.findIndex(s => s.id === subjectId);
		return COLORS[idx % COLORS.length];
	}

	// Derived utilities
	function getTopicsLabel(subjectId) {
		const td = getTopicData(subjectId);
		if (td.allTopicsSelected) return 'All topics';
		const count = td.selected.length;
		if (count === 0) return 'No topics selected';
		return `${count} topic${count !== 1 ? 's' : ''} selected`;
	}
</script>

<section class="p-6 md:p-8">
	<div class="mb-5 flex items-center gap-2">
		<BookOpen size={15} class="text-fg-muted" />
		<span class="text-fg text-sm font-semibold">Subjects & Topics</span>
	</div>

	<!-- Subject cards component -->
	<SubjectCard
		{subjects}
		{selectedSubjects}
		{onToggleSubject}
	/>

	<!-- Per-subject topic pickers -->
	{#if selectedSubjects.length > 0}
		<div class="mt-4 space-y-2.5">
			{#each selectedSubjects as subjectId (subjectId)}
				{@const subject = getSubject(subjectId)}
				{@const c = getColorScheme(subjectId)}
				{@const td = getTopicData(subjectId)}
				<div class={`rounded-md border p-3 ${c.wrap}`}>
					<!-- Header -->
					<div class="mb-2 flex items-center gap-2">
						<span class={`h-2 w-2 shrink-0 rounded-full ${c.dot}`}></span>
						<span class={`text-xs font-semibold ${c.label}`}>{subject?.name}</span>
						<span class="text-fg-muted ml-auto text-2xs">
							{getTopicsLabel(subjectId)}
						</span>
					</div>

					<!-- Content -->
					{#if td.loading}
					<Spinner size="sm" variant="custom" message="Loading topics…" ariaLabel="Loading topics" class="text-fg-muted" />
					{:else if td.topics.length > 0}
						<div class="flex flex-wrap gap-2">
							<!-- All option -->
							<Badge
								label="All"
								size="sm"
								variant={td.allTopicsSelected ? 'primary' : 'default'}
								isActive={td.allTopicsSelected}
								onclick={() => onToggleAllTopics(subjectId)}
							/>
							<!-- Individual topics -->
							{#each td.topics as topic (topic.id)}
								{@const isSelected = td.selected.includes(topic.id)}
								<Badge
									label={topic.name}
									size="sm"
									variant={isSelected ? 'primary' : 'default'}
									isActive={isSelected}
									onclick={() => onToggleTopic(subjectId, topic.id)}
								/>
							{/each}
						</div>
					{:else}
						<p class="text-fg-muted text-2xs py-1">No topics available</p>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</section>
