<script>
	import { ClipboardList, BookOpen, CircleDot, Plus } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';

	/** @type {{ goals: import('./mock/profile.schema.js').Goal[] }} */
	let { goals } = $props();
</script>

<div class="bg-surface-card rounded-md border border-stroke p-4 flex flex-col gap-4">
	{#each goals as goal, i (goal.id)}
		<div class="flex flex-col gap-2 {i > 0 ? 'pt-4 border-t border-stroke' : ''}">
			<!-- Goal label -->
			<div>
				<Badge
					label={goal.isPrimary ? 'Primary Goal' : 'Secondary Goal'}
					variant="primary"
					size="sm"
				/>
			</div>

			<!-- Title + description -->
			<div class="flex flex-col gap-0.5">
				<h3 class="text-base font-bold text-fg">{goal.title}</h3>
				<p class="text-sm text-fg-muted">{goal.description}</p>
			</div>

			<!-- Metadata chips -->
			<div class="flex items-center gap-3 flex-wrap text-sm text-fg-muted">
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
