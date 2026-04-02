<script>
	import { BookOpen, CircleDot, Plus, Edit2, Trash2 } from '@lucide/svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';
	import GoalModal from '$lib/profile/GoalModal.svelte';
	import {
		generateGoalTitle,
		generateGoalDescription
	} from '$lib/profile/services/goal.service.js';

	// when API is ready call the goal from here itself, otherwise we cant directly mutate props, they should remain read only.
	let { goals } = $props();

	let isModalOpen = $state(false);
	let showDeleteModal = $state(false);
	let selectedGoal = $state(null); // { goal, mode: 'edit' | 'delete' }
	let activeGoalId = $state(null); // Track which goal is active

	const displayGoal = $derived.by(() => {
		if (!selectedGoal?.goal) return null;
		return {
			...selectedGoal.goal,
			displayTitle: generateGoalTitle(selectedGoal.goal),
			displayDescription: generateGoalDescription(selectedGoal.goal),
			displayType: selectedGoal.goal.base.type
		};
	});

	// Check if primary goal exists (excluding the one being edited)
	const primaryGoal = $derived.by(() => {
		return goals.find((g) => g.base.isPrimary);
	});

	const isPrimaryGoalDisabled = $derived.by(() => {
		// Disable if there's an existing primary goal and we're not editing it
		return primaryGoal && primaryGoal.base.id !== selectedGoal?.goal?.base.id;
	});
	// ------------------------- Goal Add -------------------------------
	function handleAddGoal() {
		selectedGoal = null;
		isModalOpen = true;
	}

	// Set goal as active (radio button model - only one can be active)
	function handleSetActive(goal) {
		activeGoalId = goal.base.id;
	}

	// Mock API: Save goal (add or update)
	async function mockSaveGoalAPI(goalData) {
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		// Simulate API response
		console.log('Mock API: Saving goal', goalData);
		return {
			success: true,
			data: goalData,
			message: 'Goal saved successfully'
		};
	}

	async function handleSaveGoal(goalData) {
		try {
			// Call mock API
			const response = await mockSaveGoalAPI(goalData);

			if (!response.success) {
				throw new Error(response.message || 'Failed to save goal');
			}

			if (selectedGoal?.mode === 'edit') {
				// Update existing goal
				const index = goals.findIndex((g) => g.base.id === selectedGoal.goal.base.id);
				if (index !== -1) {
					goals[index] = goalData;
					goals = [...goals]; // Trigger reactivity
				}
			} else {
				// Add new goal
				goals = [...goals, goalData];
			}
			isModalOpen = false;
			selectedGoal = null;
		} catch (err) {
			console.error('Error saving goal:', err);
			// Could show toast notification here
		}
	}

	// -------------------------- Goal Edit ---------------------------------
	function handleEditGoal(goal) {
		selectedGoal = { goal, mode: 'edit' };
		isModalOpen = true;
	}

	// ----------------------------- Goal Delete ------------------------------
	// Mock API: Delete goal
	async function mockDeleteGoalAPI(goalId) {
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 800));

		// Simulate API response
		console.log('Mock API: Deleting goal', goalId);
		return {
			success: true,
			message: 'Goal deleted successfully'
		};
	}

	function handleDeleteGoal(goal) {
		selectedGoal = { goal, mode: 'delete' };
		showDeleteModal = true;
	}

	async function handleConfirmDelete(goal) {
		try {
			// Call mock API
			const response = await mockDeleteGoalAPI(goal.base.id);

			if (!response.success) {
				throw new Error(response.message || 'Failed to delete goal');
			}

			goals = goals.filter((g) => g.base.id !== goal.base.id);
			showDeleteModal = false;
			selectedGoal = null;
		} catch (err) {
			console.error('Error deleting goal:', err);
			// Could show toast notification here
		}
	}

	function handleCancelDelete() {
		showDeleteModal = false;
		selectedGoal = null;
	}

	// ------------------- General ---------------------------

	function handleCloseModal() {
		isModalOpen = false;
		selectedGoal = null;
	}
</script>

<div class="bg-surface-card rounded-md p-4">
	<div class="mb-2">
		<SectionHeader title="My Goals" variant="sm" />
	</div>
	<div class="flex flex-col gap-2">
		{#each goals as goal, i (goal.base.id)}
			<div
				class="flex items-start gap-3 p-3 rounded-md transition-all border border-stroke {activeGoalId === goal.base.id
					? 'bg-blue-50 border-blue-300 shadow-sm'
					: 'hover:shadow-sm'}"
				role="radio"
				aria-checked={activeGoalId === goal.base.id}
				tabindex="0"
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						handleSetActive(goal);
					}
				}}
			>
				<!-- Goal content -->
				<div class="flex-1 min-w-0">
					<div class="flex items-center gap-2 mb-1">
						<input
							type="radio"
							name="activeGoal"
							checked={activeGoalId === goal.base.id}
							onchange={() => handleSetActive(goal)}
							class="shrink-0 cursor-pointer scale-75"
						/>
						<Badge
							label={goal.base.isPrimary ? 'Primary Goal' : 'Secondary Goal'}
							variant="primary"
							size="xs"
						/>
						{#if activeGoalId === goal.base.id}
							<Badge
								label="Active"
								variant="success"
								size="xs"
							/>
						{/if}
					</div>

					<!-- Title + description -->
					<div class="flex flex-col gap-1">
						<h3 class="text-fg text-sm font-bold">{generateGoalTitle(goal)}</h3>
						<p class="text-fg-muted text-sm">{generateGoalDescription(goal)}</p>
					</div>

					<!-- Metadata chips -->
					<div class="text-fg-muted flex flex-wrap items-center gap-3 text-xs mt-2">
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
				<div class="flex  shrink-0">
					<button
						onclick={(e) => {
							e.stopPropagation();
							handleEditGoal(goal);
						}}
						class="hover:bg-surface-hover rounded-md p-1.5 transition-colors"
						title="Edit goal"
					>
						<Edit2 size={16} class="text-fg-muted hover:text-fg" />
					</button>
					<button
						onclick={(e) => {
							e.stopPropagation();
							handleDeleteGoal(goal);
						}}
						class="hover:bg-surface-hover rounded-md p-1.5 transition-colors"
						title="Delete goal"
					>
						<Trash2 size={16} class="text-fg-muted hover:text-red-500" />
					</button>
				</div>
			</div>
		{/each}

		<!-- Add New Goal -->
		<Button btnType="primaryLight" onclick={handleAddGoal}>
			<Plus size={15} />
			Add New Goal
		</Button>
	</div>
</div>

<!-- Goal Modal -->
{#if isModalOpen}
	<GoalModal
		onClose={handleCloseModal}
		onSave={handleSaveGoal}
		editingGoal={selectedGoal?.goal}
		isPrimaryGoalDisabled
		currentPrimaryGoal={primaryGoal}
	/>
{/if}

<!-- Delete Confirmation Modal -->
<DeleteConfirmationModal
	open={showDeleteModal}
	entity={displayGoal}
	entityName="goal"
	entityType="goal"
	titleOverride="Delete this goal?"
	confirmationValue="delete"
	fields={[
		{ key: 'displayTitle', label: 'Goal Title' },
		{ key: 'displayDescription', label: 'Description' },
		{ key: 'displayType', label: 'Type' }
	]}
	onconfirm={handleConfirmDelete}
	oncancel={handleCancelDelete}
	onclose={handleCancelDelete}
/>
