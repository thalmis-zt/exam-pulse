<script>
	import { BookOpen, CircleDot, Plus } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';

	let { goals } = $props();
</script>

<div class="bg-surface-card rounded-md p-4">
<div class="mb-3">
	<SectionHeader title="My Goals" variant="sm" />
</div>
	<div class="flex flex-col gap-4">
		{#each goals as goal, i (goal.id)}
			<div class="flex flex-col gap-2 {i > 0 ? 'border-stroke border-t pt-4' : ''}">
				<!-- Goal label -->
				<div>
					<Badge
						label={goal.isPrimary ? 'Primary Goal' : 'Secondary Goal'}
						variant="primary"
						size="xs"
					/>
				</div>

				<!-- Title + description -->
				<div class="flex flex-col gap-1">
					<h3 class="text-fg text-sm font-bold">{goal.title}</h3>
					<p class="text-fg-muted text-sm">{goal.description}</p>
				</div>

				<!-- Metadata chips -->
				<div class="text-fg-muted flex flex-wrap items-center gap-3 text-xs">
					<!-- <span class="flex items-center gap-1">
						<ClipboardList size={13} class="shrink-0" />
						{goal.examsCount.toLocaleString()} Exams
					</span> -->
					<span class="flex items-center gap-1">
						<BookOpen size={13} class="shrink-0" />
						{goal.topicsCount} Topics
					</span>
					<span class="flex items-center gap-1">
						<CircleDot size={13} class="shrink-0" />
						{goal.questionsCount.toLocaleString()} Questions
					</span>
				</div>
			</div>
		{/each}

		<!-- Add New Goal -->
		<Button btnType="primaryLight" onclick={() => {}}>
			<Plus size={15} />
			Add New Goal
		</Button>
	</div>
</div>
