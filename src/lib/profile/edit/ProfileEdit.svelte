<script>
	import { Plus, Camera, Zap, Target, BookOpen, Brain, Check } from '@lucide/svelte';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import SectionHeader from '$lib/components/SectionHeader.svelte';
	import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';
	import GoalModal from '$lib/profile/GoalModal.svelte';
	import GoalItem from '$lib/profile/GoalItem.svelte';
	import SubjectCard from '$lib/test-config/SubjectCard.svelte';
	import {
		generateGoalTitle,
		generateGoalDescription
	} from '$lib/profile/services/goal.service.js';

	let fullName = $state('Arjun Mehta');
	let email = $state('arjun.mehta@example.com');
	let phoneNumber = $state('+91 98765 43210');
	let profileImage = $state(null);
	let goals = $state([]);
	let activeGoalId = $state(null);

	let isGoalModalOpen = $state(false);
	let showDeleteModal = $state(false);
	let selectedGoal = $state(null);

	// Primary Subjects
	let primarySubjects = $state(['Mathematics', 'Physics']);
	const availableSubjects = [
		{ id: 'Mathematics', name: 'Mathematics', icon: 'Calculator' },
		{ id: 'Physics', name: 'Physics', icon: 'Zap' },
		{ id: 'Chemistry', name: 'Chemistry', icon: 'Beaker' },
		{ id: 'Biology', name: 'Biology', icon: 'Leaf' },
		{ id: 'English', name: 'English', icon: 'BookOpen' },
		{ id: 'History', name: 'History', icon: 'BookOpen' }
	];

	// Learning Goals
	let selectedLearningGoals = $state(['practice-regularly']);
	const learningGoalsOptions = [
		{
			id: 'practice-regularly',
			title: 'Practice Regularly',
			description: 'Daily micro-learning sessions to stay consistent',
			icon: Zap
		},
		{
			id: 'improve-weak-areas',
			title: 'Improve Weak Areas',
			description: 'Focused exercises on topics you find challenging',
			icon: Target
		},
		{
			id: 'exam-preparation',
			title: 'Exam Preparation',
			description: 'Structured revision for upcoming exams',
			icon: BookOpen
		},
		{
			id: 'master-concepts',
			title: 'Master Concepts',
			description: 'Deep understanding through detailed explanations',
			icon: Brain
		}
	];

	// Daily Preferences
	let questionsPerDay = $state('20');
	let studyDurationMinutes = $state('120');

	// Computed: Check for primary goal
	const primaryGoal = $derived.by(() => {
		return goals.find((g) => g.base.isPrimary);
	});

	// Computed: Can add more goals
	const canAddMoreGoals = $derived.by(() => {
		return goals.length < 6; // 1 primary + 5 secondary = 6 max
	});

	// Computed: Primary goal disabled for modal
	const isPrimaryGoalDisabled = $derived.by(() => {
		return primaryGoal && primaryGoal.base.id !== selectedGoal?.goal?.base.id;
	});

	// Computed: Display goal for deletion modal
	const displayGoal = $derived.by(() => {
		if (!selectedGoal?.goal) return null;
		return {
			displayTitle: generateGoalTitle(selectedGoal.goal),
			displayDescription: generateGoalDescription(selectedGoal.goal),
			displayType: selectedGoal.goal.base.type
		};
	});

	// -------------------- Subject Selection --------------------
	function toggleSubject(subjectId) {
		if (primarySubjects.includes(subjectId)) {
			primarySubjects = primarySubjects.filter((s) => s !== subjectId);
		} else {
			primarySubjects = [...primarySubjects, subjectId];
		}
	}

	// -------------------- Learning Goal Selection --------------------
	function toggleLearningGoal(goalId) {
		if (selectedLearningGoals.includes(goalId)) {
			selectedLearningGoals = selectedLearningGoals.filter((g) => g !== goalId);
		} else {
			selectedLearningGoals = [...selectedLearningGoals, goalId];
		}
	}

	// -------------------- Goal Management --------------------
	function setActiveGoal(goal) {
		activeGoalId = activeGoalId === goal.base.id ? null : goal.base.id;
	}

	// Goal management
	function handleAddGoal() {
		selectedGoal = null;
		isGoalModalOpen = true;
	}

	function handleEditGoal(goal) {
		selectedGoal = { goal, mode: 'edit' };
		isGoalModalOpen = true;
	}

	function handleDeleteGoal(goal) {
		selectedGoal = { goal, mode: 'delete' };
		showDeleteModal = true;
	}

	async function handleSaveGoal(goalData) {
		try {
			if (selectedGoal?.mode === 'edit') {
				const index = goals.findIndex((g) => g.base.id === selectedGoal.goal.base.id);
				if (index !== -1) {
					goals[index] = goalData;
					goals = [...goals];
				}
			} else {
				goals = [...goals, goalData];
			}
			isGoalModalOpen = false;
			selectedGoal = null;
		} catch (err) {
			console.error('Error saving goal:', err);
		}
	}

	async function handleConfirmDelete(goal) {
		try {
			goals = goals.filter((g) => g.base.id !== goal.base.id);
			showDeleteModal = false;
			selectedGoal = null;
		} catch (err) {
			console.error('Error deleting goal:', err);
		}
	}

	function handleCloseGoalModal() {
		isGoalModalOpen = false;
		selectedGoal = null;
	}

	function handleCancelDelete() {
		showDeleteModal = false;
		selectedGoal = null;
	}

	// --------------------------- Image Related Functions --------------------------
	function handleImageCapture(event) {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				profileImage = e.target?.result;
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div class="flex flex-col gap-6">
	<!-- Header -->
	<SectionHeader
		title="Edit Your Profile"
		subtitle="Update your info and academic goals to tailor your learning path."
	/>

	<!-- Personal Details Section -->
	<div class="bg-surface-card rounded-md p-4 shadow-sm sm:p-6">
		<SectionHeader
			title="Personal Details"
			subtitle="Keep your profile information up to date"
			variant="sm"
		/>

		<div class="mt-4 flex flex-col gap-4">
			<!-- Profile Image - Prominent -->
			<div class="flex flex-col items-center gap-3">
				<div class="group relative cursor-pointer">
					<div
						class="bg-surface-hover border-primary/20 relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 shadow-md transition-shadow group-hover:shadow-lg"
					>
						{#if profileImage}
							<img src={profileImage} alt="Profile" class="h-full w-full object-cover" />
						{:else}
							<div class="text-fg-muted text-6xl">👤</div>
						{/if}
						<label
							class="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
						>
							<div class="flex flex-col items-center gap-1">
								<Camera size={28} class="text-white" />
								<span class="text-xs font-medium text-white">Change</span>
							</div>
							<input type="file" accept="image/*" onchange={handleImageCapture} class="hidden" />
						</label>
					</div>
					<div
						class="bg-primary absolute -right-1 -bottom-1 rounded-full p-1.5 text-white shadow-sm transition-transform group-hover:scale-110"
					>
						<Camera size={14} />
					</div>
				</div>
				<div class="text-center">
					<h3 class="text-fg font-semibold">{fullName}</h3>
					<p class="text-fg-muted text-sm">{email}</p>
					<p class="text-primary mt-1 text-xs font-medium">Click to change photo</p>
				</div>
			</div>

			<!-- Compact Input Fields Grid -->
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
				<!-- Full Name -->
				<TextInput label="Full Name" placeholder="Arjun Mehta" bind:value={fullName} />

				<!-- Email -->
				<TextInput
					label="Email Address"
					type="email"
					placeholder="arjun.mehta@example.com"
					bind:value={email}
				/>

				<!-- Phone Number -->
				<TextInput label="Phone Number" placeholder="+91 98765 43210" bind:value={phoneNumber} />
			</div>
		</div>
	</div>

	<!-- Academic Goals Section -->
	<div class="bg-surface-card rounded-md p-4 shadow-sm sm:p-6">
		<div class="mb-4 flex items-center justify-between">
			<SectionHeader
				title="Academic Goals"
				subtitle="Define your academic aspirations"
				variant="sm"
			/>
			<Button
				btnType="primary"
				size="sm"
				onclick={handleAddGoal}
				disabled={!canAddMoreGoals}
				title={!canAddMoreGoals
					? 'Maximum number of goals reached'
					: 'Add a new goal'}
			>
				<Plus size={16} />
				Add Goal
			</Button>
		</div>

		<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#if goals.length === 0}
				<div class="col-span-1 py-8 text-center sm:col-span-2">
					<p class="text-fg-muted text-sm">No academic goals added yet.</p>
					<p class="text-fg-muted text-xs">Click "Add Goal" to get started.</p>
				</div>
			{:else}
				{#each goals as goal (goal.base.id)}
					<GoalItem
						{goal}
						isActive={activeGoalId === goal.base.id}
						variant="detailed"
						onEdit={handleEditGoal}
						onDelete={handleDeleteGoal}
						onSetActive={setActiveGoal}
					/>
				{/each}
				{#if goals.length >= 6}
					<div class="col-span-1 py-4 text-center sm:col-span-2">
						<p class="text-fg-muted text-sm">Maximum number of goals reached</p>
					</div>
				{/if}
			{/if}
		</div>
	</div>

	<!-- Primary Subjects Section -->
	<div class="bg-surface-card rounded-md p-4 shadow-sm sm:p-6">
		<SectionHeader
			title="Primary Subjects"
			subtitle="Choose your main areas of focus"
			variant="sm"
		/>
		<div class="mt-4">
			<SubjectCard
				subjects={availableSubjects}
				selectedSubjects={primarySubjects}
				onToggleSubject={toggleSubject}
			/>
		</div>
	</div>

	<!-- Learning Goals Section -->
	<div class="bg-surface-card rounded-md p-4 shadow-sm sm:p-6">
		<SectionHeader
			title="Learning Goals"
			subtitle="Select what you want to focus on"
			variant="sm"
		/>

		<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
			{#each learningGoalsOptions as goal (goal.id)}
				<button
					onclick={() => toggleLearningGoal(goal.id)}
					class="relative rounded-md border p-3 text-left transition-all {selectedLearningGoals.includes(
						goal.id
					)
						? 'border-primary bg-primary/5'
						: 'border-stroke bg-surface-hover/50 hover:bg-surface-hover'}"
				>
					{#if selectedLearningGoals.includes(goal.id)}
						<div class="bg-primary absolute top-2 right-2 rounded-full p-1 text-white">
							<Check size={12} />
						</div>
					{/if}
					<div class="flex items-start gap-2">
						<goal.icon size={18} class="text-primary mt-0.5 shrink-0" />
						<div>
							<h4 class="text-fg text-sm font-semibold">{goal.title}</h4>
							<p class="text-fg-muted mt-1 text-xs">{goal.description}</p>
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Daily Preferences Section -->
	<div class="bg-surface-card rounded-md p-4 shadow-sm sm:p-6">
		<SectionHeader
			title="Daily Preferences"
			subtitle="Set your preferred learning pace"
			variant="sm"
		/>

		<div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
			<!-- Questions Per Day -->
			<TextInput
				label="Practice Questions Per Day"
				type="number"
				placeholder="20"
				bind:value={questionsPerDay}
			/>

			<!-- Study Duration -->
			<TextInput
				label="Daily Study Duration (minutes)"
				type="number"
				placeholder="120"
				bind:value={studyDurationMinutes}
			/>
		</div>
	</div>

	<!-- Footer Buttons -->
	<div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
		<Button btnType="neutral" onclick={() => window.history.back()}>Cancel</Button>
		<Button btnType="primary" onclick={() => console.log('Save profile')}>Save Changes</Button>
	</div>
</div>

<!-- Goal Modal -->
{#if isGoalModalOpen}
	<GoalModal
		onClose={handleCloseGoalModal}
		onSave={handleSaveGoal}
		editingGoal={selectedGoal?.goal}
		isEditing={selectedGoal?.mode === 'edit'}
		{isPrimaryGoalDisabled}
		currentPrimaryGoal={primaryGoal}
	/>
{/if}

<!-- Delete Confirmation Modal -->
{#if showDeleteModal && selectedGoal && displayGoal}
	<DeleteConfirmationModal
		open={showDeleteModal}
		onclose={handleCancelDelete}
		oncancel={handleCancelDelete}
		entity={displayGoal}
		entityName="goal"
		entityType="goal"
		fields={[
			{ key: 'displayTitle', label: 'Goal' },
			{ key: 'displayDescription', label: 'Description' },
			{ key: 'displayType', label: 'Type' }
		]}
		onconfirm={handleConfirmDelete}
	/>
{/if}
