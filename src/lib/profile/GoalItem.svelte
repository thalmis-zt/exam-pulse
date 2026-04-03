<script>
	import { Edit2, Trash2, BookOpen, CircleDot } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import {
		generateGoalTitle,
		generateGoalDescription
	} from '$lib/profile/services/goal.service.js';

	let {
		goal,
		isActive = false,
		onEdit = () => {},
		onDelete = () => {},
		onSetActive = () => {},
	} = $props();

	const goalTitle = $derived(generateGoalTitle(goal));
	const goalDescription = $derived(generateGoalDescription(goal));
</script>

<div
	class="border-stroke flex items-start gap-3 rounded-md border p-3 transition-all {isActive
		? 'border-blue-300 bg-blue-50 shadow-sm'
		: 'hover:shadow-sm'}"
	role="radio"
	aria-checked={isActive}
	tabindex="0"
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onSetActive(goal);
		}
	}}
>
	<!-- Goal content -->
	<div class="min-w-0 flex-1">
		<!-- Radio + Badges -->
		<div class="mb-1 flex flex-wrap items-center gap-2">
			<input
				type="radio"
				name="activeGoal"
				checked={isActive}
				onchange={() => onSetActive(goal)}
				class="shrink-0 scale-75 cursor-pointer"
			/>
			<Badge
				label={goal.base.isPrimary ? 'Primary Goal' : 'Secondary Goal'}
				variant="primary"
				size="xs"
			/>
			{#if isActive}
				<Badge label="Active" variant="success" size="xs" />
			{/if}
		</div>

		<!-- Title + description -->
		<div class="flex flex-col gap-1">
			<h3 class="text-fg text-sm font-bold">{goalTitle}</h3>
			<p class="text-fg-muted text-sm">{goalDescription}</p>
		</div>

		<!-- Metadata chips -->
		<div class="text-fg-muted mt-2 flex flex-wrap items-center gap-3 text-xs">
			<span class="flex items-center gap-1">
				<BookOpen size={13} class="shrink-0" />
				{0} Topics
			</span>
			<span class="flex items-center gap-1">
				<CircleDot size={13} class="shrink-0" />
				{0} Questions
			</span>
		</div>
	</div>

	<!-- Actions -->
	<div class="flex shrink-0">
		<button
			onclick={(e) => {
				e.stopPropagation();
				onEdit(goal);
			}}
			class="hover:bg-surface-hover rounded-md p-1.5 transition-colors"
			title="Edit goal"
		>
			<Edit2 size={16} class="text-fg-muted hover:text-fg" />
		</button>
		<button
			onclick={(e) => {
				e.stopPropagation();
				onDelete(goal);
			}}
			class="hover:bg-surface-hover rounded-md p-1.5 transition-colors"
			title="Delete goal"
		>
			<Trash2 size={16} class="text-fg-muted hover:text-red-500" />
		</button>
	</div>
</div>
