<script>
	import { X, GraduationCap, BookOpen } from '@lucide/svelte';
	import Portal from '$lib/components/Portal.svelte';
	import Button from '$lib/components/Button.svelte';
	import InlineAlert from '$lib/components/InlineAlert.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Toggle from '$lib/components/Toggle.svelte';

	import {
		getEntranceExams,
		getStates,
		getBoardsByState,
		getMediumsByBoard,
		getClasses,
		validateGoal,
		generateGoalTitle
	} from '$lib/profile/services/goal.service.js';
	import { onMount } from 'svelte';

	// Props
	let {
		editingGoal = null,
		isPrimaryGoalDisabled = false,
		currentPrimaryGoal = null,
		onSave = () => {},
		onClose = () => {}
	} = $props();

	// Constants
	const GOAL_TYPES = {
		ENTRANCE: 'entrance',
		CLASSWISE: 'classwise'
	};

	const GOAL_TYPE_OPTIONS = [
		{ id: GOAL_TYPES.ENTRANCE, label: 'Entrance Exam', icon: GraduationCap },
		{ id: GOAL_TYPES.CLASSWISE, label: 'Class-wise', icon: BookOpen }
	];

	// Form state - consolidated
	let formState = $state({
		goalType: GOAL_TYPES.ENTRANCE,
		targetYear: new Date().getFullYear() + 1,
		isPrimary: false,
		selectedExam: null,
		selectedState: null,
		selectedBoard: null,
		selectedMedium: null,
		selectedClass: null,
		selectedYear: null
	});

	// UI state
	let validationErrors = $state([]);
	let isSubmitting = $state(false);
	let isLoadingData = $state(false);
	let prevStateId = $state(null); 
	let prevBoardId = $state(null); 

	// Helper functions for option mapping
	const mapOption = (item) => ({ id: item.id, name: item.label });
	const mapExam = (e) => ({ id: e.id, name: e.label, category: e.category });
	const buildYearOptions = () =>
		Array.from({ length: 10 }, (_, i) => {
			const year = new Date().getFullYear() + i;
			return { id: year, name: String(year) };
		});

	// Computed - get available options
	const entranceExams = $derived(getEntranceExams().map(mapExam));
	const states = $derived(getStates().map(mapOption));
	const boards = $derived(
		formState.selectedState ? getBoardsByState(formState.selectedState.id).map(mapOption) : []
	);
	const mediums = $derived(
		formState.selectedBoard ? getMediumsByBoard(formState.selectedBoard.id).map(mapOption) : []
	);
	const classes = $derived(getClasses().map(mapOption));
	const yearOptions = $derived(buildYearOptions());

	// --------------------------- Effects ---------------------------

	// Handle cascading field resets when goal type changes
	$effect(() => {
		if (isLoadingData) return;

		// Reset type-specific fields when goal type changes
		if (formState.goalType === GOAL_TYPES.ENTRANCE) {
			formState.selectedState = null;
			formState.selectedBoard = null;
			formState.selectedMedium = null;
			formState.selectedClass = null;
			prevStateId = null;
			prevBoardId = null;
		} else {
			formState.selectedExam = null;
		}
		validationErrors = [];
	});

	// Handle cascading when state selection changes
	$effect(() => {
		if (isLoadingData) return;

		const currentStateId = formState.selectedState?.id;
		if (currentStateId !== prevStateId) {
			formState.selectedBoard = null;
			formState.selectedMedium = null;
			prevStateId = currentStateId;
			prevBoardId = null;
		}
	});

	// Handle cascading when board selection changes
	$effect(() => {
		if (isLoadingData) return;

		const currentBoardId = formState.selectedBoard?.id;
		if (currentBoardId !== prevBoardId) {
			formState.selectedMedium = null;
			prevBoardId = currentBoardId;
		}
	});

	// Sync year selection to targetYear
	$effect(() => {
		if (formState.selectedYear) {
			formState.targetYear = formState.selectedYear.id;
		}
	});
	// ------------------------------ Form Load Data ------------------------------
	function loadFormData() {
		if (!editingGoal) return;

		isLoadingData = true;

		const isEntrance = editingGoal.base.type === GOAL_TYPES.ENTRANCE;

		// Set common fields
		formState.goalType = editingGoal.base.type;
		formState.targetYear = editingGoal.base.targetYear;
		formState.isPrimary = editingGoal.base.isPrimary;
		formState.selectedYear = {
			id: editingGoal.base.targetYear,
			name: String(editingGoal.base.targetYear)
		};

		// Set goal type specific fields
		if (isEntrance) {
			const exams = getEntranceExams();
			const found = exams.find((e) => e.id === editingGoal.entranceExamId);
			formState.selectedExam = found ? mapExam(found) : null;
		} else {
			const states = getStates();
			const boards = getBoardsByState(editingGoal.stateId);
			const mediums = getMediumsByBoard(editingGoal.boardId);
			const classes = getClasses();

			formState.selectedState = states.find((s) => s.id === editingGoal.stateId)
				? mapOption(states.find((s) => s.id === editingGoal.stateId))
				: null;
			formState.selectedBoard = boards.find((b) => b.id === editingGoal.boardId)
				? mapOption(boards.find((b) => b.id === editingGoal.boardId))
				: null;
			formState.selectedMedium = mediums.find((m) => m.id === editingGoal.mediumId)
				? mapOption(mediums.find((m) => m.id === editingGoal.mediumId))
				: null;
			formState.selectedClass = classes.find((c) => c.id === editingGoal.classId)
				? mapOption(classes.find((c) => c.id === editingGoal.classId))
				: null;

			// Update tracking for loaded state
			prevStateId = editingGoal.stateId;
			prevBoardId = editingGoal.boardId;
		}

		isLoadingData = false;
	}

	// ---------------------------- Form Submission ----------------------------
	function handleSubmit() {
		validationErrors = [];
		isSubmitting = true;

		// Build goal object based on type
		const goalData = {
			base: {
				id: editingGoal?.base.id || `goal_${Date.now()}`,
				type: formState.goalType,
				targetYear: formState.targetYear,
				isPrimary: formState.isPrimary
			},
			entranceExamId:
				formState.goalType === GOAL_TYPES.ENTRANCE ? formState.selectedExam?.id || null : null,
			stateId:
				formState.goalType === GOAL_TYPES.CLASSWISE ? formState.selectedState?.id || null : null,
			boardId:
				formState.goalType === GOAL_TYPES.CLASSWISE ? formState.selectedBoard?.id || null : null,
			mediumId:
				formState.goalType === GOAL_TYPES.CLASSWISE ? formState.selectedMedium?.id || null : null,
			classId:
				formState.goalType === GOAL_TYPES.CLASSWISE ? formState.selectedClass?.id || null : null
		};

		// Validate
		const validation = validateGoal(goalData);
		if (!validation.valid) {
			validationErrors = validation.errors;
			isSubmitting = false;
			return;
		}

		isSubmitting = false;
		onSave(goalData);
		resetForm();
	}

	function resetForm() {
		isSubmitting = false;
		formState = {
			goalType: GOAL_TYPES.ENTRANCE,
			targetYear: new Date().getFullYear() + 1,
			isPrimary: false,
			selectedExam: null,
			selectedState: null,
			selectedBoard: null,
			selectedMedium: null,
			selectedClass: null,
			selectedYear: null
		};
		validationErrors = [];
	}

	function handleClose() {
		resetForm();
		onClose();
	}

    //----------------------- Life Cycle --------------------------

onMount(async()=>{
await loadFormData();
})
</script>

<!-- Goal Modal in Portal -->
<Portal>
	<div
		class="bg-surface-card scroll-thin relative mx-4 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-md shadow-sm lg:min-w-md"
		style="scrollbar-gutter: stable; scrollbar-width: thin;"
	>
		<!-- Close button -->
		<div class="absolute top-4 right-4 z-10">
			<Button
				btnType="custom"
				customClass="p-1 rounded-md hover:bg-surface-hover transition-colors"
				onclick={handleClose}
				title="Close"
				aria-label="Close modal"
			>
				<X size={20} />
			</Button>
		</div>

		<div class="flex flex-col gap-5 px-6 py-4">
			<!-- Header -->
			<div class="flex items-start gap-2">
				<div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100">
					<GraduationCap size={18} class="text-orange-600" />
				</div>
				<div>
					<h2 class="text-fg text-base font-bold">
						{editingGoal ? 'Edit Goal' : 'Set Your Goal'}
					</h2>
					<p class="text-fg-muted text-sm">
						{editingGoal
							? 'Update your academic goal to stay on track.'
							: "Choose your academic goal and we'll personalize your journey."}
					</p>
				</div>
			</div>

			<!-- Error Alert -->
			{#if validationErrors.length > 0}
				<InlineAlert
					variant="error"
					title="Please fix the following issues:"
					message={validationErrors.join(', ')}
				/>
			{/if}

			<!-- Goal Type Selector -->
			<div class="flex flex-col gap-2">
				<p class="text-fg text-xs font-medium">
					Goal Type<span class="text-danger ml-0.5">*</span>
				</p>
				<div class="flex gap-3" role="group" aria-label="Select goal type">
					{#each GOAL_TYPE_OPTIONS as type (type.id)}
						{@const Icon = type.icon}
						{@const isSelected = formState.goalType === type.id}
						<button
							onclick={() => (formState.goalType = type.id)}
							disabled={editingGoal !== null}
							aria-pressed={isSelected}
							class={`
										flex flex-1 flex-col items-center gap-2 rounded-md
										border px-4 py-6 transition-all
										${editingGoal !== null ? 'cursor-not-allowed opacity-60' : ''}
										${isSelected ? 'border-primary bg-primary/5' : 'border-stroke bg-fg/2 hover:bg-fg/4'}
									`}
						>
							<Icon size={24} class={isSelected ? 'text-primary' : 'text-fg-muted'} />
							<span class={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-fg'}`}>
								{type.label}
							</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Entrance Goal Form -->
			{#if formState.goalType === GOAL_TYPES.ENTRANCE}
				<div class="flex flex-col gap-4">
					<Dropdown
						options={entranceExams}
						bind:value={formState.selectedExam}
						title="Select Exam"
						required={true}
						placeholder="Select exam..."
					/>

					<Dropdown
						options={yearOptions}
						bind:value={formState.selectedYear}
						title="Target Year"
						required={true}
						placeholder="Select year..."
						disabled={!formState.selectedExam}
					/>
				</div>
			{/if}

			<!-- Class-wise Goal Form -->
			{#if formState.goalType === GOAL_TYPES.CLASSWISE}
				<div class="flex flex-col gap-4">
					<Dropdown
						options={states}
						bind:value={formState.selectedState}
						title="State"
						required={true}
						placeholder="Select state..."
					/>

					<Dropdown
						options={boards}
						bind:value={formState.selectedBoard}
						title="Board"
						required={true}
						placeholder="Select board..."
						disabled={!formState.selectedState}
					/>

					<Dropdown
						options={mediums}
						bind:value={formState.selectedMedium}
						title="Medium"
						required={true}
						placeholder="Select medium..."
						disabled={!formState.selectedBoard}
					/>

					<Dropdown
						options={classes}
						bind:value={formState.selectedClass}
						title="Class"
						required={true}
						placeholder="Select class..."
						disabled={!formState.selectedMedium}
					/>
				</div>
			{/if}

			<!-- Primary Goal Toggle -->
			<div class="flex flex-col gap-3">
				<div
					class="bg-surface-hover/50 border-stroke flex items-center justify-between rounded-md border p-3"
				>
					<div class="flex flex-1 flex-col gap-2">
						<p class="text-fg text-xs font-semibold">Set as Primary Goal</p>
						<p class="text-fg-muted text-xs">
							{isPrimaryGoalDisabled
								? 'A primary goal already exists.'
								: 'You can have only one primary goal.'}
						</p>
						{#if isPrimaryGoalDisabled && currentPrimaryGoal}
							<div class="border-stroke mt-1 flex items-center gap-1 border-t pt-1">
								<p class="text-fg-muted text-xs">Current Goal:</p>
								<p class="text-fg text-xs font-semibold">{generateGoalTitle(currentPrimaryGoal)}</p>
							</div>
						{/if}
					</div>
					<Toggle
						checked={formState.isPrimary}
						ariaLabel="Set as primary goal"
						disabled={isPrimaryGoalDisabled}
						onToggle={(value) => {
							if (!isPrimaryGoalDisabled) {
								formState.isPrimary = value;
							}
						}}
					/>
				</div>
			</div>

			<!-- Form Actions -->
			<div class="flex justify-end gap-2">
				<Button btnType="neutral" onclick={handleClose} disabled={isSubmitting}>Cancel</Button>
				<Button btnType="primary" onclick={handleSubmit} disabled={isSubmitting}>
					{isSubmitting ? 'Saving...' : editingGoal ? 'Update Goal' : 'Set Goal'}
				</Button>
			</div>
		</div>
	</div>
</Portal>

<style>
	.scroll-thin::-webkit-scrollbar {
		width: 6px;
	}
	.scroll-thin::-webkit-scrollbar-track {
		background: transparent;
	}
	.scroll-thin::-webkit-scrollbar-thumb {
		background: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}
	.scroll-thin::-webkit-scrollbar-thumb:hover {
		background: rgba(0, 0, 0, 0.3);
	}
</style>
